/**
 * Generated by orval v6.11.1 🍺
 * Do not edit manually.
 * Example API
 * Example API
 * OpenAPI spec version: 1.0
 */
import type { RequestTiming } from './requestTiming';
import type { CreateRequestWithSubRequest } from './createRequestWithSubRequest';

export type CreateFavoriteRequestBody = {
  accessRuleId: string;
  reason?: string;
  timing: RequestTiming;
  with?: CreateRequestWithSubRequest;
  name: string;
};
