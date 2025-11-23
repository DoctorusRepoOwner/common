import { SSM_PARAM_KEY } from './keys';

/**
 * Build SSM parameter path with optional environment prefix
 * @param env - Environment name (e.g., 'dev', 'staging', 'prod'), or null for env-agnostic parameters
 * @param key - SSM parameter key
 * @returns Full SSM parameter path
 *
 * @example
 * ```ts
 * buildSSMPath('prod', SSM_PARAM_KEY.COGNITO_USER_POOL_ID)
 * // Returns: '/prod/user-pool-id'
 *
 * buildSSMPath(null, SSM_PARAM_KEY.DB_USER)
 * // Returns: '/db-user' (env-agnostic)
 * ```
 */
export function buildSSMPath(env: string | null, key: SSM_PARAM_KEY): string {
  return env ? `/${env}/${key}` : `/${key}`;
}

/**
 * Build SSM parameter path with custom prefix
 * @param prefix - Custom prefix (e.g., '/myapp/prod')
 * @param key - SSM parameter key
 * @returns Full SSM parameter path
 *
 * @example
 * ```ts
 * buildSSMPathWithPrefix('/myapp/prod', SSM_PARAM_KEY.DB_USER)
 * // Returns: '/myapp/prod/db-user'
 * ```
 */
export function buildSSMPathWithPrefix(prefix: string, key: SSM_PARAM_KEY): string {
  const normalizedPrefix = prefix.endsWith('/') ? prefix.slice(0, -1) : prefix;
  const normalizedKey = key.startsWith('/') ? key : `/${key}`;
  return `${normalizedPrefix}${normalizedKey}`;
}

/**
 * Extract environment from SSM parameter path
 * @param path - SSM parameter path
 * @returns Environment name or null if env-agnostic or not found
 *
 * @example
 * ```ts
 * extractEnvFromPath('/prod/user-pool-id')
 * // Returns: 'prod'
 *
 * extractEnvFromPath('/db-user')
 * // Returns: null (env-agnostic parameter)
 * ```
 */
export function extractEnvFromPath(path: string): string | null {
  const match = path.match(/^\/([^/]+)\//);
  return match ? match[1] : null;
}

/**
 * Parse SSM parameter path to extract key
 * @param path - SSM parameter path
 * @returns SSM parameter key or null if not found
 *
 * @example
 * ```ts
 * extractKeyFromPath('/prod/user-pool-id')
 * // Returns: SSM_PARAM_KEY.COGNITO_USER_POOL_ID
 *
 * extractKeyFromPath('/db-user')
 * // Returns: SSM_PARAM_KEY.DB_USER (env-agnostic)
 * ```
 */
export function extractKeyFromPath(path: string): SSM_PARAM_KEY | null {
  const parts = path.split('/');
  const keyValue = parts[parts.length - 1];

  // Check if the key value matches any enum value
  const enumValues = Object.values(SSM_PARAM_KEY) as string[];
  if (enumValues.includes(keyValue)) {
    return keyValue as SSM_PARAM_KEY;
  }

  return null;
}

/**
 * Check if an SSM parameter path is environment-agnostic
 * @param path - SSM parameter path
 * @returns true if the path is env-agnostic (no environment prefix)
 *
 * @example
 * ```ts
 * isEnvAgnostic('/db-user')
 * // Returns: true
 *
 * isEnvAgnostic('/prod/user-pool-id')
 * // Returns: false
 * ```
 */
export function isEnvAgnostic(path: string): boolean {
  // Env-agnostic paths have format: /key (only 2 parts when split by /)
  const parts = path.split('/').filter((p) => p.length > 0);
  return parts.length === 1;
}
