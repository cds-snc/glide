package accesssvc

import (
	"context"
	"errors"
	"testing"
	"time"

	"github.com/benbjohnson/clock"
	"github.com/common-fate/common-fate/pkg/access"
	"github.com/common-fate/common-fate/pkg/identity"
	"github.com/common-fate/common-fate/pkg/rule"
	accessMocks "github.com/common-fate/common-fate/pkg/service/accesssvc/mocks"
	"github.com/common-fate/common-fate/pkg/storage"
	"github.com/common-fate/common-fate/pkg/types"
	"github.com/common-fate/ddb/ddbmock"
	"github.com/golang/mock/gomock"
	"github.com/stretchr/testify/assert"
)

func TestValidateFavorite(t *testing.T) {
	type testcase struct {
		name                         string
		giveInput                    types.CreateFavoriteRequest
		giveUser                     identity.User
		rule                         *rule.AccessRule
		ruleErr                      error
		wantErr                      error
		want                         *access.Favorite
		withRequestArgumentsResponse map[string]types.RequestArgument
	}

	clk := clock.NewMock()
	testcases := []testcase{
		{
			name: "ok",
			giveInput: types.CreateFavoriteRequest{
				AccessRuleId: "abcd",
				Name:         "new fav",
				Timing: types.RequestTiming{
					DurationSeconds: 3600,
				},
				With: &[]types.CreateRequestWith{
					{
						AdditionalProperties: map[string][]string{
							"accountId": {"a", "b"},
						},
					},
				},
			},
			giveUser: identity.User{
				ID:     "test",
				Groups: []string{"goodgroup"},
			},
			rule: &rule.AccessRule{
				Groups: []string{"goodgroup"},
				TimeConstraints: types.TimeConstraints{
					MaxDurationSeconds: 3600,
				},
				Target: rule.Target{
					WithSelectable: map[string][]string{
						"accountId": {"a", "b"},
					},
				},
			},
			withRequestArgumentsResponse: map[string]types.RequestArgument{
				"accountId": {
					RequiresSelection: true,
					Options: []types.WithOption{
						{
							Value: "a",
							Valid: true,
						},
						{
							Value: "b",
							Valid: true,
						},
					}},
			},
			want: &access.Favorite{
				ID:     "-",
				UserID: "test",
				Data:   access.RequestData{},
				Rule:   "abcd",
				Name:   "new fav",
				RequestedTiming: access.Timing{
					Duration: time.Hour,
				},
				With: []map[string][]string{
					{"accountId": {"a", "b"}},
				},
				CreatedAt: clk.Now(),
				UpdatedAt: clk.Now(),
			},
		},
	}

	for i := range testcases {
		tc := testcases[i]
		t.Run(tc.name, func(t *testing.T) {
			db := ddbmock.New(t)
			db.MockQueryWithErr(&storage.GetAccessRuleCurrent{Result: tc.rule}, tc.ruleErr)
			ctrl := gomock.NewController(t)
			defer ctrl.Finish()
			rs := accessMocks.NewMockAccessRuleService(ctrl)
			if tc.withRequestArgumentsResponse != nil {
				rs.EXPECT().RequestArguments(gomock.Any(), tc.rule.Target).Return(tc.withRequestArgumentsResponse, nil)
			}
			s := Service{
				Clock: clk,
				DB:    db,
				Rules: rs,
			}
			got, err := s.validateFavorite(context.Background(), tc.giveUser, tc.giveInput)
			if got != nil {
				// ignore the autogenerated ID for testing.
				got.ID = "-"
			}
			assert.Equal(t, tc.wantErr, err)
			assert.Equal(t, tc.want, got)
		})
	}

}

func TestValidateCreate(t *testing.T) {
	type testcase struct {
		name                 string
		giveInput            CreateRequestsOpts
		wantErr              error
		want                 *validateCreateRequestsResponse
		withAccessRule       *rule.AccessRule
		withRequestArguments map[string]types.RequestArgument
	}

	clk := clock.NewMock()

	accessRule := rule.AccessRule{
		Groups: []string{"goodgroup"},
		TimeConstraints: types.TimeConstraints{
			MaxDurationSeconds: 3600,
		},
		Target: rule.Target{
			WithSelectable: map[string][]string{
				"accountId": {"a", "b"},
			},
		},
	}
	requestArguments := map[string]types.RequestArgument{
		"accountId": {
			RequiresSelection: true,
			Options: []types.WithOption{
				{
					Value: "a",
					Valid: true,
				},
				{
					Value: "b",
					Valid: true,
				},
			}},
	}

	accessRuleNonSelectable := rule.AccessRule{
		Groups: []string{"goodgroup"},
		TimeConstraints: types.TimeConstraints{
			MaxDurationSeconds: 3600,
		},
		Target: rule.Target{
			With: map[string]string{
				"vault": "test",
			},
		},
	}
	requestArgumentsNonSelectable := map[string]types.RequestArgument{
		"vault": {
			RequiresSelection: false,
			Options: []types.WithOption{
				{
					Valid: true,
					Value: "test",
				},
			},
		},
	}

	testcases := []testcase{
		{
			name: "ok",
			giveInput: CreateRequestsOpts{
				Create: CreateRequests{
					AccessRuleId: "abcd",
					Timing: types.RequestTiming{
						DurationSeconds: 3600,
					},
					With: &[]types.CreateRequestWith{
						{
							AdditionalProperties: map[string][]string{
								"accountId": {"a", "b"},
							},
						},
					},
				},
				User: identity.User{
					ID:     "test",
					Groups: []string{"goodgroup"},
				},
			},
			withAccessRule:       &accessRule,
			withRequestArguments: requestArguments,
			want: &validateCreateRequestsResponse{
				argumentCombinations: types.RequestArgumentCombinations{map[string]string{"accountId": "a"}, map[string]string{"accountId": "b"}},
				rule:                 accessRule,
				requestArguments:     requestArguments,
			},
		},
		{
			name: "missing values in request arguments",
			giveInput: CreateRequestsOpts{
				Create: CreateRequests{
					AccessRuleId: "abcd",
					Timing: types.RequestTiming{
						DurationSeconds: 3600,
					},
					With: &[]types.CreateRequestWith{
						{
							AdditionalProperties: map[string][]string{
								"accountId": {"a", "b"},
							},
						},
						{
							AdditionalProperties: map[string][]string{
								"accountId": {},
							},
						},
					},
				},
				User: identity.User{
					ID:     "test",
					Groups: []string{"goodgroup"},
				},
			},
			withAccessRule:       &accessRule,
			withRequestArguments: requestArguments,
			wantErr: types.ArgumentHasNoValuesError{
				Argument: "accountId",
			},
		},
		{
			name: "overlapping arguments",
			giveInput: CreateRequestsOpts{
				Create: CreateRequests{
					AccessRuleId: "abcd",
					Timing: types.RequestTiming{
						DurationSeconds: 3600,
					},
					With: &[]types.CreateRequestWith{
						{
							AdditionalProperties: map[string][]string{
								"accountId": {"a", "b"},
							},
						},
						{
							AdditionalProperties: map[string][]string{
								"accountId": {"a", "b"},
							},
						},
					},
				},
				User: identity.User{
					ID:     "test",
					Groups: []string{"goodgroup"},
				},
			},
			withAccessRule:       &accessRule,
			withRequestArguments: requestArguments,
			wantErr:              errors.New("request contains duplicate subrequest value combinations"),
		},
		{
			name: "ok rule does not have selectable arguments, single empty with is provided",
			giveInput: CreateRequestsOpts{
				Create: CreateRequests{
					AccessRuleId: "abcd",
					Timing: types.RequestTiming{
						DurationSeconds: 3600,
					},
					With: &[]types.CreateRequestWith{
						{
							AdditionalProperties: map[string][]string{},
						},
					},
				},
				User: identity.User{
					ID:     "test",
					Groups: []string{"goodgroup"},
				},
			},
			withAccessRule:       &accessRuleNonSelectable,
			withRequestArguments: requestArgumentsNonSelectable,
			want: &validateCreateRequestsResponse{
				argumentCombinations: types.RequestArgumentCombinations{map[string]string{}},
				rule:                 accessRuleNonSelectable,
				requestArguments:     requestArgumentsNonSelectable,
			},
		},
		{
			name: "rule does not have selectable arguments, arguments provided",
			giveInput: CreateRequestsOpts{
				Create: CreateRequests{
					AccessRuleId: "abcd",
					Timing: types.RequestTiming{
						DurationSeconds: 3600,
					},
					With: &[]types.CreateRequestWith{
						{
							AdditionalProperties: map[string][]string{"vault": {"values"}},
						},
					},
				},
				User: identity.User{
					ID:     "test",
					Groups: []string{"goodgroup"},
				},
			},
			withAccessRule:       &accessRuleNonSelectable,
			withRequestArguments: requestArgumentsNonSelectable,
			wantErr:              errors.New("request validation failed"),
		},
		{
			name: "rule has selectable arguments, but an empty subrequest was provided",
			giveInput: CreateRequestsOpts{
				Create: CreateRequests{
					AccessRuleId: "abcd",
					Timing: types.RequestTiming{
						DurationSeconds: 3600,
					},
					With: &[]types.CreateRequestWith{
						{
							AdditionalProperties: map[string][]string{
								"accountId": {"a", "b"},
							},
						},
						{
							AdditionalProperties: map[string][]string{},
						},
					},
				},
				User: identity.User{
					ID:     "test",
					Groups: []string{"goodgroup"},
				},
			},
			withAccessRule:       &accessRule,
			withRequestArguments: requestArguments,
			wantErr:              errors.New("request contains subrequest with no arguments"),
		},
		{
			name: "rule has selectable arguments, but an unexpected argument id was provided",
			giveInput: CreateRequestsOpts{
				Create: CreateRequests{
					AccessRuleId: "abcd",
					Timing: types.RequestTiming{
						DurationSeconds: 3600,
					},
					With: &[]types.CreateRequestWith{
						{
							AdditionalProperties: map[string][]string{
								"wrong": {"a", "b"},
							},
						},
					},
				},
				User: identity.User{
					ID:     "test",
					Groups: []string{"goodgroup"},
				},
			},
			withAccessRule:       &accessRule,
			withRequestArguments: requestArguments,
			wantErr:              errors.New("request validation failed"),
		},
		{
			name: "rule has selectable arguments, but an unexpected argument value was provided",
			giveInput: CreateRequestsOpts{
				Create: CreateRequests{
					AccessRuleId: "abcd",
					Timing: types.RequestTiming{
						DurationSeconds: 3600,
					},
					With: &[]types.CreateRequestWith{
						{
							AdditionalProperties: map[string][]string{
								"wrong": {"a", "wrong"},
							},
						},
					},
				},
				User: identity.User{
					ID:     "test",
					Groups: []string{"goodgroup"},
				},
			},
			withAccessRule:       &accessRule,
			withRequestArguments: requestArguments,
			wantErr:              errors.New("request validation failed"),
		},
		{
			name: "rule does not have selectable arguments, multiple sub requests provided",
			giveInput: CreateRequestsOpts{
				Create: CreateRequests{
					AccessRuleId: "abcd",
					Timing: types.RequestTiming{
						DurationSeconds: 3600,
					},
					With: &[]types.CreateRequestWith{
						{
							AdditionalProperties: map[string][]string{},
						},
						{
							AdditionalProperties: map[string][]string{},
						},
					},
				},
				User: identity.User{
					ID:     "test",
					Groups: []string{"goodgroup"},
				},
			},
			withAccessRule:       &accessRuleNonSelectable,
			withRequestArguments: requestArgumentsNonSelectable,
			wantErr:              errors.New("request contains subrequest with no arguments"),
		},
	}

	for i := range testcases {
		tc := testcases[i]
		t.Run(tc.name, func(t *testing.T) {
			db := ddbmock.New(t)
			if tc.withAccessRule != nil {
				db.MockQueryWithErr(&storage.GetAccessRuleCurrent{Result: tc.withAccessRule}, nil)
			}

			ctrl := gomock.NewController(t)
			defer ctrl.Finish()
			rs := accessMocks.NewMockAccessRuleService(ctrl)
			if tc.withRequestArguments != nil {
				rs.EXPECT().RequestArguments(gomock.Any(), tc.withAccessRule.Target).AnyTimes().Return(tc.withRequestArguments, nil)
			}

			s := Service{
				Clock: clk,
				DB:    db,
				Rules: rs,
			}
			got, err := s.validateCreateRequests(context.Background(), tc.giveInput)
			assert.Equal(t, tc.want, got)
			if tc.wantErr != nil {
				assert.EqualError(t, err, tc.wantErr.Error())
			}

		})
	}

}
