package workflowsvc

// func TestCreateGrant(t *testing.T) {
// 	type testcase struct {
// 		name                       string
// 		withCreateGrantResponseErr error
// 		subject                    string
// 		giveAccessGroup            access.AccessGroup
// 		wantAccessGroupErr         error
// 		giveGrants                 []requests.Grantv2
// 		wantGrantsErr              error
// 		wantErr                    error
// 		want                       []requests.Grantv2
// 	}
// 	clk := clock.NewMock()
// 	now := clk.Now()
// 	testcases := []testcase{
// 		{
// 			name: "ok",

// 			subject: "test@commonfate.io",
// 			giveAccessGroup: access.AccessGroup{
// 				AccessRule: rule.AccessRule{ID: "rule_a", Target: rule.Target{TargetGroupID: "test"}},
// 				ID:         "123",
// 				Request:    "abc",
// 				TimeConstraints: requests.Timing{
// 					Duration:  time.Hour,
// 					StartTime: &now,
// 				},
// 			},
// 			withCreateGrantResponseErr: nil,
// 			giveGrants: []requests.Grantv2{
// 				{
// 					AccessGroup:        "123",
// 					Status:             types.GrantStatus(types.RequestStatusPENDING),
// 					Start:              now,
// 					End:                now.Add(time.Hour),
// 					AccessInstructions: aws.String(""),
// 					Subject:            "test@commonfate.io",
// 					CreatedAt:          now,
// 					UpdatedAt:          now,
// 				},
// 				{
// 					AccessGroup:        "123",
// 					Status:             types.GrantStatus(types.RequestStatusPENDING),
// 					Start:              now,
// 					End:                now.Add(time.Hour),
// 					AccessInstructions: aws.String(""),
// 					Subject:            "test@commonfate.io",
// 					CreatedAt:          now,
// 					UpdatedAt:          now,
// 				},
// 			},
// 			wantGrantsErr: nil,
// 			want: []requests.Grantv2{
// 				{
// 					AccessGroup:        "123",
// 					Status:             types.GrantStatus(types.RequestStatusPENDING),
// 					Start:              now,
// 					End:                now.Add(time.Hour),
// 					AccessInstructions: aws.String(""),
// 					Subject:            "test@commonfate.io",
// 					CreatedAt:          now,
// 					UpdatedAt:          now,
// 				},
// 				{
// 					AccessGroup:        "123",
// 					Status:             types.GrantStatus(types.RequestStatusPENDING),
// 					Start:              now,
// 					End:                now.Add(time.Hour),
// 					AccessInstructions: aws.String(""),
// 					Subject:            "test@commonfate.io",
// 					CreatedAt:          now,
// 					UpdatedAt:          now,
// 				},
// 			},
// 		},
// 	}

// 	for _, tc := range testcases {
// 		t.Run(tc.name, func(t *testing.T) {
// 			ctrl := gomock.NewController(t)
// 			runtime := mocks.NewMockRuntime(ctrl)
// 			runtime.EXPECT().Grant(gomock.Any(), gomock.Any()).Return(tc.withCreateGrantResponseErr).AnyTimes()

// 			eventbus := mocks.NewMockEventPutter(ctrl)
// 			eventbus.EXPECT().Put(gomock.Any(), gomock.Any()).Return(tc.withCreateGrantResponseErr).AnyTimes()

// 			c := ddbmock.New(t)
// 			c.MockQueryWithErr(&storage.ListGrantsV2{Result: tc.giveGrants}, tc.wantGrantsErr)

// 			s := Service{
// 				Runtime:  runtime,
// 				DB:       c,
// 				Clk:      clk,
// 				Eventbus: eventbus,
// 			}

// 			_, err := s.Grant(context.Background(), tc.giveAccessGroup, tc.subject)
// 			assert.Equal(t, tc.wantErr, err)

// 		})
// 	}
// }
