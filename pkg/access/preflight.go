package access

import (
	"time"

	"github.com/common-fate/common-fate/pkg/cache"
	"github.com/common-fate/common-fate/pkg/storage/keys"
	"github.com/common-fate/common-fate/pkg/types"
	"github.com/common-fate/ddb"
)

//Preflight holds all state for a request. This includes all access groups and all grants\
//for now this is used as a state store, but will be expanded to provide functionality for requesting past requests

type Preflight struct {
	// ID is a read-only field after the request has been created.
	ID string `json:"id" dynamodbav:"id"`
	// RequestedBy is the ID of the user who has made the request.
	RequestedBy  string                 `json:"requestedBy" dynamodbav:"requestedBy"`
	AccessGroups []PreflightAccessGroup `json:"accessGroups" dynamodbav:"accessGroups"`

	// CreatedAt is a read-only field after the request has been created.
	CreatedAt time.Time `json:"createdAt" dynamodbav:"createdAt"`
}

type PreflightAccessGroupTarget struct {
	Target        cache.Target `json:"target" dynamodbav:"target"`
	TargetGroupID string       `json:"targetGroupId" dynamodbav:"targetGroupId"`
}
type PreflightAccessGroup struct {
	ID               string                          `json:"id" dynamodbav:"id"`
	AccessRule       string                          `json:"accessRule" dynamodbav:"accessRule"`
	RequiresApproval bool                            `json:"requiresApproval" dynamodbav:"requiresApproval"`
	Targets          []PreflightAccessGroupTarget    `json:"targets" dynamodbav:"targets"`
	TimeConstraints  types.AccessRuleTimeConstraints `json:"timeConstraints" dynamodbav:"timeConstraints"`
}

func (i *PreflightAccessGroupTarget) ToAPI() types.Target {
	return i.Target.ToAPI()
}
func (i *PreflightAccessGroup) ToAPI() types.PreflightAccessGroup {
	out := types.PreflightAccessGroup{
		Id:               i.ID,
		RequiresApproval: i.RequiresApproval,
		Targets:          []types.Target{},
		TimeConstraints:  i.TimeConstraints,
	}
	for _, target := range i.Targets {
		out.Targets = append(out.Targets, target.ToAPI())
	}
	return out

}

func (i *Preflight) ToAPI() types.Preflight {
	out := types.Preflight{
		Id:           i.ID,
		AccessGroups: []types.PreflightAccessGroup{},
		CreatedAt:    i.CreatedAt,
	}
	for _, accessgroup := range i.AccessGroups {
		out.AccessGroups = append(out.AccessGroups, accessgroup.ToAPI())
	}

	return out
}

func (i *Preflight) DDBKeys() (ddb.Keys, error) {
	keys := ddb.Keys{
		PK: keys.Preflight.PK1,
		SK: keys.Preflight.SK1(i.ID, i.RequestedBy),
	}
	return keys, nil
}
