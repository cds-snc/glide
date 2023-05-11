package storage

import (
	"testing"

	"github.com/common-fate/common-fate/pkg/access"
	"github.com/common-fate/common-fate/pkg/types"
	"github.com/common-fate/ddb"
	"github.com/common-fate/ddb/ddbtest"
)

func TestListRequestWithGroupsWithTargetsForUser(t *testing.T) {
	ts := newTestingStorage(t)
	rid := "req_abcd"
	gid := "grp_abcd"
	tid := "gta_abcd"
	req := access.Request{ID: rid, GroupTargetCount: 1, RequestedBy: access.RequestedBy{ID: "usr_abcd"}, RequestStatus: types.COMPLETE}
	group := access.Group{ID: gid, RequestID: rid, RequestedBy: access.RequestedBy{ID: "usr_abcd"}, RequestStatus: types.COMPLETE}
	target := access.GroupTarget{ID: tid, GroupID: gid, RequestID: rid, RequestedBy: access.RequestedBy{ID: "usr_abcd"}, RequestStatus: types.COMPLETE}

	rid = "req_efgh"
	gid = "grp_efgh"
	tid = "gta_efgh"
	req2 := access.Request{ID: rid, GroupTargetCount: 1, RequestedBy: access.RequestedBy{ID: "usr_efgh"}}
	group2 := access.Group{ID: gid, RequestID: rid, RequestedBy: access.RequestedBy{ID: "usr_efgh"}}
	target2 := access.GroupTarget{ID: tid, GroupID: gid, RequestID: rid, RequestedBy: access.RequestedBy{ID: "usr_efgh"}}

	rid = "req_lmnop"
	gid = "grp_lmnop"
	tid = "gta_lmnop"
	req3 := access.Request{ID: rid, GroupTargetCount: 1, RequestedBy: access.RequestedBy{ID: "usr_abcd"}, RequestStatus: types.ACTIVE}
	group3 := access.Group{ID: gid, RequestID: rid, RequestedBy: access.RequestedBy{ID: "usr_abcd"}, RequestStatus: types.ACTIVE}
	target3 := access.GroupTarget{ID: tid, GroupID: gid, RequestID: rid, RequestedBy: access.RequestedBy{ID: "usr_abcd"}, RequestStatus: types.ACTIVE}

	rid = "grp_acomesfirst"
	gid = "grp_acomesfirst"
	tid = "gta_acomesfirst"
	req4 := access.Request{ID: rid, GroupTargetCount: 1, RequestedBy: access.RequestedBy{ID: "usr_abcd"}, RequestStatus: types.ACTIVE}
	group4 := access.Group{ID: gid, RequestID: rid, RequestedBy: access.RequestedBy{ID: "usr_abcd"}, RequestStatus: types.ACTIVE}
	target4 := access.GroupTarget{ID: tid, GroupID: gid, RequestID: rid, RequestedBy: access.RequestedBy{ID: "usr_abcd"}, RequestStatus: types.ACTIVE}
	// cleanup before the test
	err := ts.deleteAll()
	if err != nil {
		t.Fatal(err)
	}
	ddbtest.PutFixtures(t, ts.db, []ddb.Keyer{&req, &group, &target, &req2, &group2, &target2, &req3, &group3, &target3, &req4, &group4, &target4})

	// this test asserts that items are retrieved correctly and in the expected order, most recently created upcoming request to oldest created past request
	testcases := []ddbtest.QueryTestCase{
		{
			Name: "ok, upcoming request is before past request",
			Query: &ListRequestWithGroupsWithTargetsForUser{
				UserID: "usr_abcd",
			},
			Want: &ListRequestWithGroupsWithTargetsForUser{
				UserID: "usr_abcd",
				Result: []access.RequestWithGroupsWithTargets{
					{
						Request: req3,
						Groups: []access.GroupWithTargets{{
							Group:   group3,
							Targets: []access.GroupTarget{target3},
						}},
					},
					{
						Request: req4,
						Groups: []access.GroupWithTargets{{
							Group:   group4,
							Targets: []access.GroupTarget{target4},
						}},
					},
					{
						Request: req,
						Groups: []access.GroupWithTargets{{
							Group:   group,
							Targets: []access.GroupTarget{target},
						}},
					},
				},
			},
		},
		{
			Name: "No matches",
			Query: &ListRequestWithGroupsWithTargetsForUser{
				UserID: "usr_other",
			},
			Want: &ListRequestWithGroupsWithTargetsForUser{
				UserID: "usr_other",
			},
		},
	}

	ddbtest.RunQueryTests(t, ts.db, testcases, ddbtest.WithAssertResultsOrder(true))

}
