/**
 * SSM Parameter Store keys used across AWS stacks
 */
export enum SSM_PARAM_KEY {
  COGNITO_USER_POOL_ID = "user-pool-id",
  COGNITO_USER_POOL_WEB_CLIENT_ID = "user-pool-web-client-id",
  COGNITO_OAUTH_DOMAIN = "oauth-domain",
  RUM_GUEST_ROLE_ARN = "rum-guest-rome-arn",
  RUM_IDENTITY_POOL_ID = "rum-identity-pool-id",
  RUM_APP_ID = "rum-app-id",
  GRAPHQL_HTTP_URL = "graphql-http-url",
  GRAPHQL_WS_URL = "graphql-ws-url",
  GRAPHQL_HOST = "graphql-host",
  GRAPHQL_API_ID = "graphql-api-id",
  MEDICAL_ASSETS_AWS_CLOUDFRONT_PRIVATE_KEY = "medical-assets-dist-private-key",
  MEDICAL_ASSETS_AWS_CLOUDFRONT_KEY_ID = "medical-assets-dist-public-key-id",
  MEDICAL_ASSETS_AWS_CLOUDFRONT_PUB_KEY = "medical-assets-dist-public-key",
  MEDICAL_ASSETS_BUCKET_NAME = "medical-assets-bucket-name",
  PUBLIC_ASSETS_BUCKET_NAME = "public-assets-bucket-name",
  DB_USER = "db-user",
  DB_PASSWORD = "db-password",
  MEDICAL_ASSETS_DISTRIBUTION_DOMAIN_NAME = "medical-assets-dist-domain-name",
  BASE_HOST = "base-host",
  EMAIL_FROM_ADDRESS = "email-from-address",
  EVENT_API_REAL_TIME_DNS = "event-api-real-time-dns",
  EVENT_API_HTTP_DNS = "event-api-http-dns",
  NOTIFIED_EVENT_ACTIONS = "notified-event-actions",
}
