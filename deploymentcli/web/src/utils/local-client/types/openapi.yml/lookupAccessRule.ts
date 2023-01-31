/**
 * Generated by orval v6.10.3 🍺
 * Do not edit manually.
 * Example API
 * Example API
 * OpenAPI spec version: 1.0
 */
import type { AccessRule } from '../openapi.yml/accessRule';
import type { KeyValue } from '../openapi.yml/keyValue';

/**
 * A matched access rule with option values if they are required for the access rule request
 */
export interface LookupAccessRule {
  accessRule: AccessRule;
  /** If the matched access rule has selectable fields, this array will contain the matched values to be used to prefill the form when requesting */
  selectableWithOptionValues?: KeyValue[];
}