/**
 * Generated by orval v6.10.3 🍺
 * Do not edit manually.
 * Common Fate
 * Common Fate API
 * OpenAPI spec version: 1.0
 */
import type { TargetGroupTargetSchema } from './targetGroupTargetSchema';
import type { DeploymentRegistration } from './deploymentRegistration';

export interface TargetGroup {
  id: string;
  targetSchema: TargetGroupTargetSchema;
  icon: string;
  targetDeployments: DeploymentRegistration[];
  createdAt?: string;
  updatedAt?: string;
}