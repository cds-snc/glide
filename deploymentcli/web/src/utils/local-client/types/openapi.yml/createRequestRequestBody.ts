/**
 * Generated by orval v6.10.3 🍺
 * Do not edit manually.
 * Example API
 * Example API
 * OpenAPI spec version: 1.0
 */
import type { RequestTiming } from '../openapi.yml/requestTiming';
import type { CreateRequestWithSubRequest } from '../openapi.yml/createRequestWithSubRequest';

export type CreateRequestRequestBody = {
  accessRuleId: string;
  reason?: string;
  timing: RequestTiming;
  with?: CreateRequestWithSubRequest;
};