/**
 * SSM Parameter Store keys used across AWS stacks
 */
export enum SSM_PARAM_KEY {
  COGNITO_USER_POOL_ID = 'user-pool-id',
  COGNITO_USER_POOL_WEB_CLIENT_ID = 'user-pool-web-client-id',
  COGNITO_OAUTH_DOMAIN = 'oauth-domain',
  RUM_GUEST_ROLE_ARN = 'rum-guest-rome-arn',
  RUM_IDENTITY_POOL_ID = 'rum-identity-pool-id',
  RUM_APP_ID = 'rum-app-id',
  WEBSITE_RUM_GUEST_ROLE_ARN = '/website/rum/guest-role-arn',
  WEBSITE_RUM_IDENTITY_POOL_ID = '/website/rum/identity-pool-id',
  WEBSITE_RUM_APP_ID = '/website/rum/app-id',
  GRAPHQL_HTTP_URL = 'graphql-http-url',
  GRAPHQL_WS_URL = 'graphql-ws-url',
  GRAPHQL_HOST = 'graphql-host',
  GRAPHQL_API_ID = 'graphql-api-id',
  MEDICALSPACE_WEB_APP_URL = 'medicalspace-web-app-url',
  MEDICAL_ASSETS_AWS_CLOUDFRONT_PRIVATE_KEY = 'medical-assets-dist-private-key',
  MEDICAL_ASSETS_AWS_CLOUDFRONT_KEY_ID = 'medical-assets-dist-public-key-id',
  MEDICAL_ASSETS_AWS_CLOUDFRONT_PUB_KEY = 'medical-assets-dist-public-key',
  MEDICAL_ASSETS_BUCKET_NAME = 'medical-assets-bucket-name',
  PUBLIC_ASSETS_BUCKET_NAME = 'public-assets-bucket-name',
  PUBLIC_ASSETS_DISTRIBUTION_DOMAIN_NAME = 'public-assets-dist-domain-name',
  DIST_BUCKET_NAME = 'dist-bucket-name',
  MAPS_BUCKET_NAME = 'maps-bucket-name',
  DISTRIBUTION_ID = 'distribution-id',
  WEBSITE_DIST_BUCKET_NAME = '/website/dist-bucket-name',
  WEBSITE_DIST_MAPS_BUCKET_NAME = '/website/dist-maps-bucket-name',
  WEBSITE_DISTRIBUTION_ID = '/website/distribution-id',
  CICD_GITHUB_OIDC_PROVIDER_ARN = '/cicd/github-oidc-provider-arn',
  CICD_WEBSITE_GITHUB_ROLE_ARN = '/cicd/website/github-role-arn',
  DB_USER = 'db-user',
  DB_PASSWORD = 'db-password',
  MEDICAL_ASSETS_DISTRIBUTION_DOMAIN_NAME = 'medical-assets-dist-domain-name',
  BASE_HOST = 'base-host',
  EMAIL_FROM_ADDRESS = 'email-from-address',
  EVENT_API_REAL_TIME_DNS = 'event-api-real-time-dns',
  EVENT_API_HTTP_DNS = 'event-api-http-dns',
  NOTIFIED_EVENT_ACTIONS = 'notified-event-actions',
  HOSTED_ZONE_ID = 'sub-hosted-zone-id',
  ICAL_TOKEN = 'ical-token',
}

/**
 * Human-readable metadata for SSM parameters.
 * This is intended for agent/tooling usage where a key alone is not descriptive enough.
 */
export interface SSMParamMetadata {
  description: string;
}

export const SSM_PARAM_METADATA: Record<SSM_PARAM_KEY, SSMParamMetadata> = {
  [SSM_PARAM_KEY.COGNITO_USER_POOL_ID]: {
    description: 'Cognito User Pool identifier used for authentication.',
  },
  [SSM_PARAM_KEY.COGNITO_USER_POOL_WEB_CLIENT_ID]: {
    description: 'Cognito web app client identifier used by frontend authentication flows.',
  },
  [SSM_PARAM_KEY.COGNITO_OAUTH_DOMAIN]: {
    description: 'Cognito hosted UI OAuth domain for sign-in and callback flows.',
  },
  [SSM_PARAM_KEY.RUM_GUEST_ROLE_ARN]: {
    description: 'IAM role ARN assumed by guest users for CloudWatch RUM telemetry.',
  },
  [SSM_PARAM_KEY.RUM_IDENTITY_POOL_ID]: {
    description: 'Cognito Identity Pool identifier used by CloudWatch RUM guest access.',
  },
  [SSM_PARAM_KEY.RUM_APP_ID]: {
    description: 'CloudWatch RUM application identifier for the main application.',
  },
  [SSM_PARAM_KEY.WEBSITE_RUM_GUEST_ROLE_ARN]: {
    description: 'IAM role ARN assumed by website guest users for CloudWatch RUM telemetry.',
  },
  [SSM_PARAM_KEY.WEBSITE_RUM_IDENTITY_POOL_ID]: {
    description: 'Cognito Identity Pool identifier used by website CloudWatch RUM guest access.',
  },
  [SSM_PARAM_KEY.WEBSITE_RUM_APP_ID]: {
    description: 'CloudWatch RUM application identifier for the public website.',
  },
  [SSM_PARAM_KEY.GRAPHQL_HTTP_URL]: {
    description: 'HTTPS endpoint URL for GraphQL API requests.',
  },
  [SSM_PARAM_KEY.GRAPHQL_WS_URL]: {
    description: 'WebSocket endpoint URL for GraphQL subscriptions.',
  },
  [SSM_PARAM_KEY.GRAPHQL_HOST]: {
    description: 'Hostname of the GraphQL API endpoint.',
  },
  [SSM_PARAM_KEY.GRAPHQL_API_ID]: {
    description: 'AWS AppSync GraphQL API identifier.',
  },
  [SSM_PARAM_KEY.MEDICALSPACE_WEB_APP_URL]: {
    description: 'Base URL of the MedicalSpace web application.',
  },
  [SSM_PARAM_KEY.MEDICAL_ASSETS_AWS_CLOUDFRONT_PRIVATE_KEY]: {
    description: 'CloudFront private key used to sign URLs or cookies for medical assets.',
  },
  [SSM_PARAM_KEY.MEDICAL_ASSETS_AWS_CLOUDFRONT_KEY_ID]: {
    description: 'CloudFront public key identifier paired with the medical assets signing key.',
  },
  [SSM_PARAM_KEY.MEDICAL_ASSETS_AWS_CLOUDFRONT_PUB_KEY]: {
    description: 'CloudFront public key material for medical assets distribution access control.',
  },
  [SSM_PARAM_KEY.MEDICAL_ASSETS_BUCKET_NAME]: {
    description: 'S3 bucket name storing protected medical assets.',
  },
  [SSM_PARAM_KEY.PUBLIC_ASSETS_BUCKET_NAME]: {
    description: 'S3 bucket name storing public assets.',
  },
  [SSM_PARAM_KEY.PUBLIC_ASSETS_DISTRIBUTION_DOMAIN_NAME]: {
    description: 'CloudFront distribution domain name serving public assets.',
  },
  [SSM_PARAM_KEY.DIST_BUCKET_NAME]: {
    description: 'Primary S3 distribution bucket name for application static files.',
  },
  [SSM_PARAM_KEY.MAPS_BUCKET_NAME]: {
    description: 'S3 bucket name used for map-related assets or tiles.',
  },
  [SSM_PARAM_KEY.DISTRIBUTION_ID]: {
    description: 'CloudFront distribution identifier for the main application.',
  },
  [SSM_PARAM_KEY.WEBSITE_DIST_BUCKET_NAME]: {
    description: 'S3 distribution bucket name for the public website.',
  },
  [SSM_PARAM_KEY.WEBSITE_DIST_MAPS_BUCKET_NAME]: {
    description: 'S3 maps bucket name used by the public website.',
  },
  [SSM_PARAM_KEY.WEBSITE_DISTRIBUTION_ID]: {
    description: 'CloudFront distribution identifier for the public website.',
  },
  [SSM_PARAM_KEY.CICD_GITHUB_OIDC_PROVIDER_ARN]: {
    description: 'IAM OIDC provider ARN used by GitHub Actions for CI/CD federation.',
  },
  [SSM_PARAM_KEY.CICD_WEBSITE_GITHUB_ROLE_ARN]: {
    description: 'IAM role ARN assumed by GitHub Actions to deploy the website.',
  },
  [SSM_PARAM_KEY.DB_USER]: {
    description: 'Database username used by application services.',
  },
  [SSM_PARAM_KEY.DB_PASSWORD]: {
    description: 'Database password used by application services.',
  },
  [SSM_PARAM_KEY.MEDICAL_ASSETS_DISTRIBUTION_DOMAIN_NAME]: {
    description: 'CloudFront distribution domain name serving protected medical assets.',
  },
  [SSM_PARAM_KEY.BASE_HOST]: {
    description: 'Base host or root domain used to build application URLs.',
  },
  [SSM_PARAM_KEY.EMAIL_FROM_ADDRESS]: {
    description: 'Default sender email address for outbound emails.',
  },
  [SSM_PARAM_KEY.EVENT_API_REAL_TIME_DNS]: {
    description: 'DNS name for the real-time event API endpoint.',
  },
  [SSM_PARAM_KEY.EVENT_API_HTTP_DNS]: {
    description: 'DNS name for the HTTP event API endpoint.',
  },
  [SSM_PARAM_KEY.NOTIFIED_EVENT_ACTIONS]: {
    description: 'List or configuration of event actions that should trigger notifications.',
  },
  [SSM_PARAM_KEY.HOSTED_ZONE_ID]: {
    description: 'Route 53 hosted zone identifier for the subdomain/domain configuration.',
  },
  [SSM_PARAM_KEY.ICAL_TOKEN]: {
    description: 'Token used to authenticate access to generated iCal feeds.',
  },
};

export function getSSMParamDescription(key: SSM_PARAM_KEY): string {
  return SSM_PARAM_METADATA[key].description;
}
