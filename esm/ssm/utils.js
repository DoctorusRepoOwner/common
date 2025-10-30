import { SSM_PARAM_KEY } from "./keys";
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
export function buildSSMPath(env, key) {
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
export function buildSSMPathWithPrefix(prefix, key) {
    const normalizedPrefix = prefix.endsWith("/") ? prefix.slice(0, -1) : prefix;
    const normalizedKey = key.startsWith("/") ? key : `/${key}`;
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
export function extractEnvFromPath(path) {
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
export function extractKeyFromPath(path) {
    const parts = path.split("/");
    const keyValue = parts[parts.length - 1];
    // Check if the key value matches any enum value
    const enumValues = Object.values(SSM_PARAM_KEY);
    if (enumValues.includes(keyValue)) {
        return keyValue;
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
export function isEnvAgnostic(path) {
    // Env-agnostic paths have format: /key (only 2 parts when split by /)
    const parts = path.split("/").filter((p) => p.length > 0);
    return parts.length === 1;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc3NtL3V0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxRQUFRLENBQUM7QUFFdkM7Ozs7Ozs7Ozs7Ozs7O0dBY0c7QUFDSCxNQUFNLFVBQVUsWUFBWSxDQUFDLEdBQWtCLEVBQUUsR0FBa0I7SUFDakUsT0FBTyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDO0FBQzVDLENBQUM7QUFFRDs7Ozs7Ozs7Ozs7R0FXRztBQUNILE1BQU0sVUFBVSxzQkFBc0IsQ0FDcEMsTUFBYyxFQUNkLEdBQWtCO0lBRWxCLE1BQU0sZ0JBQWdCLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO0lBQzdFLE1BQU0sYUFBYSxHQUFHLEdBQUcsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQztJQUM1RCxPQUFPLEdBQUcsZ0JBQWdCLEdBQUcsYUFBYSxFQUFFLENBQUM7QUFDL0MsQ0FBQztBQUVEOzs7Ozs7Ozs7Ozs7O0dBYUc7QUFDSCxNQUFNLFVBQVUsa0JBQWtCLENBQUMsSUFBWTtJQUM3QyxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBQ3pDLE9BQU8sS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztBQUNqQyxDQUFDO0FBRUQ7Ozs7Ozs7Ozs7Ozs7R0FhRztBQUNILE1BQU0sVUFBVSxrQkFBa0IsQ0FBQyxJQUFZO0lBQzdDLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDOUIsTUFBTSxRQUFRLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFFekMsZ0RBQWdEO0lBQ2hELE1BQU0sVUFBVSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFhLENBQUM7SUFDNUQsSUFBSSxVQUFVLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUM7UUFDbEMsT0FBTyxRQUF5QixDQUFDO0lBQ25DLENBQUM7SUFFRCxPQUFPLElBQUksQ0FBQztBQUNkLENBQUM7QUFFRDs7Ozs7Ozs7Ozs7OztHQWFHO0FBQ0gsTUFBTSxVQUFVLGFBQWEsQ0FBQyxJQUFZO0lBQ3hDLHNFQUFzRTtJQUN0RSxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztJQUMxRCxPQUFPLEtBQUssQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDO0FBQzVCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTU01fUEFSQU1fS0VZIH0gZnJvbSBcIi4va2V5c1wiO1xuXG4vKipcbiAqIEJ1aWxkIFNTTSBwYXJhbWV0ZXIgcGF0aCB3aXRoIG9wdGlvbmFsIGVudmlyb25tZW50IHByZWZpeFxuICogQHBhcmFtIGVudiAtIEVudmlyb25tZW50IG5hbWUgKGUuZy4sICdkZXYnLCAnc3RhZ2luZycsICdwcm9kJyksIG9yIG51bGwgZm9yIGVudi1hZ25vc3RpYyBwYXJhbWV0ZXJzXG4gKiBAcGFyYW0ga2V5IC0gU1NNIHBhcmFtZXRlciBrZXlcbiAqIEByZXR1cm5zIEZ1bGwgU1NNIHBhcmFtZXRlciBwYXRoXG4gKlxuICogQGV4YW1wbGVcbiAqIGBgYHRzXG4gKiBidWlsZFNTTVBhdGgoJ3Byb2QnLCBTU01fUEFSQU1fS0VZLkNPR05JVE9fVVNFUl9QT09MX0lEKVxuICogLy8gUmV0dXJuczogJy9wcm9kL3VzZXItcG9vbC1pZCdcbiAqXG4gKiBidWlsZFNTTVBhdGgobnVsbCwgU1NNX1BBUkFNX0tFWS5EQl9VU0VSKVxuICogLy8gUmV0dXJuczogJy9kYi11c2VyJyAoZW52LWFnbm9zdGljKVxuICogYGBgXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBidWlsZFNTTVBhdGgoZW52OiBzdHJpbmcgfCBudWxsLCBrZXk6IFNTTV9QQVJBTV9LRVkpOiBzdHJpbmcge1xuICByZXR1cm4gZW52ID8gYC8ke2Vudn0vJHtrZXl9YCA6IGAvJHtrZXl9YDtcbn1cblxuLyoqXG4gKiBCdWlsZCBTU00gcGFyYW1ldGVyIHBhdGggd2l0aCBjdXN0b20gcHJlZml4XG4gKiBAcGFyYW0gcHJlZml4IC0gQ3VzdG9tIHByZWZpeCAoZS5nLiwgJy9teWFwcC9wcm9kJylcbiAqIEBwYXJhbSBrZXkgLSBTU00gcGFyYW1ldGVyIGtleVxuICogQHJldHVybnMgRnVsbCBTU00gcGFyYW1ldGVyIHBhdGhcbiAqXG4gKiBAZXhhbXBsZVxuICogYGBgdHNcbiAqIGJ1aWxkU1NNUGF0aFdpdGhQcmVmaXgoJy9teWFwcC9wcm9kJywgU1NNX1BBUkFNX0tFWS5EQl9VU0VSKVxuICogLy8gUmV0dXJuczogJy9teWFwcC9wcm9kL2RiLXVzZXInXG4gKiBgYGBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGJ1aWxkU1NNUGF0aFdpdGhQcmVmaXgoXG4gIHByZWZpeDogc3RyaW5nLFxuICBrZXk6IFNTTV9QQVJBTV9LRVksXG4pOiBzdHJpbmcge1xuICBjb25zdCBub3JtYWxpemVkUHJlZml4ID0gcHJlZml4LmVuZHNXaXRoKFwiL1wiKSA/IHByZWZpeC5zbGljZSgwLCAtMSkgOiBwcmVmaXg7XG4gIGNvbnN0IG5vcm1hbGl6ZWRLZXkgPSBrZXkuc3RhcnRzV2l0aChcIi9cIikgPyBrZXkgOiBgLyR7a2V5fWA7XG4gIHJldHVybiBgJHtub3JtYWxpemVkUHJlZml4fSR7bm9ybWFsaXplZEtleX1gO1xufVxuXG4vKipcbiAqIEV4dHJhY3QgZW52aXJvbm1lbnQgZnJvbSBTU00gcGFyYW1ldGVyIHBhdGhcbiAqIEBwYXJhbSBwYXRoIC0gU1NNIHBhcmFtZXRlciBwYXRoXG4gKiBAcmV0dXJucyBFbnZpcm9ubWVudCBuYW1lIG9yIG51bGwgaWYgZW52LWFnbm9zdGljIG9yIG5vdCBmb3VuZFxuICpcbiAqIEBleGFtcGxlXG4gKiBgYGB0c1xuICogZXh0cmFjdEVudkZyb21QYXRoKCcvcHJvZC91c2VyLXBvb2wtaWQnKVxuICogLy8gUmV0dXJuczogJ3Byb2QnXG4gKlxuICogZXh0cmFjdEVudkZyb21QYXRoKCcvZGItdXNlcicpXG4gKiAvLyBSZXR1cm5zOiBudWxsIChlbnYtYWdub3N0aWMgcGFyYW1ldGVyKVxuICogYGBgXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBleHRyYWN0RW52RnJvbVBhdGgocGF0aDogc3RyaW5nKTogc3RyaW5nIHwgbnVsbCB7XG4gIGNvbnN0IG1hdGNoID0gcGF0aC5tYXRjaCgvXlxcLyhbXi9dKylcXC8vKTtcbiAgcmV0dXJuIG1hdGNoID8gbWF0Y2hbMV0gOiBudWxsO1xufVxuXG4vKipcbiAqIFBhcnNlIFNTTSBwYXJhbWV0ZXIgcGF0aCB0byBleHRyYWN0IGtleVxuICogQHBhcmFtIHBhdGggLSBTU00gcGFyYW1ldGVyIHBhdGhcbiAqIEByZXR1cm5zIFNTTSBwYXJhbWV0ZXIga2V5IG9yIG51bGwgaWYgbm90IGZvdW5kXG4gKlxuICogQGV4YW1wbGVcbiAqIGBgYHRzXG4gKiBleHRyYWN0S2V5RnJvbVBhdGgoJy9wcm9kL3VzZXItcG9vbC1pZCcpXG4gKiAvLyBSZXR1cm5zOiBTU01fUEFSQU1fS0VZLkNPR05JVE9fVVNFUl9QT09MX0lEXG4gKlxuICogZXh0cmFjdEtleUZyb21QYXRoKCcvZGItdXNlcicpXG4gKiAvLyBSZXR1cm5zOiBTU01fUEFSQU1fS0VZLkRCX1VTRVIgKGVudi1hZ25vc3RpYylcbiAqIGBgYFxuICovXG5leHBvcnQgZnVuY3Rpb24gZXh0cmFjdEtleUZyb21QYXRoKHBhdGg6IHN0cmluZyk6IFNTTV9QQVJBTV9LRVkgfCBudWxsIHtcbiAgY29uc3QgcGFydHMgPSBwYXRoLnNwbGl0KFwiL1wiKTtcbiAgY29uc3Qga2V5VmFsdWUgPSBwYXJ0c1twYXJ0cy5sZW5ndGggLSAxXTtcblxuICAvLyBDaGVjayBpZiB0aGUga2V5IHZhbHVlIG1hdGNoZXMgYW55IGVudW0gdmFsdWVcbiAgY29uc3QgZW51bVZhbHVlcyA9IE9iamVjdC52YWx1ZXMoU1NNX1BBUkFNX0tFWSkgYXMgc3RyaW5nW107XG4gIGlmIChlbnVtVmFsdWVzLmluY2x1ZGVzKGtleVZhbHVlKSkge1xuICAgIHJldHVybiBrZXlWYWx1ZSBhcyBTU01fUEFSQU1fS0VZO1xuICB9XG5cbiAgcmV0dXJuIG51bGw7XG59XG5cbi8qKlxuICogQ2hlY2sgaWYgYW4gU1NNIHBhcmFtZXRlciBwYXRoIGlzIGVudmlyb25tZW50LWFnbm9zdGljXG4gKiBAcGFyYW0gcGF0aCAtIFNTTSBwYXJhbWV0ZXIgcGF0aFxuICogQHJldHVybnMgdHJ1ZSBpZiB0aGUgcGF0aCBpcyBlbnYtYWdub3N0aWMgKG5vIGVudmlyb25tZW50IHByZWZpeClcbiAqXG4gKiBAZXhhbXBsZVxuICogYGBgdHNcbiAqIGlzRW52QWdub3N0aWMoJy9kYi11c2VyJylcbiAqIC8vIFJldHVybnM6IHRydWVcbiAqXG4gKiBpc0VudkFnbm9zdGljKCcvcHJvZC91c2VyLXBvb2wtaWQnKVxuICogLy8gUmV0dXJuczogZmFsc2VcbiAqIGBgYFxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNFbnZBZ25vc3RpYyhwYXRoOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgLy8gRW52LWFnbm9zdGljIHBhdGhzIGhhdmUgZm9ybWF0OiAva2V5IChvbmx5IDIgcGFydHMgd2hlbiBzcGxpdCBieSAvKVxuICBjb25zdCBwYXJ0cyA9IHBhdGguc3BsaXQoXCIvXCIpLmZpbHRlcigocCkgPT4gcC5sZW5ndGggPiAwKTtcbiAgcmV0dXJuIHBhcnRzLmxlbmd0aCA9PT0gMTtcbn1cbiJdfQ==