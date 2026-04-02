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
  getResourceFromOperation,
  getActionFromOperation,
} from '../src/operations';

describe('Operations Module', () => {
  describe('Resource', () => {
    it('should expose schema-aligned medical resources', () => {
      expect(Resource.PATIENT).toBe('PATIENT');
      expect(Resource.MEDICAL_SERVICE).toBe('MEDICAL_SERVICE');
      expect(Resource.PRESCRIPTION).toBe('PRESCRIPTION');
      expect(Resource.UPLOAD_DOCUMENT).toBe('UPLOAD_DOCUMENT');
    });

    it('should expose schema-aligned public resources', () => {
      expect(Resource.USER).toBe('USER');
      expect(Resource.ACCOUNT).toBe('ACCOUNT');
      expect(Resource.ACCOUNT_LOCATION).toBe('ACCOUNT_LOCATION');
      expect(Resource.DOCUMENT_LAYOUT).toBe('DOCUMENT_LAYOUT');
    });
  });

  describe('Action', () => {
    it('should match the GraphQL action contract', () => {
      expect(Action.CREATE).toBe('CREATE');
      expect(Action.RETRIEVE).toBe('RETRIEVE');
      expect(Action.UPDATE).toBe('UPDATE');
      expect(Action.DELETE).toBe('DELETE');
    });

    it('should keep richer application actions', () => {
      expect(Action.CHECK_IN).toBe('CHECK_IN');
      expect(Action.SET_MEDICAL_SERVICE_FEES).toBe('SET_MEDICAL_SERVICE_FEES');
      expect(Action.PUT_PATIENT_PAYMENT).toBe('PUT_PATIENT_PAYMENT');
      expect(Action.ENABLE_CALENDAR_SYNC).toBe('ENABLE_CALENDAR_SYNC');
    });
  });

  describe('isMedicalResource', () => {
    it('should return true for medical resources', () => {
      expect(isMedicalResource(Resource.PATIENT)).toBe(true);
      expect(isMedicalResource(Resource.MEDICAL_SERVICE)).toBe(true);
      expect(isMedicalResource(Resource.PRESCRIPTION)).toBe(true);
      expect(isMedicalResource(Resource.MEDICATION)).toBe(true);
    });

    it('should return false for public resources', () => {
      expect(isMedicalResource(Resource.USER)).toBe(false);
      expect(isMedicalResource(Resource.ACCOUNT)).toBe(false);
      expect(isMedicalResource(Resource.DOCUMENT_LAYOUT)).toBe(false);
    });
  });

  describe('isPublicResource', () => {
    it('should return true for public resources', () => {
      expect(isPublicResource(Resource.USER)).toBe(true);
      expect(isPublicResource(Resource.ACCOUNT)).toBe(true);
      expect(isPublicResource(Resource.CALENDAR_TOKEN)).toBe(true);
    });

    it('should return false for medical resources', () => {
      expect(isPublicResource(Resource.PATIENT)).toBe(false);
      expect(isPublicResource(Resource.MEDICAL_SERVICE)).toBe(false);
    });
  });

  describe('Operation', () => {
    describe('constructor and toString', () => {
      it('should create operation and format as RESOURCE:ACTION', () => {
        const op = new Operation(Resource.PATIENT, Action.RETRIEVE);
        expect(op.toString()).toBe('PATIENT:RETRIEVE');
      });

      it('should handle different resource and action combinations', () => {
        expect(new Operation(Resource.USER, Action.UPDATE).toString()).toBe('USER:UPDATE');
        expect(new Operation(Resource.PRESCRIPTION, Action.CREATE).toString()).toBe('PRESCRIPTION:CREATE');
        expect(new Operation(Resource.LOG_RECORD, Action.RETRIEVE).toString()).toBe('LOG_RECORD:RETRIEVE');
        expect(new Operation(Resource.MEDICAL_SERVICE_STATUS, Action.CHECK_IN).toString()).toBe(
          'MEDICAL_SERVICE_STATUS:CHECK_IN',
        );
      });
    });

    describe('fromString', () => {
      it('should parse valid operation string', () => {
        const op = Operation.fromString('PATIENT:RETRIEVE');
        expect(op).not.toBeNull();
        expect(op?.resource).toBe(Resource.PATIENT);
        expect(op?.action).toBe(Action.RETRIEVE);
      });

      it('should return null for invalid format', () => {
        expect(Operation.fromString('INVALID')).toBeNull();
        expect(Operation.fromString('PATIENT')).toBeNull();
        expect(Operation.fromString('PATIENT:RETRIEVE:EXTRA')).toBeNull();
      });

      it('should return null for invalid resource', () => {
        expect(Operation.fromString('INVALID_RESOURCE:RETRIEVE')).toBeNull();
      });

      it('should return null for invalid action', () => {
        expect(Operation.fromString('PATIENT:INVALID_ACTION')).toBeNull();
      });

      it('should handle multiple valid operations', () => {
        const testCases = ['USER:UPDATE', 'PRESCRIPTION:CREATE', 'MEDICAL_SERVICE:DELETE', 'DOCUMENT_LAYOUT:RETRIEVE'];

        testCases.forEach((opStr) => {
          const op = Operation.fromString(opStr);
          expect(op).not.toBeNull();
          expect(op?.toString()).toBe(opStr);
        });
      });
    });

    describe('equals', () => {
      it('should return true for equal operations', () => {
        const op1 = new Operation(Resource.PATIENT, Action.RETRIEVE);
        const op2 = new Operation(Resource.PATIENT, Action.RETRIEVE);
        expect(op1.equals(op2)).toBe(true);
      });

      it('should return false for different resources', () => {
        const op1 = new Operation(Resource.PATIENT, Action.RETRIEVE);
        const op2 = new Operation(Resource.USER, Action.RETRIEVE);
        expect(op1.equals(op2)).toBe(false);
      });

      it('should return false for different actions', () => {
        const op1 = new Operation(Resource.PATIENT, Action.RETRIEVE);
        const op2 = new Operation(Resource.PATIENT, Action.UPDATE);
        expect(op1.equals(op2)).toBe(false);
      });
    });

    describe('toJSON', () => {
      it('should convert to JSON representation', () => {
        const op = new Operation(Resource.PATIENT, Action.RETRIEVE);
        const json = op.toJSON();

        expect(json).toEqual({
          resource: Resource.PATIENT,
          action: Action.RETRIEVE,
          operation: 'PATIENT:RETRIEVE',
        });
      });
    });
  });

  describe('Predefined Operations', () => {
    it('should have patient operations', () => {
      expect(Operations.PATIENT_CREATE.toString()).toBe('PATIENT:CREATE');
      expect(Operations.PATIENT_RETRIEVE.toString()).toBe('PATIENT:RETRIEVE');
      expect(Operations.PATIENT_UPDATE.toString()).toBe('PATIENT:UPDATE');
      expect(Operations.PATIENT_DELETE.toString()).toBe('PATIENT:DELETE');
    });

    it('should have medical service subresource operations', () => {
      expect(Operations.MEDICAL_SERVICE_STATUS_UPDATE.toString()).toBe(
        'MEDICAL_SERVICE_STATUS:SET_MEDICAL_SERVICE_STATUS',
      );
      expect(Operations.MEDICAL_SERVICE_FEES_UPDATE.toString()).toBe('MEDICAL_SERVICE_FEES:SET_MEDICAL_SERVICE_FEES');
      expect(Operations.MEDICAL_SERVICE_TIMESTAMPS_UPDATE.toString()).toBe(
        'MEDICAL_SERVICE_TIMESTAMPS:CORRECT_TIMESTAMPS',
      );
      expect(Operations.MEDICAL_SERVICE_CHECK_IN.toString()).toBe('MEDICAL_SERVICE_STATUS:CHECK_IN');
    });

    it('should have document and calendar operations', () => {
      expect(Operations.DOCUMENT_LAYOUT_CREATE.toString()).toBe('DOCUMENT_LAYOUT:CREATE');
      expect(Operations.CALENDAR_TOKEN_RETRIEVE.toString()).toBe('CALENDAR_TOKEN:RETRIEVE');
      expect(Operations.CALENDAR_SYNC_ENABLE.toString()).toBe('CALENDAR_SYNC:ENABLE_CALENDAR_SYNC');
    });
  });

  describe('getAllOperations', () => {
    it('should return all predefined operations', () => {
      const ops = getAllOperations();
      expect(ops.length).toBeGreaterThan(0);
      expect(ops).toContain(Operations.PATIENT_RETRIEVE);
      expect(ops).toContain(Operations.USER_UPDATE);
    });
  });

  describe('getOperationsByResource', () => {
    it('should return operations for specific resource', () => {
      const patientOps = getOperationsByResource(Resource.PATIENT);
      expect(patientOps).toContain(Operations.PATIENT_CREATE);
      expect(patientOps).toContain(Operations.PATIENT_RETRIEVE);
      expect(patientOps).toContain(Operations.PATIENT_UPDATE);
      expect(patientOps).toContain(Operations.PATIENT_DELETE);
    });

    it('should not include operations from other resources', () => {
      const patientOps = getOperationsByResource(Resource.PATIENT);
      expect(patientOps).not.toContain(Operations.USER_UPDATE);
      expect(patientOps).not.toContain(Operations.PRESCRIPTION_CREATE);
    });
  });

  describe('getOperationsByAction', () => {
    it('should return operations for specific action', () => {
      const retrieveOps = getOperationsByAction(Action.RETRIEVE);
      expect(retrieveOps).toContain(Operations.PATIENT_RETRIEVE);
      expect(retrieveOps).toContain(Operations.CALENDAR_TOKEN_RETRIEVE);
      expect(retrieveOps).toContain(Operations.DOCUMENT_LAYOUT_RETRIEVE);
    });

    it('should not include operations with other actions', () => {
      const retrieveOps = getOperationsByAction(Action.RETRIEVE);
      expect(retrieveOps).not.toContain(Operations.PATIENT_CREATE);
      expect(retrieveOps).not.toContain(Operations.USER_UPDATE);
    });
  });

  describe('Resource and Action lists', () => {
    it('should have MEDICAL_RESOURCES array', () => {
      expect(MEDICAL_RESOURCES).toContain(Resource.PATIENT);
      expect(MEDICAL_RESOURCES).toContain(Resource.MEDICAL_SERVICE);
      expect(MEDICAL_RESOURCES).toContain(Resource.PRESCRIPTION);
    });

    it('should have PUBLIC_RESOURCES array', () => {
      expect(PUBLIC_RESOURCES).toContain(Resource.USER);
      expect(PUBLIC_RESOURCES).toContain(Resource.ACCOUNT);
      expect(PUBLIC_RESOURCES).toContain(Resource.CALENDAR_SYNC);
    });

    it('should not overlap between medical and public resources', () => {
      const overlap = MEDICAL_RESOURCES.filter((r) => PUBLIC_RESOURCES.includes(r));
      expect(overlap).toHaveLength(0);
    });
  });

  describe('getResourceFromOperation', () => {
    it('should extract resource from valid operation string', () => {
      expect(getResourceFromOperation('PATIENT:RETRIEVE')).toBe(Resource.PATIENT);
      expect(getResourceFromOperation('USER:UPDATE')).toBe(Resource.USER);
      expect(getResourceFromOperation('PRESCRIPTION:CREATE')).toBe(Resource.PRESCRIPTION);
    });

    it('should return null for invalid operation format', () => {
      expect(getResourceFromOperation('INVALID')).toBeNull();
      expect(getResourceFromOperation('PATIENT')).toBeNull();
      expect(getResourceFromOperation('PATIENT:RETRIEVE:EXTRA')).toBeNull();
    });

    it('should return null for invalid resource', () => {
      expect(getResourceFromOperation('INVALID_RESOURCE:RETRIEVE')).toBeNull();
    });

    it('should work with valid resources', () => {
      expect(getResourceFromOperation('MEDICAL_SERVICE:CREATE')).toBe(Resource.MEDICAL_SERVICE);
      expect(getResourceFromOperation('LOG_RECORD:RETRIEVE')).toBe(Resource.LOG_RECORD);
    });
  });

  describe('getActionFromOperation', () => {
    it('should extract action from valid operation string', () => {
      expect(getActionFromOperation('PATIENT:RETRIEVE')).toBe(Action.RETRIEVE);
      expect(getActionFromOperation('USER:UPDATE')).toBe(Action.UPDATE);
      expect(getActionFromOperation('PRESCRIPTION:CREATE')).toBe(Action.CREATE);
    });

    it('should return null for invalid operation format', () => {
      expect(getActionFromOperation('INVALID')).toBeNull();
      expect(getActionFromOperation('PATIENT')).toBeNull();
      expect(getActionFromOperation('PATIENT:RETRIEVE:EXTRA')).toBeNull();
    });

    it('should return null for invalid action', () => {
      expect(getActionFromOperation('PATIENT:INVALID_ACTION')).toBeNull();
    });

    it('should work with all valid actions', () => {
      expect(getActionFromOperation('PATIENT:CREATE')).toBe(Action.CREATE);
      expect(getActionFromOperation('MEDICAL_SERVICE:UPDATE')).toBe(Action.UPDATE);
      expect(getActionFromOperation('DOCUMENT_LAYOUT:DELETE')).toBe(Action.DELETE);
      expect(getActionFromOperation('MEDICAL_SERVICE_STATUS:CHECK_IN')).toBe(Action.CHECK_IN);
    });
  });
});
