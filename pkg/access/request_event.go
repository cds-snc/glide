package access

import (
	"time"

	"github.com/common-fate/common-fate/pkg/storage/keys"
	"github.com/common-fate/common-fate/pkg/types"
	"github.com/common-fate/ddb"
)

// request events should not be updated once created
type RequestEvent struct {
	ID        string    `json:"id" dynamodbav:"id"`
	RequestID string    `json:"requestId" dynamodbav:"requestId"`
	CreatedAt time.Time `json:"createdAt" dynamodbav:"createdAt"`
	// Actor is the ID of the user who has made the request or nil if it was automated
	Actor              *string                               `json:"actor,omitempty" dynamodbav:"actor,omitempty"`
	FromStatus         *types.RequestStatus                  `json:"fromStatus,omitempty" dynamodbav:"fromStatus,omitempty"`
	ToStatus           *types.RequestStatus                  `json:"toStatus,omitempty" dynamodbav:"toStatus,omitempty"`
	FromTiming         *Timing                               `json:"fromTiming,omitempty" dynamodbav:"fromTiming,omitempty"`
	ToTiming           *Timing                               `json:"toTiming,omitempty" dynamodbav:"toTiming,omitempty"`
	FromGroupStatus    *types.RequestAccessGroupStatus       `json:"fromGroupStatus,omitempty" dynamodbav:"fromGroupStatus,omitempty"`
	ToGroupStatus      *types.RequestAccessGroupStatus       `json:"toGroupStatus,omitempty" dynamodbav:"toGroupStatus,omitempty"`
	FromGrantStatus    *types.RequestAccessGroupTargetStatus `json:"fromGrantStatus,omitempty" dynamodbav:"fromGrantStatus,omitempty"`
	ToGrantStatus      *types.RequestAccessGroupTargetStatus `json:"toGrantStatus,omitempty" dynamodbav:"toGrantStatus,omitempty"`
	GroupTarget        *GroupTarget                          `json:"groupTarget,omitempty" dynamodbav:"groupTarget,omitempty"`
	GrantCreated       *bool                                 `json:"grantCreated,omitempty" dynamodbav:"grantCreated,omitempty"`
	GrantFailureReason *string                               `json:"grantFailureReason,omitempty" dynamodbav:"grantFailureReason,omitempty"`
	RequestCreated     *bool                                 `json:"requestCreated,omitempty" dynamodbav:"requestCreated,omitempty"`
	RecordedEvent      *map[string]string                    `json:"recordedEvent,omitempty" dynamodbav:"recordedEvent,omitempty"`
}

func NewRequestCreatedEvent(requestID string, createdAt time.Time, actor *string) RequestEvent {
	t := true
	return RequestEvent{ID: types.NewHistoryID(), CreatedAt: createdAt, Actor: actor, RequestID: requestID, RequestCreated: &t}
}

func NewGrantFailedEvent(requestID string, createdAt time.Time, from, to types.RequestAccessGroupTargetStatus, reason string) RequestEvent {
	return RequestEvent{ID: types.NewHistoryID(), CreatedAt: createdAt, RequestID: requestID, FromGrantStatus: &from, ToGrantStatus: &to, GrantFailureReason: &reason}
}

func NewGrantStatusChangeEvent(requestID string, createdAt time.Time, actor *string, from, to types.RequestAccessGroupTargetStatus) RequestEvent {
	return RequestEvent{ID: types.NewHistoryID(), CreatedAt: createdAt, Actor: actor, RequestID: requestID, FromGrantStatus: &from, ToGrantStatus: &to}
}

func NewGrantCreatedEvent(requestID string, createdAt time.Time) RequestEvent {
	t := true
	return RequestEvent{ID: types.NewHistoryID(), CreatedAt: createdAt, RequestID: requestID, GrantCreated: &t}
}

func NewRequestStatusChangeEvent(requestID string, createdAt time.Time, actor *string, from, to types.RequestStatus) RequestEvent {

	return RequestEvent{ID: types.NewHistoryID(), CreatedAt: createdAt, Actor: actor, RequestID: requestID, FromStatus: &from, ToStatus: &to}
}

func NewGroupStatusChangeEvent(requestID string, createdAt time.Time, actor *string, from, to types.RequestAccessGroupStatus) RequestEvent {

	return RequestEvent{ID: types.NewHistoryID(), CreatedAt: createdAt, Actor: actor, RequestID: requestID, FromGroupStatus: &from, ToGroupStatus: &to}
}

func NewTargetStatusChangeEvent(requestID string, createdAt time.Time, actor *string, from, to types.RequestAccessGroupTargetStatus, target GroupTarget) RequestEvent {

	return RequestEvent{ID: types.NewHistoryID(), CreatedAt: createdAt, Actor: actor, RequestID: requestID, FromGrantStatus: &from, ToGrantStatus: &to, GroupTarget: &target}
}

func NewTimingChangeEvent(requestID string, createdAt time.Time, actor *string, from, to Timing) RequestEvent {
	return RequestEvent{ID: types.NewHistoryID(), CreatedAt: createdAt, Actor: actor, RequestID: requestID, FromTiming: &from, ToTiming: &to}
}

func NewRecordedEvent(requestID string, actor *string, createdAt time.Time, event map[string]string) RequestEvent {
	return RequestEvent{ID: types.NewHistoryID(), Actor: actor, CreatedAt: createdAt, RequestID: requestID, RecordedEvent: &event}
}

func (r *RequestEvent) ToAPI() types.RequestEvent {
	var toTiming *types.RequestAccessGroupTiming
	var fromTiming *types.RequestAccessGroupTiming
	if r.ToTiming != nil {
		tt := r.ToTiming.ToAPI()
		toTiming = &tt
	}
	if r.FromTiming != nil {
		ft := r.FromTiming.ToAPI()
		fromTiming = &ft
	}

	out := types.RequestEvent{
		Id:                 r.ID,
		RequestId:          r.RequestID,
		CreatedAt:          r.CreatedAt,
		Actor:              r.Actor,
		FromGrantStatus:    r.FromGrantStatus,
		FromStatus:         (*types.RequestStatus)(r.FromStatus),
		FromTiming:         fromTiming,
		ToGrantStatus:      r.ToGrantStatus,
		ToStatus:           (*types.RequestStatus)(r.ToStatus),
		ToTiming:           toTiming,
		GrantCreated:       r.GrantCreated,
		RequestCreated:     r.RequestCreated,
		GrantFailureReason: r.GrantFailureReason,
		RecordedEvent:      r.RecordedEvent,
		FromGroupStatus:    r.FromGroupStatus,
		ToGroupStatus:      r.ToGroupStatus,
	}
	if r.GroupTarget != nil {
		t := r.GroupTarget.ToAPI()
		out.Target = &t

	}
	return out

}

func (r *RequestEvent) DDBKeys() (ddb.Keys, error) {
	keys := ddb.Keys{
		PK: keys.AccessRequestEvent.PK1,
		SK: keys.AccessRequestEvent.SK1(r.RequestID, r.ID),
	}

	return keys, nil
}
