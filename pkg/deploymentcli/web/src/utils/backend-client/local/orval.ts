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
import { customInstanceLocal } from '../../custom-instance'
import type { ErrorType } from '../../custom-instance'
export type CreateProviderSetupRequestBody = {
  team: string;
  name: string;
  version: string;
};

/**
 * The config values entered by the user which correspond to the setup step.
 */
export type ProviderSetupStepCompleteRequestBodyConfigValues = {[key: string]: string};

export type ProviderSetupStepCompleteRequestBody = {
  /** Whether the step is complete or not. */
  complete: boolean;
  /** The config values entered by the user which correspond to the setup step. */
  configValues: ProviderSetupStepCompleteRequestBodyConfigValues;
};

export type ErrorResponseResponse = {
  error?: string;
};

export type HealthResponseResponse = {
  healthy: boolean;
};

export type CompleteProviderSetupResponseResponse = {
  /** Whether a manual update is required to the Common Fate deployment configuration (`deployment.yml`) to activate the provider. */
  deploymentConfigUpdateRequired: boolean;
};

export type ListProviderSetupsResponseResponse = {
  providerSetups: ProviderSetup[];
};

/**
 * Returns a ProviderSetup object.
 */
export type ProviderSetupResponseResponse = ProviderSetup;

/**
 * The log level.
 */
export type ProviderSetupDiagnosticLogLevel = typeof ProviderSetupDiagnosticLogLevel[keyof typeof ProviderSetupDiagnosticLogLevel];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const ProviderSetupDiagnosticLogLevel = {
  INFO: 'INFO',
  WARNING: 'WARNING',
  ERROR: 'ERROR',
} as const;

/**
 * A log entry related to a provider setup validation.
 */
export interface ProviderSetupDiagnosticLog {
  /** The log level. */
  level: ProviderSetupDiagnosticLogLevel;
  /** The log message. */
  msg: string;
}

/**
 * The status of the validation.
 */
export type ProviderSetupValidationStatus = typeof ProviderSetupValidationStatus[keyof typeof ProviderSetupValidationStatus];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const ProviderSetupValidationStatus = {
  IN_PROGRESS: 'IN_PROGRESS',
  SUCCESS: 'SUCCESS',
  PENDING: 'PENDING',
  ERROR: 'ERROR',
} as const;

/**
 * A validation against the configuration values of the Access Provider.
 */
export interface ProviderSetupValidation {
  /** The ID of the validation, such as `list-sso-users`. */
  id: string;
  /** The status of the validation. */
  status: ProviderSetupValidationStatus;
  /** The particular config fields validated, if any. */
  fieldsValidated: unknown[];
  logs?: ProviderSetupDiagnosticLog[];
}

export interface ProviderConfigValue {
  /** The ID of the config field. */
  id: string;
  /** The value entered by the user. */
  value: string;
}

export interface ProviderConfigField {
  id: string;
  name: string;
  description: string;
  /** Whether the config value is optional. */
  isOptional: boolean;
  /** Whether or not the config field is a secret (like an API key or a password) */
  isSecret: boolean;
  /** the path to where the secret will be stored, in a secrets manager like AWS SSM Parameter Store. */
  secretPath?: string;
}

export interface ProviderSetupStepDetails {
  title: string;
  instructions: string;
  configFields: ProviderConfigField[];
}

/**
 * Indicates whether a setup step is complete or not.
 */
export interface ProviderSetupStepOverview {
  /** Whether the step has been completed. */
  complete: boolean;
}

export interface ProviderSetupInstructions {
  stepDetails: ProviderSetupStepDetails[];
}

/**
 * Provider 
 */
export interface Provider {
  id: string;
  type: string;
}

/**
 * The log level.
 */
export type LogLevel = typeof LogLevel[keyof typeof LogLevel];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const LogLevel = {
  INFO: 'INFO',
  WARNING: 'WARNING',
  ERROR: 'ERROR',
} as const;

/**
 * A log entry.
 */
export interface Log {
  /** The log level. */
  level: LogLevel;
  /** The log message. */
  msg: string;
}

/**
 * The current configuration values.
 */
export type ProviderSetupConfigValues = { [key: string]: any };

/**
 * The status of the setup process.
 */
export type ProviderSetupStatus = typeof ProviderSetupStatus[keyof typeof ProviderSetupStatus];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const ProviderSetupStatus = {
  COMPLETE: 'COMPLETE',
  VALIDATION_FAILED: 'VALIDATION_FAILED',
  VALIDATING: 'VALIDATING',
  INITIAL_CONFIGURATION_IN_PROGRESS: 'INITIAL_CONFIGURATION_IN_PROGRESS',
  VALIDATION_SUCEEDED: 'VALIDATION_SUCEEDED',
} as const;

/**
 * A provider in the process of being set up through the guided setup workflow in Common Fate. These providers are **not** yet active.
 */
export interface ProviderSetup {
  /** A unique ID for the provider setup. This is a random KSUID to avoid potential conflicts with user-specified provider IDs in the `deployment.yml` file. */
  id: string;
  team: string;
  name: string;
  /** The version of the provider. */
  version: string;
  /** The status of the setup process. */
  status: ProviderSetupStatus;
  /** An overview of the steps indicating whether they are complete. */
  steps: ProviderSetupStepOverview[];
  /** The current configuration values. */
  configValues: ProviderSetupConfigValues;
  configValidation: ProviderConfigValidation[];
}

/**
 * The status of the validation.
 */
export type ProviderConfigValidationStatus = typeof ProviderConfigValidationStatus[keyof typeof ProviderConfigValidationStatus];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const ProviderConfigValidationStatus = {
  IN_PROGRESS: 'IN_PROGRESS',
  SUCCESS: 'SUCCESS',
  PENDING: 'PENDING',
  ERROR: 'ERROR',
} as const;

/**
 * A validation against the configuration values of the Access Provider.
 */
export interface ProviderConfigValidation {
  /** The ID of the validation, such as `list-sso-users`. */
  id: string;
  name: string;
  /** The status of the validation. */
  status: ProviderConfigValidationStatus;
  /** The particular config fields validated, if any. */
  fieldsValidated: string[];
  logs: Log[];
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
    
 options?: SecondParameter<typeof customInstanceLocal>) => {
      return customInstanceLocal<HealthResponseResponse>(
      {url: `/api/v1/health`, method: 'get'
    },
      options);
    }
  

export const getGetHealthKey = () => [`/api/v1/health`];

    
export type GetHealthQueryResult = NonNullable<Awaited<ReturnType<typeof getHealth>>>
export type GetHealthQueryError = ErrorType<unknown>

export const useGetHealth = <TError = ErrorType<unknown>>(
  options?: { swr?:SWRConfiguration<Awaited<ReturnType<typeof getHealth>>, TError> & { swrKey?: Key, enabled?: boolean }, request?: SecondParameter<typeof customInstanceLocal> }

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
 * List providers which are still in the process of being set up.
 * @summary List the provider setups in progress
 */
export const listProvidersetups = (
    
 options?: SecondParameter<typeof customInstanceLocal>) => {
      return customInstanceLocal<ListProviderSetupsResponseResponse>(
      {url: `/api/v1/providersetups`, method: 'get'
    },
      options);
    }
  

export const getListProvidersetupsKey = () => [`/api/v1/providersetups`];

    
export type ListProvidersetupsQueryResult = NonNullable<Awaited<ReturnType<typeof listProvidersetups>>>
export type ListProvidersetupsQueryError = ErrorType<unknown>

export const useListProvidersetups = <TError = ErrorType<unknown>>(
  options?: { swr?:SWRConfiguration<Awaited<ReturnType<typeof listProvidersetups>>, TError> & { swrKey?: Key, enabled?: boolean }, request?: SecondParameter<typeof customInstanceLocal> }

  ) => {

  const {swr: swrOptions, request: requestOptions} = options ?? {}

  const isEnabled = swrOptions?.enabled !== false
    const swrKey = swrOptions?.swrKey ?? (() => isEnabled ? getListProvidersetupsKey() : null);
  const swrFn = () => listProvidersetups(requestOptions);

  const query = useSwr<Awaited<ReturnType<typeof swrFn>>, TError>(swrKey, swrFn, swrOptions)

  return {
    swrKey,
    ...query
  }
}


/**
 * Begins the guided setup process for a new Access Provider.
 * @summary Begin the setup process for a new Access Provider
 */
export const createProvidersetup = (
    createProviderSetupRequestBody: CreateProviderSetupRequestBody,
 options?: SecondParameter<typeof customInstanceLocal>) => {
      return customInstanceLocal<ProviderSetupResponseResponse>(
      {url: `/api/v1/providersetups`, method: 'post',
      headers: {'Content-Type': 'application/json', },
      data: createProviderSetupRequestBody
    },
      options);
    }
  


/**
 * Get the setup instructions for an Access Provider.
 * @summary Get an in-progress provider setup
 */
export const getProvidersetup = (
    providersetupId: string,
 options?: SecondParameter<typeof customInstanceLocal>) => {
      return customInstanceLocal<ProviderSetupResponseResponse>(
      {url: `/api/v1/providersetups/${providersetupId}`, method: 'get'
    },
      options);
    }
  

export const getGetProvidersetupKey = (providersetupId: string,) => [`/api/v1/providersetups/${providersetupId}`];

    
export type GetProvidersetupQueryResult = NonNullable<Awaited<ReturnType<typeof getProvidersetup>>>
export type GetProvidersetupQueryError = ErrorType<unknown>

export const useGetProvidersetup = <TError = ErrorType<unknown>>(
 providersetupId: string, options?: { swr?:SWRConfiguration<Awaited<ReturnType<typeof getProvidersetup>>, TError> & { swrKey?: Key, enabled?: boolean }, request?: SecondParameter<typeof customInstanceLocal> }

  ) => {

  const {swr: swrOptions, request: requestOptions} = options ?? {}

  const isEnabled = swrOptions?.enabled !== false && !!(providersetupId)
    const swrKey = swrOptions?.swrKey ?? (() => isEnabled ? getGetProvidersetupKey(providersetupId) : null);
  const swrFn = () => getProvidersetup(providersetupId, requestOptions);

  const query = useSwr<Awaited<ReturnType<typeof swrFn>>, TError>(swrKey, swrFn, swrOptions)

  return {
    swrKey,
    ...query
  }
}


/**
 * Removes an in-progress provider setup and deletes all data relating to it.

Returns the deleted provider.
 * @summary Delete an in-progress provider setup
 */
export const deleteProvidersetup = (
    providersetupId: string,
 options?: SecondParameter<typeof customInstanceLocal>) => {
      return customInstanceLocal<ProviderSetupResponseResponse>(
      {url: `/api/v1/providersetups/${providersetupId}`, method: 'delete'
    },
      options);
    }
  


/**
 * Get the setup instructions for an Access Provider.
 * @summary Get the setup instructions for an Access Provider
 */
export const getProvidersetupInstructions = (
    providersetupId: string,
 options?: SecondParameter<typeof customInstanceLocal>) => {
      return customInstanceLocal<ProviderSetupInstructions>(
      {url: `/api/v1/providersetups/${providersetupId}/instructions`, method: 'get'
    },
      options);
    }
  

export const getGetProvidersetupInstructionsKey = (providersetupId: string,) => [`/api/v1/providersetups/${providersetupId}/instructions`];

    
export type GetProvidersetupInstructionsQueryResult = NonNullable<Awaited<ReturnType<typeof getProvidersetupInstructions>>>
export type GetProvidersetupInstructionsQueryError = ErrorType<unknown>

export const useGetProvidersetupInstructions = <TError = ErrorType<unknown>>(
 providersetupId: string, options?: { swr?:SWRConfiguration<Awaited<ReturnType<typeof getProvidersetupInstructions>>, TError> & { swrKey?: Key, enabled?: boolean }, request?: SecondParameter<typeof customInstanceLocal> }

  ) => {

  const {swr: swrOptions, request: requestOptions} = options ?? {}

  const isEnabled = swrOptions?.enabled !== false && !!(providersetupId)
    const swrKey = swrOptions?.swrKey ?? (() => isEnabled ? getGetProvidersetupInstructionsKey(providersetupId) : null);
  const swrFn = () => getProvidersetupInstructions(providersetupId, requestOptions);

  const query = useSwr<Awaited<ReturnType<typeof swrFn>>, TError>(swrKey, swrFn, swrOptions)

  return {
    swrKey,
    ...query
  }
}


/**
 * Validates the configuration values for an access provider being setup.

Will return a HTTP200 OK response even if there are validation errors. The errors can be found by inspecting the validation diagnostics in the `configValidation` field.

Will return a HTTP400 response if the provider cannot be validated (for example, the config values for the provider are incomplete).
 * @summary Validate the configuration for a Provider Setup
 */
export const validateProvidersetup = (
    providersetupId: string,
 options?: SecondParameter<typeof customInstanceLocal>) => {
      return customInstanceLocal<ProviderSetupResponseResponse>(
      {url: `/api/v1/providersetups/${providersetupId}/validate`, method: 'post'
    },
      options);
    }
  


/**
 * If Runtime Configuration is enabled, this will write the Access Provider to the configuration storage and activate it. If Runtime Configuration is disabled, this endpoint does nothing.
 * @summary Complete a ProviderSetup
 */
export const completeProvidersetup = (
    providersetupId: string,
 options?: SecondParameter<typeof customInstanceLocal>) => {
      return customInstanceLocal<CompleteProviderSetupResponseResponse>(
      {url: `/api/v1/providersetups/${providersetupId}/complete`, method: 'post'
    },
      options);
    }
  


/**
 * The updated provider setup.
 * @summary Update the completion status for a Provider setup step
 */
export const submitProvidersetupStep = (
    providersetupId: string,
    stepIndex: number,
    providerSetupStepCompleteRequestBody: ProviderSetupStepCompleteRequestBody,
 options?: SecondParameter<typeof customInstanceLocal>) => {
      return customInstanceLocal<ProviderSetupResponseResponse>(
      {url: `/api/v1/providersetups/${providersetupId}/steps/${stepIndex}/complete`, method: 'put',
      headers: {'Content-Type': 'application/json', },
      data: providerSetupStepCompleteRequestBody
    },
      options);
    }
  




export const getGetHealthMock = () => ({healthy: faker.datatype.boolean()})

export const getListProvidersetupsMock = () => ({providerSetups: Array.from({ length: faker.datatype.number({ min: 1, max: 10 }) }, (_, i) => i + 1).map(() => ({id: faker.random.word(), team: faker.random.word(), name: faker.random.word(), version: faker.random.word(), status: faker.helpers.arrayElement(['COMPLETE','VALIDATION_FAILED','VALIDATING','INITIAL_CONFIGURATION_IN_PROGRESS','VALIDATION_SUCEEDED']), steps: Array.from({ length: faker.datatype.number({ min: 1, max: 10 }) }, (_, i) => i + 1).map(() => ({complete: faker.datatype.boolean()})), configValues: {}, configValidation: Array.from({ length: faker.datatype.number({ min: 1, max: 10 }) }, (_, i) => i + 1).map(() => ({id: faker.random.word(), name: faker.random.word(), status: faker.helpers.arrayElement(['IN_PROGRESS','SUCCESS','PENDING','ERROR']), fieldsValidated: Array.from({ length: faker.datatype.number({ min: 1, max: 10 }) }, (_, i) => i + 1).map(() => (faker.random.word())), logs: Array.from({ length: faker.datatype.number({ min: 1, max: 10 }) }, (_, i) => i + 1).map(() => ({level: faker.helpers.arrayElement(['INFO','WARNING','ERROR']), msg: faker.random.word()}))}))}))})

export const getCreateProvidersetupMock = () => ({id: faker.random.word(), team: faker.random.word(), name: faker.random.word(), version: faker.random.word(), status: faker.helpers.arrayElement(['COMPLETE','VALIDATION_FAILED','VALIDATING','INITIAL_CONFIGURATION_IN_PROGRESS','VALIDATION_SUCEEDED']), steps: Array.from({ length: faker.datatype.number({ min: 1, max: 10 }) }, (_, i) => i + 1).map(() => ({complete: faker.datatype.boolean()})), configValues: {}, configValidation: Array.from({ length: faker.datatype.number({ min: 1, max: 10 }) }, (_, i) => i + 1).map(() => ({id: faker.random.word(), name: faker.random.word(), status: faker.helpers.arrayElement(['IN_PROGRESS','SUCCESS','PENDING','ERROR']), fieldsValidated: Array.from({ length: faker.datatype.number({ min: 1, max: 10 }) }, (_, i) => i + 1).map(() => (faker.random.word())), logs: Array.from({ length: faker.datatype.number({ min: 1, max: 10 }) }, (_, i) => i + 1).map(() => ({level: faker.helpers.arrayElement(['INFO','WARNING','ERROR']), msg: faker.random.word()}))}))})

export const getGetProvidersetupMock = () => ({id: faker.random.word(), team: faker.random.word(), name: faker.random.word(), version: faker.random.word(), status: faker.helpers.arrayElement(['COMPLETE','VALIDATION_FAILED','VALIDATING','INITIAL_CONFIGURATION_IN_PROGRESS','VALIDATION_SUCEEDED']), steps: Array.from({ length: faker.datatype.number({ min: 1, max: 10 }) }, (_, i) => i + 1).map(() => ({complete: faker.datatype.boolean()})), configValues: {}, configValidation: Array.from({ length: faker.datatype.number({ min: 1, max: 10 }) }, (_, i) => i + 1).map(() => ({id: faker.random.word(), name: faker.random.word(), status: faker.helpers.arrayElement(['IN_PROGRESS','SUCCESS','PENDING','ERROR']), fieldsValidated: Array.from({ length: faker.datatype.number({ min: 1, max: 10 }) }, (_, i) => i + 1).map(() => (faker.random.word())), logs: Array.from({ length: faker.datatype.number({ min: 1, max: 10 }) }, (_, i) => i + 1).map(() => ({level: faker.helpers.arrayElement(['INFO','WARNING','ERROR']), msg: faker.random.word()}))}))})

export const getDeleteProvidersetupMock = () => ({id: faker.random.word(), team: faker.random.word(), name: faker.random.word(), version: faker.random.word(), status: faker.helpers.arrayElement(['COMPLETE','VALIDATION_FAILED','VALIDATING','INITIAL_CONFIGURATION_IN_PROGRESS','VALIDATION_SUCEEDED']), steps: Array.from({ length: faker.datatype.number({ min: 1, max: 10 }) }, (_, i) => i + 1).map(() => ({complete: faker.datatype.boolean()})), configValues: {}, configValidation: Array.from({ length: faker.datatype.number({ min: 1, max: 10 }) }, (_, i) => i + 1).map(() => ({id: faker.random.word(), name: faker.random.word(), status: faker.helpers.arrayElement(['IN_PROGRESS','SUCCESS','PENDING','ERROR']), fieldsValidated: Array.from({ length: faker.datatype.number({ min: 1, max: 10 }) }, (_, i) => i + 1).map(() => (faker.random.word())), logs: Array.from({ length: faker.datatype.number({ min: 1, max: 10 }) }, (_, i) => i + 1).map(() => ({level: faker.helpers.arrayElement(['INFO','WARNING','ERROR']), msg: faker.random.word()}))}))})

export const getGetProvidersetupInstructionsMock = () => ({stepDetails: Array.from({ length: faker.datatype.number({ min: 1, max: 10 }) }, (_, i) => i + 1).map(() => ({title: faker.random.word(), instructions: faker.random.word(), configFields: Array.from({ length: faker.datatype.number({ min: 1, max: 10 }) }, (_, i) => i + 1).map(() => ({id: faker.random.word(), name: faker.random.word(), description: faker.random.word(), isOptional: faker.datatype.boolean(), isSecret: faker.datatype.boolean(), secretPath: faker.helpers.arrayElement([faker.random.word(), undefined])}))}))})

export const getValidateProvidersetupMock = () => ({id: faker.random.word(), team: faker.random.word(), name: faker.random.word(), version: faker.random.word(), status: faker.helpers.arrayElement(['COMPLETE','VALIDATION_FAILED','VALIDATING','INITIAL_CONFIGURATION_IN_PROGRESS','VALIDATION_SUCEEDED']), steps: Array.from({ length: faker.datatype.number({ min: 1, max: 10 }) }, (_, i) => i + 1).map(() => ({complete: faker.datatype.boolean()})), configValues: {}, configValidation: Array.from({ length: faker.datatype.number({ min: 1, max: 10 }) }, (_, i) => i + 1).map(() => ({id: faker.random.word(), name: faker.random.word(), status: faker.helpers.arrayElement(['IN_PROGRESS','SUCCESS','PENDING','ERROR']), fieldsValidated: Array.from({ length: faker.datatype.number({ min: 1, max: 10 }) }, (_, i) => i + 1).map(() => (faker.random.word())), logs: Array.from({ length: faker.datatype.number({ min: 1, max: 10 }) }, (_, i) => i + 1).map(() => ({level: faker.helpers.arrayElement(['INFO','WARNING','ERROR']), msg: faker.random.word()}))}))})

export const getCompleteProvidersetupMock = () => ({deploymentConfigUpdateRequired: faker.datatype.boolean()})

export const getSubmitProvidersetupStepMock = () => ({id: faker.random.word(), team: faker.random.word(), name: faker.random.word(), version: faker.random.word(), status: faker.helpers.arrayElement(['COMPLETE','VALIDATION_FAILED','VALIDATING','INITIAL_CONFIGURATION_IN_PROGRESS','VALIDATION_SUCEEDED']), steps: Array.from({ length: faker.datatype.number({ min: 1, max: 10 }) }, (_, i) => i + 1).map(() => ({complete: faker.datatype.boolean()})), configValues: {}, configValidation: Array.from({ length: faker.datatype.number({ min: 1, max: 10 }) }, (_, i) => i + 1).map(() => ({id: faker.random.word(), name: faker.random.word(), status: faker.helpers.arrayElement(['IN_PROGRESS','SUCCESS','PENDING','ERROR']), fieldsValidated: Array.from({ length: faker.datatype.number({ min: 1, max: 10 }) }, (_, i) => i + 1).map(() => (faker.random.word())), logs: Array.from({ length: faker.datatype.number({ min: 1, max: 10 }) }, (_, i) => i + 1).map(() => ({level: faker.helpers.arrayElement(['INFO','WARNING','ERROR']), msg: faker.random.word()}))}))})

export const getExampleAPIMSW = () => [
rest.get('*/api/v1/health', (_req, res, ctx) => {
        return res(
          ctx.delay(1000),
          ctx.status(200, 'Mocked status'),
ctx.json(getGetHealthMock()),
        )
      }),rest.get('*/api/v1/providersetups', (_req, res, ctx) => {
        return res(
          ctx.delay(1000),
          ctx.status(200, 'Mocked status'),
ctx.json(getListProvidersetupsMock()),
        )
      }),rest.post('*/api/v1/providersetups', (_req, res, ctx) => {
        return res(
          ctx.delay(1000),
          ctx.status(200, 'Mocked status'),
ctx.json(getCreateProvidersetupMock()),
        )
      }),rest.get('*/api/v1/providersetups/:providersetupId', (_req, res, ctx) => {
        return res(
          ctx.delay(1000),
          ctx.status(200, 'Mocked status'),
ctx.json(getGetProvidersetupMock()),
        )
      }),rest.delete('*/api/v1/providersetups/:providersetupId', (_req, res, ctx) => {
        return res(
          ctx.delay(1000),
          ctx.status(200, 'Mocked status'),
ctx.json(getDeleteProvidersetupMock()),
        )
      }),rest.get('*/api/v1/providersetups/:providersetupId/instructions', (_req, res, ctx) => {
        return res(
          ctx.delay(1000),
          ctx.status(200, 'Mocked status'),
ctx.json(getGetProvidersetupInstructionsMock()),
        )
      }),rest.post('*/api/v1/providersetups/:providersetupId/validate', (_req, res, ctx) => {
        return res(
          ctx.delay(1000),
          ctx.status(200, 'Mocked status'),
ctx.json(getValidateProvidersetupMock()),
        )
      }),rest.post('*/api/v1/providersetups/:providersetupId/complete', (_req, res, ctx) => {
        return res(
          ctx.delay(1000),
          ctx.status(200, 'Mocked status'),
ctx.json(getCompleteProvidersetupMock()),
        )
      }),rest.put('*/api/v1/providersetups/:providersetupId/steps/:stepIndex/complete', (_req, res, ctx) => {
        return res(
          ctx.delay(1000),
          ctx.status(200, 'Mocked status'),
ctx.json(getSubmitProvidersetupStepMock()),
        )
      }),]
