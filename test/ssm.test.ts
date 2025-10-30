import {
  SSM_PARAM_KEY,
  buildSSMPath,
  buildSSMPathWithPrefix,
  extractEnvFromPath,
  extractKeyFromPath,
  isEnvAgnostic,
} from "../src/ssm";

describe("SSM Utilities", () => {
  describe("buildSSMPath", () => {
    it("should build correct SSM path with environment", () => {
      const path = buildSSMPath("prod", SSM_PARAM_KEY.COGNITO_USER_POOL_ID);
      expect(path).toBe("/prod/user-pool-id");
    });

    it("should handle different environments", () => {
      const devPath = buildSSMPath("dev", SSM_PARAM_KEY.DB_USER);
      const stagingPath = buildSSMPath("staging", SSM_PARAM_KEY.DB_USER);

      expect(devPath).toBe("/dev/db-user");
      expect(stagingPath).toBe("/staging/db-user");
    });

    it("should build env-agnostic path when env is null", () => {
      const path = buildSSMPath(null, SSM_PARAM_KEY.DB_USER);
      expect(path).toBe("/db-user");
    });

    it("should handle multiple env-agnostic parameters", () => {
      const path1 = buildSSMPath(null, SSM_PARAM_KEY.BASE_HOST);
      const path2 = buildSSMPath(null, SSM_PARAM_KEY.EMAIL_FROM_ADDRESS);

      expect(path1).toBe("/base-host");
      expect(path2).toBe("/email-from-address");
    });
  });

  describe("buildSSMPathWithPrefix", () => {
    it("should build path with custom prefix", () => {
      const path = buildSSMPathWithPrefix(
        "/myapp/prod",
        SSM_PARAM_KEY.GRAPHQL_API_ID,
      );
      expect(path).toBe("/myapp/prod/graphql-api-id");
    });

    it("should handle prefix with trailing slash", () => {
      const path = buildSSMPathWithPrefix(
        "/myapp/prod/",
        SSM_PARAM_KEY.DB_PASSWORD,
      );
      expect(path).toBe("/myapp/prod/db-password");
    });

    it("should handle key with leading slash", () => {
      const path = buildSSMPathWithPrefix(
        "/myapp/prod",
        SSM_PARAM_KEY.BASE_HOST,
      );
      expect(path).toBe("/myapp/prod/base-host");
    });
  });

  describe("extractEnvFromPath", () => {
    it("should extract environment from path", () => {
      const env = extractEnvFromPath("/prod/user-pool-id");
      expect(env).toBe("prod");
    });

    it("should extract environment from complex path", () => {
      const env = extractEnvFromPath("/staging/graphql-api-id");
      expect(env).toBe("staging");
    });

    it("should return null for invalid path", () => {
      const env = extractEnvFromPath("invalid-path");
      expect(env).toBeNull();
    });

    it("should return null for path without environment", () => {
      const env = extractEnvFromPath("/");
      expect(env).toBeNull();
    });

    it("should return null for env-agnostic paths", () => {
      const env = extractEnvFromPath("/db-user");
      expect(env).toBeNull();
    });
  });

  describe("extractKeyFromPath", () => {
    it("should extract key from path", () => {
      const key = extractKeyFromPath("/prod/user-pool-id");
      expect(key).toBe(SSM_PARAM_KEY.COGNITO_USER_POOL_ID);
    });

    it("should extract key from complex path", () => {
      const key = extractKeyFromPath("/myapp/staging/db-password");
      expect(key).toBe(SSM_PARAM_KEY.DB_PASSWORD);
    });

    it("should extract key from env-agnostic path", () => {
      const key = extractKeyFromPath("/db-user");
      expect(key).toBe(SSM_PARAM_KEY.DB_USER);
    });

    it("should return null for invalid key", () => {
      const key = extractKeyFromPath("/prod/invalid-key");
      expect(key).toBeNull();
    });

    it("should handle all SSM_PARAM_KEY values", () => {
      const testCases = [
        {
          path: "/prod/graphql-http-url",
          expected: SSM_PARAM_KEY.GRAPHQL_HTTP_URL,
        },
        {
          path: "/dev/email-from-address",
          expected: SSM_PARAM_KEY.EMAIL_FROM_ADDRESS,
        },
        {
          path: "/staging/rum-app-id",
          expected: SSM_PARAM_KEY.RUM_APP_ID,
        },
      ];

      testCases.forEach(({ path, expected }) => {
        expect(extractKeyFromPath(path)).toBe(expected);
      });
    });
  });

  describe("isEnvAgnostic", () => {
    it("should return true for env-agnostic paths", () => {
      expect(isEnvAgnostic("/db-user")).toBe(true);
      expect(isEnvAgnostic("/base-host")).toBe(true);
      expect(isEnvAgnostic("/email-from-address")).toBe(true);
    });

    it("should return false for environment-specific paths", () => {
      expect(isEnvAgnostic("/prod/user-pool-id")).toBe(false);
      expect(isEnvAgnostic("/dev/db-password")).toBe(false);
      expect(isEnvAgnostic("/staging/graphql-api-id")).toBe(false);
    });

    it("should return false for complex paths", () => {
      expect(isEnvAgnostic("/myapp/prod/db-user")).toBe(false);
    });

    it("should return false for invalid paths", () => {
      expect(isEnvAgnostic("/")).toBe(false);
      expect(isEnvAgnostic("")).toBe(false);
    });
  });

  describe("SSM_PARAM_KEY enum", () => {
    it("should have all required keys", () => {
      expect(SSM_PARAM_KEY.COGNITO_USER_POOL_ID).toBe("user-pool-id");
      expect(SSM_PARAM_KEY.DB_USER).toBe("db-user");
      expect(SSM_PARAM_KEY.DB_PASSWORD).toBe("db-password");
      expect(SSM_PARAM_KEY.GRAPHQL_API_ID).toBe("graphql-api-id");
      expect(SSM_PARAM_KEY.BASE_HOST).toBe("base-host");
    });
  });
});
