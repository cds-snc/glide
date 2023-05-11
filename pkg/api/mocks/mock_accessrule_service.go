// Code generated by MockGen. DO NOT EDIT.
// Source: github.com/common-fate/common-fate/pkg/api (interfaces: AccessRuleService)

// Package mocks is a generated GoMock package.
package mocks

import (
	context "context"
	reflect "reflect"

	rule "github.com/common-fate/common-fate/pkg/rule"
	rulesvc "github.com/common-fate/common-fate/pkg/service/rulesvc"
	types "github.com/common-fate/common-fate/pkg/types"
	gomock "github.com/golang/mock/gomock"
)

// MockAccessRuleService is a mock of AccessRuleService interface.
type MockAccessRuleService struct {
	ctrl     *gomock.Controller
	recorder *MockAccessRuleServiceMockRecorder
}

// MockAccessRuleServiceMockRecorder is the mock recorder for MockAccessRuleService.
type MockAccessRuleServiceMockRecorder struct {
	mock *MockAccessRuleService
}

// NewMockAccessRuleService creates a new mock instance.
func NewMockAccessRuleService(ctrl *gomock.Controller) *MockAccessRuleService {
	mock := &MockAccessRuleService{ctrl: ctrl}
	mock.recorder = &MockAccessRuleServiceMockRecorder{mock}
	return mock
}

// EXPECT returns an object that allows the caller to indicate expected use.
func (m *MockAccessRuleService) EXPECT() *MockAccessRuleServiceMockRecorder {
	return m.recorder
}

// CreateAccessRule mocks base method.
func (m *MockAccessRuleService) CreateAccessRule(arg0 context.Context, arg1 string, arg2 types.CreateAccessRuleRequest) (*rule.AccessRule, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "CreateAccessRule", arg0, arg1, arg2)
	ret0, _ := ret[0].(*rule.AccessRule)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// CreateAccessRule indicates an expected call of CreateAccessRule.
func (mr *MockAccessRuleServiceMockRecorder) CreateAccessRule(arg0, arg1, arg2 interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "CreateAccessRule", reflect.TypeOf((*MockAccessRuleService)(nil).CreateAccessRule), arg0, arg1, arg2)
}

// DeleteRule mocks base method.
func (m *MockAccessRuleService) DeleteRule(arg0 context.Context, arg1 string) error {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "DeleteRule", arg0, arg1)
	ret0, _ := ret[0].(error)
	return ret0
}

// DeleteRule indicates an expected call of DeleteRule.
func (mr *MockAccessRuleServiceMockRecorder) DeleteRule(arg0, arg1 interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "DeleteRule", reflect.TypeOf((*MockAccessRuleService)(nil).DeleteRule), arg0, arg1)
}

// UpdateRule mocks base method.
func (m *MockAccessRuleService) UpdateRule(arg0 context.Context, arg1 *rulesvc.UpdateOpts) (*rule.AccessRule, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "UpdateRule", arg0, arg1)
	ret0, _ := ret[0].(*rule.AccessRule)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// UpdateRule indicates an expected call of UpdateRule.
func (mr *MockAccessRuleServiceMockRecorder) UpdateRule(arg0, arg1 interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "UpdateRule", reflect.TypeOf((*MockAccessRuleService)(nil).UpdateRule), arg0, arg1)
}
