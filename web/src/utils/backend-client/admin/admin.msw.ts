/**
 * Generated by orval v6.10.3 🍺
 * Do not edit manually.
 * Common Fate
 * Common Fate API
 * OpenAPI spec version: 1.0
 */
import {
  rest
} from 'msw'
import {
  faker
} from '@faker-js/faker'
import {
  AccessRuleStatus,
  IdpStatus,
  LogLevel
} from '.././types'

export const getAdminGetDeploymentVersionMock = () => ({version: faker.random.word()})

export const getAdminListAccessRulesMock = () => ({accessRules: Array.from({ length: faker.datatype.number({ min: 1, max: 10 }) }, (_, i) => i + 1).map(() => ({id: faker.random.word(), version: faker.random.word(), status: faker.helpers.arrayElement(Object.values(AccessRuleStatus)), groups: Array.from({ length: faker.datatype.number({ min: 1, max: 10 }) }, (_, i) => i + 1).map(() => (faker.random.word())), approval: {users: Array.from({ length: faker.datatype.number({ min: 1, max: 10 }) }, (_, i) => i + 1).map(() => (faker.random.word())), groups: Array.from({ length: faker.datatype.number({ min: 1, max: 10 }) }, (_, i) => i + 1).map(() => (faker.random.word()))}, name: faker.random.word(), description: faker.random.word(), metadata: {createdAt: faker.random.word(), createdBy: faker.random.word(), updatedAt: faker.random.word(), updatedBy: faker.random.word(), updateMessage: faker.helpers.arrayElement([faker.random.word(), undefined])}, target: {targetGroup: {id: faker.random.word(), schema: {
        'clglouhcu00022son1ozr87rd': {id: faker.random.word(), title: faker.random.word(), description: faker.helpers.arrayElement([faker.random.word(), undefined]), ruleFormElement: faker.helpers.arrayElement(['INPUT','MULTISELECT','SELECT']), requestFormElement: faker.helpers.arrayElement(['SELECT']), groups: {
        'clglouhct00012son5gy93fqf': {id: faker.random.word(), title: faker.random.word(), description: faker.helpers.arrayElement([faker.random.word(), undefined])}
      }}
      }, from: {publisher: faker.random.word(), name: faker.random.word(), version: faker.random.word(), kind: faker.random.word()}, icon: faker.random.word(), createdAt: faker.helpers.arrayElement([faker.random.word(), undefined]), updatedAt: faker.helpers.arrayElement([faker.random.word(), undefined])}, with: {
        'clglouhcu00042son3gjjgqpe': {values: Array.from({ length: faker.datatype.number({ min: 1, max: 10 }) }, (_, i) => i + 1).map(() => (faker.random.word())), groupings: {
        'clglouhcu00032son187f6zfm': Array.from({ length: faker.datatype.number({ min: 1, max: 10 }) }, (_, i) => i + 1).map(() => (faker.random.word()))
      }, formElement: faker.helpers.arrayElement(['INPUT','MULTISELECT'])}
      }}, timeConstraints: {maxDurationSeconds: faker.datatype.number({min: 60, max: 15724800})}, isCurrent: faker.datatype.boolean()})), next: faker.helpers.arrayElement([faker.random.word(), null])})

export const getAdminCreateAccessRuleMock = () => ({id: faker.random.word(), version: faker.random.word(), status: faker.helpers.arrayElement(Object.values(AccessRuleStatus)), groups: Array.from({ length: faker.datatype.number({ min: 1, max: 10 }) }, (_, i) => i + 1).map(() => (faker.random.word())), approval: {users: Array.from({ length: faker.datatype.number({ min: 1, max: 10 }) }, (_, i) => i + 1).map(() => (faker.random.word())), groups: Array.from({ length: faker.datatype.number({ min: 1, max: 10 }) }, (_, i) => i + 1).map(() => (faker.random.word()))}, name: faker.random.word(), description: faker.random.word(), metadata: {createdAt: faker.random.word(), createdBy: faker.random.word(), updatedAt: faker.random.word(), updatedBy: faker.random.word(), updateMessage: faker.helpers.arrayElement([faker.random.word(), undefined])}, target: {targetGroup: {id: faker.random.word(), schema: {
        'clglouhcv00062son5ldf71so': {id: faker.random.word(), title: faker.random.word(), description: faker.helpers.arrayElement([faker.random.word(), undefined]), ruleFormElement: faker.helpers.arrayElement(['INPUT','MULTISELECT','SELECT']), requestFormElement: faker.helpers.arrayElement(['SELECT']), groups: {
        'clglouhcv00052son3omffigk': {id: faker.random.word(), title: faker.random.word(), description: faker.helpers.arrayElement([faker.random.word(), undefined])}
      }}
      }, from: {publisher: faker.random.word(), name: faker.random.word(), version: faker.random.word(), kind: faker.random.word()}, icon: faker.random.word(), createdAt: faker.helpers.arrayElement([faker.random.word(), undefined]), updatedAt: faker.helpers.arrayElement([faker.random.word(), undefined])}, with: {
        'clglouhcv00082son4omp8nq9': {values: Array.from({ length: faker.datatype.number({ min: 1, max: 10 }) }, (_, i) => i + 1).map(() => (faker.random.word())), groupings: {
        'clglouhcv00072sonaodzepz4': Array.from({ length: faker.datatype.number({ min: 1, max: 10 }) }, (_, i) => i + 1).map(() => (faker.random.word()))
      }, formElement: faker.helpers.arrayElement(['INPUT','MULTISELECT'])}
      }}, timeConstraints: {maxDurationSeconds: faker.datatype.number({min: 60, max: 15724800})}, isCurrent: faker.datatype.boolean()})

export const getAdminGetAccessRuleMock = () => ({id: faker.random.word(), version: faker.random.word(), status: faker.helpers.arrayElement(Object.values(AccessRuleStatus)), groups: Array.from({ length: faker.datatype.number({ min: 1, max: 10 }) }, (_, i) => i + 1).map(() => (faker.random.word())), approval: {users: Array.from({ length: faker.datatype.number({ min: 1, max: 10 }) }, (_, i) => i + 1).map(() => (faker.random.word())), groups: Array.from({ length: faker.datatype.number({ min: 1, max: 10 }) }, (_, i) => i + 1).map(() => (faker.random.word()))}, name: faker.random.word(), description: faker.random.word(), metadata: {createdAt: faker.random.word(), createdBy: faker.random.word(), updatedAt: faker.random.word(), updatedBy: faker.random.word(), updateMessage: faker.helpers.arrayElement([faker.random.word(), undefined])}, target: {targetGroup: {id: faker.random.word(), schema: {
        'clglouhd2000a2son4w5k7kii': {id: faker.random.word(), title: faker.random.word(), description: faker.helpers.arrayElement([faker.random.word(), undefined]), ruleFormElement: faker.helpers.arrayElement(['INPUT','MULTISELECT','SELECT']), requestFormElement: faker.helpers.arrayElement(['SELECT']), groups: {
        'clglouhd200092son9mlo0nch': {id: faker.random.word(), title: faker.random.word(), description: faker.helpers.arrayElement([faker.random.word(), undefined])}
      }}
      }, from: {publisher: faker.random.word(), name: faker.random.word(), version: faker.random.word(), kind: faker.random.word()}, icon: faker.random.word(), createdAt: faker.helpers.arrayElement([faker.random.word(), undefined]), updatedAt: faker.helpers.arrayElement([faker.random.word(), undefined])}, with: {
        'clglouhd2000c2son5ybdfvjz': {values: Array.from({ length: faker.datatype.number({ min: 1, max: 10 }) }, (_, i) => i + 1).map(() => (faker.random.word())), groupings: {
        'clglouhd2000b2son6mya1eha': Array.from({ length: faker.datatype.number({ min: 1, max: 10 }) }, (_, i) => i + 1).map(() => (faker.random.word()))
      }, formElement: faker.helpers.arrayElement(['INPUT','MULTISELECT'])}
      }}, timeConstraints: {maxDurationSeconds: faker.datatype.number({min: 60, max: 15724800})}, isCurrent: faker.datatype.boolean()})

export const getAdminUpdateAccessRuleMock = () => ({id: faker.random.word(), version: faker.random.word(), status: faker.helpers.arrayElement(Object.values(AccessRuleStatus)), groups: Array.from({ length: faker.datatype.number({ min: 1, max: 10 }) }, (_, i) => i + 1).map(() => (faker.random.word())), approval: {users: Array.from({ length: faker.datatype.number({ min: 1, max: 10 }) }, (_, i) => i + 1).map(() => (faker.random.word())), groups: Array.from({ length: faker.datatype.number({ min: 1, max: 10 }) }, (_, i) => i + 1).map(() => (faker.random.word()))}, name: faker.random.word(), description: faker.random.word(), metadata: {createdAt: faker.random.word(), createdBy: faker.random.word(), updatedAt: faker.random.word(), updatedBy: faker.random.word(), updateMessage: faker.helpers.arrayElement([faker.random.word(), undefined])}, target: {targetGroup: {id: faker.random.word(), schema: {
        'clglouhd3000e2sonbh7wbhdn': {id: faker.random.word(), title: faker.random.word(), description: faker.helpers.arrayElement([faker.random.word(), undefined]), ruleFormElement: faker.helpers.arrayElement(['INPUT','MULTISELECT','SELECT']), requestFormElement: faker.helpers.arrayElement(['SELECT']), groups: {
        'clglouhd3000d2sonfkfe80dg': {id: faker.random.word(), title: faker.random.word(), description: faker.helpers.arrayElement([faker.random.word(), undefined])}
      }}
      }, from: {publisher: faker.random.word(), name: faker.random.word(), version: faker.random.word(), kind: faker.random.word()}, icon: faker.random.word(), createdAt: faker.helpers.arrayElement([faker.random.word(), undefined]), updatedAt: faker.helpers.arrayElement([faker.random.word(), undefined])}, with: {
        'clglouhd3000g2son1viw4hlv': {values: Array.from({ length: faker.datatype.number({ min: 1, max: 10 }) }, (_, i) => i + 1).map(() => (faker.random.word())), groupings: {
        'clglouhd3000f2son2vbs66f9': Array.from({ length: faker.datatype.number({ min: 1, max: 10 }) }, (_, i) => i + 1).map(() => (faker.random.word()))
      }, formElement: faker.helpers.arrayElement(['INPUT','MULTISELECT'])}
      }}, timeConstraints: {maxDurationSeconds: faker.datatype.number({min: 60, max: 15724800})}, isCurrent: faker.datatype.boolean()})

export const getAdminArchiveAccessRuleMock = () => ({id: faker.random.word(), version: faker.random.word(), status: faker.helpers.arrayElement(Object.values(AccessRuleStatus)), groups: Array.from({ length: faker.datatype.number({ min: 1, max: 10 }) }, (_, i) => i + 1).map(() => (faker.random.word())), approval: {users: Array.from({ length: faker.datatype.number({ min: 1, max: 10 }) }, (_, i) => i + 1).map(() => (faker.random.word())), groups: Array.from({ length: faker.datatype.number({ min: 1, max: 10 }) }, (_, i) => i + 1).map(() => (faker.random.word()))}, name: faker.random.word(), description: faker.random.word(), metadata: {createdAt: faker.random.word(), createdBy: faker.random.word(), updatedAt: faker.random.word(), updatedBy: faker.random.word(), updateMessage: faker.helpers.arrayElement([faker.random.word(), undefined])}, target: {targetGroup: {id: faker.random.word(), schema: {
        'clglouhd6000i2son1bru3y5g': {id: faker.random.word(), title: faker.random.word(), description: faker.helpers.arrayElement([faker.random.word(), undefined]), ruleFormElement: faker.helpers.arrayElement(['INPUT','MULTISELECT','SELECT']), requestFormElement: faker.helpers.arrayElement(['SELECT']), groups: {
        'clglouhd6000h2sonbv24ab3e': {id: faker.random.word(), title: faker.random.word(), description: faker.helpers.arrayElement([faker.random.word(), undefined])}
      }}
      }, from: {publisher: faker.random.word(), name: faker.random.word(), version: faker.random.word(), kind: faker.random.word()}, icon: faker.random.word(), createdAt: faker.helpers.arrayElement([faker.random.word(), undefined]), updatedAt: faker.helpers.arrayElement([faker.random.word(), undefined])}, with: {
        'clglouhd6000k2son9t8j1fyr': {values: Array.from({ length: faker.datatype.number({ min: 1, max: 10 }) }, (_, i) => i + 1).map(() => (faker.random.word())), groupings: {
        'clglouhd6000j2son9qi5cfd8': Array.from({ length: faker.datatype.number({ min: 1, max: 10 }) }, (_, i) => i + 1).map(() => (faker.random.word()))
      }, formElement: faker.helpers.arrayElement(['INPUT','MULTISELECT'])}
      }}, timeConstraints: {maxDurationSeconds: faker.datatype.number({min: 60, max: 15724800})}, isCurrent: faker.datatype.boolean()})

export const getAdminListRequestsMock = () => ({requests: Array.from({ length: faker.datatype.number({ min: 1, max: 10 }) }, (_, i) => i + 1).map(() => ({id: faker.random.word(), context: {purpose: {reason: faker.random.word()}, context: {ip: faker.random.word(), userAgent: faker.random.word()}, metadata: {createdAt: faker.random.word()}}, user: {id: faker.random.word(), email: faker.random.word(), firstName: faker.random.word(), picture: faker.random.word(), status: faker.helpers.arrayElement(Object.values(IdpStatus)), lastName: faker.random.word(), updatedAt: faker.random.word(), groups: Array.from({ length: faker.datatype.number({ min: 1, max: 10 }) }, (_, i) => i + 1).map(() => (faker.random.word()))}, createdAt: faker.random.word(), updatedAt: faker.random.word()})), next: faker.helpers.arrayElement([faker.random.word(), undefined])})

export const getAdminUpdateUserMock = () => ({id: faker.random.word(), email: faker.random.word(), firstName: faker.random.word(), picture: faker.random.word(), status: faker.helpers.arrayElement(Object.values(IdpStatus)), lastName: faker.random.word(), updatedAt: faker.random.word(), groups: Array.from({ length: faker.datatype.number({ min: 1, max: 10 }) }, (_, i) => i + 1).map(() => (faker.random.word()))})

export const getAdminListUsersMock = () => ({users: Array.from({ length: faker.datatype.number({ min: 1, max: 10 }) }, (_, i) => i + 1).map(() => ({id: faker.random.word(), email: faker.random.word(), firstName: faker.random.word(), picture: faker.random.word(), status: faker.helpers.arrayElement(Object.values(IdpStatus)), lastName: faker.random.word(), updatedAt: faker.random.word(), groups: Array.from({ length: faker.datatype.number({ min: 1, max: 10 }) }, (_, i) => i + 1).map(() => (faker.random.word()))})), next: faker.helpers.arrayElement([faker.random.word(), null])})

export const getAdminCreateUserMock = () => ({id: faker.random.word(), email: faker.random.word(), firstName: faker.random.word(), picture: faker.random.word(), status: faker.helpers.arrayElement(Object.values(IdpStatus)), lastName: faker.random.word(), updatedAt: faker.random.word(), groups: Array.from({ length: faker.datatype.number({ min: 1, max: 10 }) }, (_, i) => i + 1).map(() => (faker.random.word()))})

export const getAdminListGroupsMock = () => ({groups: Array.from({ length: faker.datatype.number({ min: 1, max: 10 }) }, (_, i) => i + 1).map(() => ({name: faker.random.word(), description: faker.random.word(), id: faker.random.word(), memberCount: faker.datatype.number({min: undefined, max: undefined}), members: Array.from({ length: faker.datatype.number({ min: 1, max: 10 }) }, (_, i) => i + 1).map(() => (faker.random.word())), source: faker.random.word()})), next: faker.helpers.arrayElement([faker.random.word(), null])})

export const getAdminCreateGroupMock = () => ({name: faker.random.word(), description: faker.random.word(), id: faker.random.word(), memberCount: faker.datatype.number({min: undefined, max: undefined}), members: Array.from({ length: faker.datatype.number({ min: 1, max: 10 }) }, (_, i) => i + 1).map(() => (faker.random.word())), source: faker.random.word()})

export const getAdminGetGroupMock = () => ({name: faker.random.word(), description: faker.random.word(), id: faker.random.word(), memberCount: faker.datatype.number({min: undefined, max: undefined}), members: Array.from({ length: faker.datatype.number({ min: 1, max: 10 }) }, (_, i) => i + 1).map(() => (faker.random.word())), source: faker.random.word()})

export const getAdminUpdateGroupMock = () => ({name: faker.random.word(), description: faker.random.word(), id: faker.random.word(), memberCount: faker.datatype.number({min: undefined, max: undefined}), members: Array.from({ length: faker.datatype.number({ min: 1, max: 10 }) }, (_, i) => i + 1).map(() => (faker.random.word())), source: faker.random.word()})

export const getAdminGetIdentityConfigurationMock = () => ({identityProvider: faker.random.word(), administratorGroupId: faker.random.word()})

export const getAdminGetHandlerMock = () => ({id: faker.random.word(), runtime: faker.random.word(), functionArn: faker.random.word(), awsAccount: faker.random.word(), awsRegion: faker.random.word(), healthy: faker.datatype.boolean(), diagnostics: Array.from({ length: faker.datatype.number({ min: 1, max: 10 }) }, (_, i) => i + 1).map(() => ({level: faker.helpers.arrayElement(Object.values(LogLevel)), code: faker.random.word(), message: faker.random.word()}))})

export const getAdminDeleteHandlerMock = () => ({})

export const getAdminListHandlersMock = () => ({res: Array.from({ length: faker.datatype.number({ min: 1, max: 10 }) }, (_, i) => i + 1).map(() => ({id: faker.random.word(), runtime: faker.random.word(), functionArn: faker.random.word(), awsAccount: faker.random.word(), awsRegion: faker.random.word(), healthy: faker.datatype.boolean(), diagnostics: Array.from({ length: faker.datatype.number({ min: 1, max: 10 }) }, (_, i) => i + 1).map(() => ({level: faker.helpers.arrayElement(Object.values(LogLevel)), code: faker.random.word(), message: faker.random.word()}))})), next: faker.random.word()})

export const getAdminRegisterHandlerMock = () => ({id: faker.random.word(), runtime: faker.random.word(), functionArn: faker.random.word(), awsAccount: faker.random.word(), awsRegion: faker.random.word(), healthy: faker.datatype.boolean(), diagnostics: Array.from({ length: faker.datatype.number({ min: 1, max: 10 }) }, (_, i) => i + 1).map(() => ({level: faker.helpers.arrayElement(Object.values(LogLevel)), code: faker.random.word(), message: faker.random.word()}))})

export const getAdminGetTargetGroupMock = () => ({id: faker.random.word(), schema: {
        'clglouhed000p2son5j9o2jw5': {id: faker.random.word(), title: faker.random.word(), description: faker.helpers.arrayElement([faker.random.word(), undefined]), ruleFormElement: faker.helpers.arrayElement(['INPUT','MULTISELECT','SELECT']), requestFormElement: faker.helpers.arrayElement(['SELECT']), groups: {
        'clglouhed000o2son6knxdq2t': {id: faker.random.word(), title: faker.random.word(), description: faker.helpers.arrayElement([faker.random.word(), undefined])}
      }}
      }, from: {publisher: faker.random.word(), name: faker.random.word(), version: faker.random.word(), kind: faker.random.word()}, icon: faker.random.word(), createdAt: faker.helpers.arrayElement([faker.random.word(), undefined]), updatedAt: faker.helpers.arrayElement([faker.random.word(), undefined])})

export const getAdminListTargetGroupsMock = () => ({targetGroups: Array.from({ length: faker.datatype.number({ min: 1, max: 10 }) }, (_, i) => i + 1).map(() => ({id: faker.random.word(), schema: {
        'clglouheg000r2sonbzm4e6go': {id: faker.random.word(), title: faker.random.word(), description: faker.helpers.arrayElement([faker.random.word(), undefined]), ruleFormElement: faker.helpers.arrayElement(['INPUT','MULTISELECT','SELECT']), requestFormElement: faker.helpers.arrayElement(['SELECT']), groups: {
        'clglouheg000q2son6kzxfhqq': {id: faker.random.word(), title: faker.random.word(), description: faker.helpers.arrayElement([faker.random.word(), undefined])}
      }}
      }, from: {publisher: faker.random.word(), name: faker.random.word(), version: faker.random.word(), kind: faker.random.word()}, icon: faker.random.word(), createdAt: faker.helpers.arrayElement([faker.random.word(), undefined]), updatedAt: faker.helpers.arrayElement([faker.random.word(), undefined])})), next: faker.helpers.arrayElement([faker.random.word(), undefined])})

export const getAdminCreateTargetGroupMock = () => ({id: faker.random.word(), schema: {
        'clglouheh000t2son9e3m2whi': {id: faker.random.word(), title: faker.random.word(), description: faker.helpers.arrayElement([faker.random.word(), undefined]), ruleFormElement: faker.helpers.arrayElement(['INPUT','MULTISELECT','SELECT']), requestFormElement: faker.helpers.arrayElement(['SELECT']), groups: {
        'clglouheh000s2son2tk14rev': {id: faker.random.word(), title: faker.random.word(), description: faker.helpers.arrayElement([faker.random.word(), undefined])}
      }}
      }, from: {publisher: faker.random.word(), name: faker.random.word(), version: faker.random.word(), kind: faker.random.word()}, icon: faker.random.word(), createdAt: faker.helpers.arrayElement([faker.random.word(), undefined]), updatedAt: faker.helpers.arrayElement([faker.random.word(), undefined])})

export const getAdminCreateTargetGroupLinkMock = () => ({targetGroupId: faker.random.word(), handlerId: faker.random.word(), kind: faker.random.word(), priority: faker.datatype.number({min: undefined, max: undefined}), valid: faker.datatype.boolean(), diagnostics: Array.from({ length: faker.datatype.number({ min: 1, max: 10 }) }, (_, i) => i + 1).map(() => ({level: faker.helpers.arrayElement(Object.values(LogLevel)), code: faker.random.word(), message: faker.random.word()}))})

export const getAdminGetTargetGroupArgsMock = () => ({
        'clglouhem000v2son25ax2qxr': {id: faker.random.word(), title: faker.random.word(), resourceName: faker.helpers.arrayElement([faker.random.word(), undefined]), description: faker.helpers.arrayElement([faker.random.word(), undefined]), ruleFormElement: faker.helpers.arrayElement(['INPUT','MULTISELECT','SELECT']), requestFormElement: faker.helpers.arrayElement([faker.helpers.arrayElement(['SELECT']), undefined]), groups: faker.helpers.arrayElement([{
        'clglouhem000u2son4t0o6o66': {name: faker.random.word(), description: faker.random.word(), id: faker.random.word(), memberCount: faker.datatype.number({min: undefined, max: undefined}), members: Array.from({ length: faker.datatype.number({ min: 1, max: 10 }) }, (_, i) => i + 1).map(() => (faker.random.word())), source: faker.random.word()}
      }, undefined])}
      })

export const getAdminListTargetGroupArgOptionsMock = () => ({options: Array.from({ length: faker.datatype.number({ min: 1, max: 10 }) }, (_, i) => i + 1).map(() => ({label: faker.random.word(), value: faker.random.word(), description: faker.helpers.arrayElement([faker.random.word(), undefined])})), groups: faker.helpers.arrayElement([{
        'clglouheo000w2songdd60993': Array.from({ length: faker.datatype.number({ min: 1, max: 10 }) }, (_, i) => i + 1).map(() => ({label: faker.random.word(), description: faker.helpers.arrayElement([faker.random.word(), undefined]), value: faker.random.word(), children: Array.from({ length: faker.datatype.number({ min: 1, max: 10 }) }, (_, i) => i + 1).map(() => (faker.random.word())), labelPrefix: faker.helpers.arrayElement([faker.random.word(), undefined])}))
      }, undefined])})

export const getAdminMSW = () => [
rest.get('*/api/v1/admin/deployment/version', (_req, res, ctx) => {
        return res(
          ctx.delay(1000),
          ctx.status(200, 'Mocked status'),
ctx.json(getAdminGetDeploymentVersionMock()),
        )
      }),rest.get('*/api/v1/admin/access-rules', (_req, res, ctx) => {
        return res(
          ctx.delay(1000),
          ctx.status(200, 'Mocked status'),
ctx.json(getAdminListAccessRulesMock()),
        )
      }),rest.post('*/api/v1/admin/access-rules', (_req, res, ctx) => {
        return res(
          ctx.delay(1000),
          ctx.status(200, 'Mocked status'),
ctx.json(getAdminCreateAccessRuleMock()),
        )
      }),rest.get('*/api/v1/admin/access-rules/:ruleId', (_req, res, ctx) => {
        return res(
          ctx.delay(1000),
          ctx.status(200, 'Mocked status'),
ctx.json(getAdminGetAccessRuleMock()),
        )
      }),rest.put('*/api/v1/admin/access-rules/:ruleId', (_req, res, ctx) => {
        return res(
          ctx.delay(1000),
          ctx.status(200, 'Mocked status'),
ctx.json(getAdminUpdateAccessRuleMock()),
        )
      }),rest.post('*/api/v1/admin/access-rules/:ruleId/archive', (_req, res, ctx) => {
        return res(
          ctx.delay(1000),
          ctx.status(200, 'Mocked status'),
ctx.json(getAdminArchiveAccessRuleMock()),
        )
      }),rest.get('*/api/v1/admin/requests', (_req, res, ctx) => {
        return res(
          ctx.delay(1000),
          ctx.status(200, 'Mocked status'),
ctx.json(getAdminListRequestsMock()),
        )
      }),rest.post('*/api/v1/admin/users/:userId', (_req, res, ctx) => {
        return res(
          ctx.delay(1000),
          ctx.status(200, 'Mocked status'),
ctx.json(getAdminUpdateUserMock()),
        )
      }),rest.get('*/api/v1/admin/users', (_req, res, ctx) => {
        return res(
          ctx.delay(1000),
          ctx.status(200, 'Mocked status'),
ctx.json(getAdminListUsersMock()),
        )
      }),rest.post('*/api/v1/admin/users', (_req, res, ctx) => {
        return res(
          ctx.delay(1000),
          ctx.status(200, 'Mocked status'),
ctx.json(getAdminCreateUserMock()),
        )
      }),rest.get('*/api/v1/admin/groups', (_req, res, ctx) => {
        return res(
          ctx.delay(1000),
          ctx.status(200, 'Mocked status'),
ctx.json(getAdminListGroupsMock()),
        )
      }),rest.post('*/api/v1/admin/groups', (_req, res, ctx) => {
        return res(
          ctx.delay(1000),
          ctx.status(200, 'Mocked status'),
ctx.json(getAdminCreateGroupMock()),
        )
      }),rest.get('*/api/v1/admin/groups/:groupId', (_req, res, ctx) => {
        return res(
          ctx.delay(1000),
          ctx.status(200, 'Mocked status'),
ctx.json(getAdminGetGroupMock()),
        )
      }),rest.put('*/api/v1/admin/groups/:groupId', (_req, res, ctx) => {
        return res(
          ctx.delay(1000),
          ctx.status(200, 'Mocked status'),
ctx.json(getAdminUpdateGroupMock()),
        )
      }),rest.delete('*/api/v1/admin/groups/:groupId', (_req, res, ctx) => {
        return res(
          ctx.delay(1000),
          ctx.status(200, 'Mocked status'),
        )
      }),rest.post('*/api/v1/admin/identity/sync', (_req, res, ctx) => {
        return res(
          ctx.delay(1000),
          ctx.status(200, 'Mocked status'),
        )
      }),rest.get('*/api/v1/admin/identity', (_req, res, ctx) => {
        return res(
          ctx.delay(1000),
          ctx.status(200, 'Mocked status'),
ctx.json(getAdminGetIdentityConfigurationMock()),
        )
      }),rest.get('*/api/v1/admin/handlers/:id', (_req, res, ctx) => {
        return res(
          ctx.delay(1000),
          ctx.status(200, 'Mocked status'),
ctx.json(getAdminGetHandlerMock()),
        )
      }),rest.delete('*/api/v1/admin/handlers/:id', (_req, res, ctx) => {
        return res(
          ctx.delay(1000),
          ctx.status(200, 'Mocked status'),
ctx.json(getAdminDeleteHandlerMock()),
        )
      }),rest.get('*/api/v1/admin/handlers', (_req, res, ctx) => {
        return res(
          ctx.delay(1000),
          ctx.status(200, 'Mocked status'),
ctx.json(getAdminListHandlersMock()),
        )
      }),rest.post('*/api/v1/admin/handlers', (_req, res, ctx) => {
        return res(
          ctx.delay(1000),
          ctx.status(200, 'Mocked status'),
ctx.json(getAdminRegisterHandlerMock()),
        )
      }),rest.get('*/api/v1/admin/target-groups/:id', (_req, res, ctx) => {
        return res(
          ctx.delay(1000),
          ctx.status(200, 'Mocked status'),
ctx.json(getAdminGetTargetGroupMock()),
        )
      }),rest.delete('*/api/v1/admin/target-groups/:id', (_req, res, ctx) => {
        return res(
          ctx.delay(1000),
          ctx.status(200, 'Mocked status'),
        )
      }),rest.get('*/api/v1/admin/target-groups', (_req, res, ctx) => {
        return res(
          ctx.delay(1000),
          ctx.status(200, 'Mocked status'),
ctx.json(getAdminListTargetGroupsMock()),
        )
      }),rest.post('*/api/v1/admin/target-groups', (_req, res, ctx) => {
        return res(
          ctx.delay(1000),
          ctx.status(200, 'Mocked status'),
ctx.json(getAdminCreateTargetGroupMock()),
        )
      }),rest.post('*/api/v1/admin/target-groups/:id/link', (_req, res, ctx) => {
        return res(
          ctx.delay(1000),
          ctx.status(200, 'Mocked status'),
ctx.json(getAdminCreateTargetGroupLinkMock()),
        )
      }),rest.post('*/api/v1/admin/target-groups/:id/unlink', (_req, res, ctx) => {
        return res(
          ctx.delay(1000),
          ctx.status(200, 'Mocked status'),
        )
      }),rest.get('*/api/v1/admin/target-groups/:tgId/args', (_req, res, ctx) => {
        return res(
          ctx.delay(1000),
          ctx.status(200, 'Mocked status'),
ctx.json(getAdminGetTargetGroupArgsMock()),
        )
      }),rest.get('*/api/v1/admin/target-groups/:tgId/args/:argId/options', (_req, res, ctx) => {
        return res(
          ctx.delay(1000),
          ctx.status(200, 'Mocked status'),
ctx.json(getAdminListTargetGroupArgOptionsMock()),
        )
      }),rest.post('*/api/v1/admin/healthcheck-handlers', (_req, res, ctx) => {
        return res(
          ctx.delay(1000),
          ctx.status(200, 'Mocked status'),
        )
      }),]
