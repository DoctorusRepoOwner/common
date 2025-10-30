import {
  Resource,
  Action,
  Operation,
  Operations,
  MEDICAL_RESOURCES,
  PUBLIC_RESOURCES,
  isMedicalResource,
  isPublicResource,
  getAllOperations,
  getOperationsByResource,
  getOperationsByAction,
} from "../src/operations";

describe("Operations Module", () => {
  describe("Resource", () => {
    it("should have medical resources", () => {
      expect(Resource.PATIENT).toBe("PATIENT");
      expect(Resource.MEDICAL_RECORD).toBe("MEDICAL_RECORD");
      expect(Resource.PRESCRIPTION).toBe("PRESCRIPTION");
      expect(Resource.DIAGNOSIS).toBe("DIAGNOSIS");
    });

    it("should have public resources", () => {
      expect(Resource.USER).toBe("USER");
      expect(Resource.PROFILE).toBe("PROFILE");
      expect(Resource.NOTIFICATION).toBe("NOTIFICATION");
      expect(Resource.SETTINGS).toBe("SETTINGS");
    });
  });

  describe("Action", () => {
    it("should have CRUD actions", () => {
      expect(Action.CREATE).toBe("CREATE");
      expect(Action.READ).toBe("READ");
      expect(Action.UPDATE).toBe("UPDATE");
      expect(Action.DELETE).toBe("DELETE");
      expect(Action.LIST).toBe("LIST");
    });

    it("should have medical-specific actions", () => {
      expect(Action.PRESCRIBE).toBe("PRESCRIBE");
      expect(Action.DIAGNOSE).toBe("DIAGNOSE");
      expect(Action.SIGN).toBe("SIGN");
      expect(Action.VERIFY).toBe("VERIFY");
    });

    it("should have system actions", () => {
      expect(Action.LOGIN).toBe("LOGIN");
      expect(Action.LOGOUT).toBe("LOGOUT");
      expect(Action.AUDIT).toBe("AUDIT");
    });
  });

  describe("isMedicalResource", () => {
    it("should return true for medical resources", () => {
      expect(isMedicalResource(Resource.PATIENT)).toBe(true);
      expect(isMedicalResource(Resource.MEDICAL_RECORD)).toBe(true);
      expect(isMedicalResource(Resource.PRESCRIPTION)).toBe(true);
      expect(isMedicalResource(Resource.DIAGNOSIS)).toBe(true);
      expect(isMedicalResource(Resource.LAB_RESULT)).toBe(true);
    });

    it("should return false for public resources", () => {
      expect(isMedicalResource(Resource.USER)).toBe(false);
      expect(isMedicalResource(Resource.PROFILE)).toBe(false);
      expect(isMedicalResource(Resource.NOTIFICATION)).toBe(false);
    });
  });

  describe("isPublicResource", () => {
    it("should return true for public resources", () => {
      expect(isPublicResource(Resource.USER)).toBe(true);
      expect(isPublicResource(Resource.PROFILE)).toBe(true);
      expect(isPublicResource(Resource.SETTINGS)).toBe(true);
    });

    it("should return false for medical resources", () => {
      expect(isPublicResource(Resource.PATIENT)).toBe(false);
      expect(isPublicResource(Resource.MEDICAL_RECORD)).toBe(false);
    });
  });

  describe("Operation", () => {
    describe("constructor and toString", () => {
      it("should create operation and format as RESOURCE:ACTION", () => {
        const op = new Operation(Resource.PATIENT, Action.READ);
        expect(op.toString()).toBe("PATIENT:READ");
      });

      it("should handle different resource and action combinations", () => {
        expect(new Operation(Resource.USER, Action.CREATE).toString()).toBe(
          "USER:CREATE",
        );
        expect(
          new Operation(Resource.PRESCRIPTION, Action.PRESCRIBE).toString(),
        ).toBe("PRESCRIPTION:PRESCRIBE");
        expect(new Operation(Resource.AUDIT_LOG, Action.AUDIT).toString()).toBe(
          "AUDIT_LOG:AUDIT",
        );
      });
    });

    describe("fromString", () => {
      it("should parse valid operation string", () => {
        const op = Operation.fromString("PATIENT:READ");
        expect(op).not.toBeNull();
        expect(op?.resource).toBe(Resource.PATIENT);
        expect(op?.action).toBe(Action.READ);
      });

      it("should return null for invalid format", () => {
        expect(Operation.fromString("INVALID")).toBeNull();
        expect(Operation.fromString("PATIENT")).toBeNull();
        expect(Operation.fromString("PATIENT:READ:EXTRA")).toBeNull();
      });

      it("should return null for invalid resource", () => {
        expect(Operation.fromString("INVALID_RESOURCE:READ")).toBeNull();
      });

      it("should return null for invalid action", () => {
        expect(Operation.fromString("PATIENT:INVALID_ACTION")).toBeNull();
      });

      it("should handle multiple valid operations", () => {
        const testCases = [
          "USER:LOGIN",
          "PRESCRIPTION:PRESCRIBE",
          "DIAGNOSIS:DIAGNOSE",
          "APPOINTMENT:SCHEDULE",
        ];

        testCases.forEach((opStr) => {
          const op = Operation.fromString(opStr);
          expect(op).not.toBeNull();
          expect(op?.toString()).toBe(opStr);
        });
      });
    });

    describe("equals", () => {
      it("should return true for equal operations", () => {
        const op1 = new Operation(Resource.PATIENT, Action.READ);
        const op2 = new Operation(Resource.PATIENT, Action.READ);
        expect(op1.equals(op2)).toBe(true);
      });

      it("should return false for different resources", () => {
        const op1 = new Operation(Resource.PATIENT, Action.READ);
        const op2 = new Operation(Resource.USER, Action.READ);
        expect(op1.equals(op2)).toBe(false);
      });

      it("should return false for different actions", () => {
        const op1 = new Operation(Resource.PATIENT, Action.READ);
        const op2 = new Operation(Resource.PATIENT, Action.UPDATE);
        expect(op1.equals(op2)).toBe(false);
      });
    });

    describe("toJSON", () => {
      it("should convert to JSON representation", () => {
        const op = new Operation(Resource.PATIENT, Action.READ);
        const json = op.toJSON();

        expect(json).toEqual({
          resource: Resource.PATIENT,
          action: Action.READ,
          operation: "PATIENT:READ",
        });
      });
    });
  });

  describe("Predefined Operations", () => {
    it("should have patient operations", () => {
      expect(Operations.PATIENT_CREATE.toString()).toBe("PATIENT:CREATE");
      expect(Operations.PATIENT_READ.toString()).toBe("PATIENT:READ");
      expect(Operations.PATIENT_UPDATE.toString()).toBe("PATIENT:UPDATE");
      expect(Operations.PATIENT_DELETE.toString()).toBe("PATIENT:DELETE");
    });

    it("should have medical record operations", () => {
      expect(Operations.MEDICAL_RECORD_CREATE.toString()).toBe(
        "MEDICAL_RECORD:CREATE",
      );
      expect(Operations.MEDICAL_RECORD_READ.toString()).toBe(
        "MEDICAL_RECORD:READ",
      );
      expect(Operations.MEDICAL_RECORD_SHARE.toString()).toBe(
        "MEDICAL_RECORD:SHARE",
      );
    });

    it("should have prescription operations with medical actions", () => {
      expect(Operations.PRESCRIPTION_PRESCRIBE.toString()).toBe(
        "PRESCRIPTION:PRESCRIBE",
      );
      expect(Operations.PRESCRIPTION_SIGN.toString()).toBe("PRESCRIPTION:SIGN");
    });

    it("should have user operations", () => {
      expect(Operations.USER_LOGIN.toString()).toBe("USER:LOGIN");
      expect(Operations.USER_LOGOUT.toString()).toBe("USER:LOGOUT");
      expect(Operations.USER_CREATE.toString()).toBe("USER:CREATE");
    });
  });

  describe("getAllOperations", () => {
    it("should return all predefined operations", () => {
      const ops = getAllOperations();
      expect(ops.length).toBeGreaterThan(0);
      expect(ops).toContain(Operations.PATIENT_READ);
      expect(ops).toContain(Operations.USER_LOGIN);
    });
  });

  describe("getOperationsByResource", () => {
    it("should return operations for specific resource", () => {
      const patientOps = getOperationsByResource(Resource.PATIENT);
      expect(patientOps).toContain(Operations.PATIENT_CREATE);
      expect(patientOps).toContain(Operations.PATIENT_READ);
      expect(patientOps).toContain(Operations.PATIENT_UPDATE);
      expect(patientOps).toContain(Operations.PATIENT_DELETE);
    });

    it("should not include operations from other resources", () => {
      const patientOps = getOperationsByResource(Resource.PATIENT);
      expect(patientOps).not.toContain(Operations.USER_CREATE);
      expect(patientOps).not.toContain(Operations.PRESCRIPTION_PRESCRIBE);
    });
  });

  describe("getOperationsByAction", () => {
    it("should return operations for specific action", () => {
      const createOps = getOperationsByAction(Action.CREATE);
      expect(createOps).toContain(Operations.PATIENT_CREATE);
      expect(createOps).toContain(Operations.USER_CREATE);
      expect(createOps).toContain(Operations.MEDICAL_RECORD_CREATE);
    });

    it("should not include operations with other actions", () => {
      const createOps = getOperationsByAction(Action.CREATE);
      expect(createOps).not.toContain(Operations.PATIENT_READ);
      expect(createOps).not.toContain(Operations.USER_LOGIN);
    });
  });

  describe("Resource and Action lists", () => {
    it("should have MEDICAL_RESOURCES array", () => {
      expect(MEDICAL_RESOURCES).toContain(Resource.PATIENT);
      expect(MEDICAL_RESOURCES).toContain(Resource.MEDICAL_RECORD);
      expect(MEDICAL_RESOURCES).toContain(Resource.PRESCRIPTION);
    });

    it("should have PUBLIC_RESOURCES array", () => {
      expect(PUBLIC_RESOURCES).toContain(Resource.USER);
      expect(PUBLIC_RESOURCES).toContain(Resource.PROFILE);
      expect(PUBLIC_RESOURCES).toContain(Resource.SETTINGS);
    });

    it("should not overlap between medical and public resources", () => {
      const overlap = MEDICAL_RESOURCES.filter((r) =>
        PUBLIC_RESOURCES.includes(r),
      );
      expect(overlap).toHaveLength(0);
    });
  });
});
