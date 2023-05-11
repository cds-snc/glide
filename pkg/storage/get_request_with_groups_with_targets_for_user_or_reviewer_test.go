package storage

import (
	"testing"

	"github.com/common-fate/common-fate/pkg/access"
	"github.com/common-fate/ddb"
	"github.com/common-fate/ddb/ddbtest"
)

func TestGetRequestWithGroupsWithTargetsForUserOrReviewer(t *testing.T) {
	ts := newTestingStorage(t)
	rid := "req_abcd"
	gid := "grp_abcd"
	tid := "gta_abcd"
	req := access.Request{ID: rid, GroupTargetCount: 1, RequestReviewers: []string{"rev_abcd"}, RequestedBy: access.RequestedBy{ID: "usr_abcd"}}
	group := access.Group{ID: gid, RequestID: rid, RequestReviewers: []string{"rev_abcd"}, RequestedBy: access.RequestedBy{ID: "usr_abcd"}}
	target := access.GroupTarget{ID: tid, GroupID: gid, RequestID: rid, RequestReviewers: []string{"rev_abcd"}, RequestedBy: access.RequestedBy{ID: "usr_abcd"}}
	rid = "req_efgh"
	gid = "grp_efgh"
	tid = "gta_efgh"
	req2 := access.Request{ID: rid, GroupTargetCount: 1}
	group2 := access.Group{ID: gid, RequestID: rid}
	target2 := access.GroupTarget{ID: tid, GroupID: gid, RequestID: rid}

	ddbtest.PutFixtures(t, ts.db, []ddb.Keyer{&req, &group, &target, &req2, &group2, &target2})

	tc := []ddbtest.QueryTestCase{
		{
			Name: "ok",
			Query: &GetRequestWithGroupsWithTargetsForUserOrReviewer{
				UserID:    "rev_abcd",
				RequestID: req.ID,
			},
			Want: &GetRequestWithGroupsWithTargetsForUserOrReviewer{
				UserID:    "rev_abcd",
				RequestID: req.ID,
				Result: &access.RequestWithGroupsWithTargets{
					Request: req,
					Groups: []access.GroupWithTargets{{
						Group:   group,
						Targets: []access.GroupTarget{target},
					}},
				},
			},
		},
		{
			Name: "No access",
			Query: &GetRequestWithGroupsWithTargetsForUserOrReviewer{
				UserID:    "rev_abcd",
				RequestID: req2.ID,
			},
			WantErr: ddb.ErrNoItems,
		},
		{
			Name: "user get their own request",
			Query: &GetRequestWithGroupsWithTargetsForUserOrReviewer{
				UserID:    "usr_abcd",
				RequestID: req.ID,
			},
			Want: &GetRequestWithGroupsWithTargetsForUserOrReviewer{
				UserID:    "usr_abcd",
				RequestID: req.ID,
				Result: &access.RequestWithGroupsWithTargets{
					Request: req,
					Groups: []access.GroupWithTargets{{
						Group:   group,
						Targets: []access.GroupTarget{target},
					}},
				},
			},
		},
	}

	ddbtest.RunQueryTests(t, ts.db, tc)
}
