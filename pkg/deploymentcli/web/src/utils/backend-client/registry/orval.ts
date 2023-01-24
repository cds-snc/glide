/**
 * Generated by orval v6.10.3 🍺
 * Do not edit manually.
 * Example API
 * Example API
 * OpenAPI spec version: 1.0
 */
import useSwr from 'swr'
import type {
  SWRConfiguration,
  Key
} from 'swr'
import {
  rest
} from 'msw'
import {
  faker
} from '@faker-js/faker'
import { customInstanceRegistry } from '../../custom-instance'
import type { ErrorType } from '../../custom-instance'
export type RegisterProvidersResponseResponse = {
  zipUploadUrl: string;
};

export type ListProvidersResponseResponse = {
  providers: Provider[];
  next: string | null;
};

export type ErrorResponseResponse = {
  error?: string;
};

export type HealthResponseResponse = {
  healthy: boolean;
};

export type ConfigSchemaType = typeof ConfigSchemaType[keyof typeof ConfigSchemaType];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const ConfigSchemaType = {
  STRING: 'STRING',
  SECRETSTRING: 'SECRETSTRING',
} as const;

export interface ConfigSchema {
  id: string;
  type: ConfigSchemaType;
  secret: boolean;
  optional: boolean;
  usage: string;
  name: string;
}

export interface S3Asset {
  path: string;
  bucket: string;
  region: string;
}

export interface Usage {
  usage: string;
}

export type SetupSchema = {[key: string]: ConfigSchema};

export interface Setup {
  steps: string[];
  schema: SetupSchema;
}

export interface Provider {
  team: string;
  name: string;
  version: string;
  usage: string;
  setup: Setup;
}




  
  // eslint-disable-next-line
  type SecondParameter<T extends (...args: any) => any> = T extends (
  config: any,
  args: infer P,
) => any
  ? P
  : never;

/**
 * Returns the health of the service. If any healthchecks fail the response code will be 500 (Internal Server Error).
 * @summary Healthcheck
 */
export const getHealth = (
    
 options?: SecondParameter<typeof customInstanceRegistry>) => {
      return customInstanceRegistry<HealthResponseResponse>(
      {url: `/api/v1/health`, method: 'get'
    },
      options);
    }
  

export const getGetHealthKey = () => [`/api/v1/health`];

    
export type GetHealthQueryResult = NonNullable<Awaited<ReturnType<typeof getHealth>>>
export type GetHealthQueryError = ErrorType<unknown>

export const useGetHealth = <TError = ErrorType<unknown>>(
  options?: { swr?:SWRConfiguration<Awaited<ReturnType<typeof getHealth>>, TError> & { swrKey?: Key, enabled?: boolean }, request?: SecondParameter<typeof customInstanceRegistry> }

  ) => {

  const {swr: swrOptions, request: requestOptions} = options ?? {}

  const isEnabled = swrOptions?.enabled !== false
    const swrKey = swrOptions?.swrKey ?? (() => isEnabled ? getGetHealthKey() : null);
  const swrFn = () => getHealth(requestOptions);

  const query = useSwr<Awaited<ReturnType<typeof swrFn>>, TError>(swrKey, swrFn, swrOptions)

  return {
    swrKey,
    ...query
  }
}


/**
 * @summary Register Provider
 */
export const registerProvider = (
    team: string,
    name: string,
    version: string,
 options?: SecondParameter<typeof customInstanceRegistry>) => {
      return customInstanceRegistry<RegisterProvidersResponseResponse>(
      {url: `/api/v1/team/${team}/providers/${name}/${version}/register`, method: 'post'
    },
      options);
    }
  


/**
 * @summary Complete Registration
 */
export const completeRegistration = (
    team: string,
    name: string,
    version: string,
 options?: SecondParameter<typeof customInstanceRegistry>) => {
      return customInstanceRegistry<void>(
      {url: `/api/v1/team/${team}/providers/${name}/${version}/complete-registration`, method: 'post'
    },
      options);
    }
  


/**
 * @summary Get Provider
 */
export const getProvider = (
    team: string,
    name: string,
    version: string,
 options?: SecondParameter<typeof customInstanceRegistry>) => {
      return customInstanceRegistry<Provider>(
      {url: `/api/v1/team/${team}/providers/${name}/${version}`, method: 'get'
    },
      options);
    }
  

export const getGetProviderKey = (team: string,
    name: string,
    version: string,) => [`/api/v1/team/${team}/providers/${name}/${version}`];

    
export type GetProviderQueryResult = NonNullable<Awaited<ReturnType<typeof getProvider>>>
export type GetProviderQueryError = ErrorType<unknown>

export const useGetProvider = <TError = ErrorType<unknown>>(
 team: string,
    name: string,
    version: string, options?: { swr?:SWRConfiguration<Awaited<ReturnType<typeof getProvider>>, TError> & { swrKey?: Key, enabled?: boolean }, request?: SecondParameter<typeof customInstanceRegistry> }

  ) => {

  const {swr: swrOptions, request: requestOptions} = options ?? {}

  const isEnabled = swrOptions?.enabled !== false && !!(team && name && version)
    const swrKey = swrOptions?.swrKey ?? (() => isEnabled ? getGetProviderKey(team,name,version) : null);
  const swrFn = () => getProvider(team,name,version, requestOptions);

  const query = useSwr<Awaited<ReturnType<typeof swrFn>>, TError>(swrKey, swrFn, swrOptions)

  return {
    swrKey,
    ...query
  }
}


/**
 * @summary List Providers
 */
export const listAllProviders = (
    
 options?: SecondParameter<typeof customInstanceRegistry>) => {
      return customInstanceRegistry<ListProvidersResponseResponse>(
      {url: `/api/v1/providers`, method: 'get'
    },
      options);
    }
  

export const getListAllProvidersKey = () => [`/api/v1/providers`];

    
export type ListAllProvidersQueryResult = NonNullable<Awaited<ReturnType<typeof listAllProviders>>>
export type ListAllProvidersQueryError = ErrorType<ErrorResponseResponse>

export const useListAllProviders = <TError = ErrorType<ErrorResponseResponse>>(
  options?: { swr?:SWRConfiguration<Awaited<ReturnType<typeof listAllProviders>>, TError> & { swrKey?: Key, enabled?: boolean }, request?: SecondParameter<typeof customInstanceRegistry> }

  ) => {

  const {swr: swrOptions, request: requestOptions} = options ?? {}

  const isEnabled = swrOptions?.enabled !== false
    const swrKey = swrOptions?.swrKey ?? (() => isEnabled ? getListAllProvidersKey() : null);
  const swrFn = () => listAllProviders(requestOptions);

  const query = useSwr<Awaited<ReturnType<typeof swrFn>>, TError>(swrKey, swrFn, swrOptions)

  return {
    swrKey,
    ...query
  }
}




export const getGetHealthMock = () => ({healthy: faker.datatype.boolean()})

export const getRegisterProviderMock = () => ({zipUploadUrl: faker.random.word()})

export const getGetProviderMock = () => ({team: faker.random.word(), name: faker.random.word(), version: faker.random.word(), usage: faker.random.word(), setup: {steps: Array.from({ length: faker.datatype.number({ min: 1, max: 10 }) }, (_, i) => i + 1).map(() => (faker.random.word())), schema: {
        'clbvgaijm0000t6wa5mg8drz1': {id: faker.random.word(), type: faker.helpers.arrayElement(['STRING','SECRETSTRING']), secret: faker.datatype.boolean(), optional: faker.datatype.boolean(), usage: faker.random.word(), name: faker.random.word()}
      }}})

export const getListAllProvidersMock = () => ({providers: Array.from({ length: faker.datatype.number({ min: 1, max: 10 }) }, (_, i) => i + 1).map(() => ({team: faker.random.word(), name: faker.random.word(), version: faker.random.word(), usage: faker.random.word(), setup: {steps: Array.from({ length: faker.datatype.number({ min: 1, max: 10 }) }, (_, i) => i + 1).map(() => (faker.random.word())), schema: {
        'clbvgaijt0001t6wa9jxc4yy6': {id: faker.random.word(), type: faker.helpers.arrayElement(['STRING','SECRETSTRING']), secret: faker.datatype.boolean(), optional: faker.datatype.boolean(), usage: faker.random.word(), name: faker.random.word()}
      }}})), next: faker.helpers.arrayElement([faker.random.word(), null])})

export const getExampleAPIMSW = () => [
rest.get('*/api/v1/health', (_req, res, ctx) => {
        return res(
          ctx.delay(1000),
          ctx.status(200, 'Mocked status'),
ctx.json(getGetHealthMock()),
        )
      }),rest.post('*/api/v1/team/:team/providers/:name/:version/register', (_req, res, ctx) => {
        return res(
          ctx.delay(1000),
          ctx.status(200, 'Mocked status'),
ctx.json(getRegisterProviderMock()),
        )
      }),rest.post('*/api/v1/team/:team/providers/:name/:version/complete-registration', (_req, res, ctx) => {
        return res(
          ctx.delay(1000),
          ctx.status(200, 'Mocked status'),
        )
      }),rest.get('*/api/v1/team/:team/providers/:name/:version', (_req, res, ctx) => {
        return res(
          ctx.delay(1000),
          ctx.status(200, 'Mocked status'),
ctx.json(getGetProviderMock()),
        )
      }),rest.get('*/api/v1/providers', (_req, res, ctx) => {
        return res(
          ctx.delay(1000),
          ctx.status(200, 'Mocked status'),
ctx.json(getListAllProvidersMock()),
        )
      }),]
