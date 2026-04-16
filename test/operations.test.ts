import {
  Resource,
  ResourceCategory,
  Action,
  Operation,
  Operations,
  MEDICAL_RESOURCES,
  PUBLIC_RESOURCES,
  getResourceCategories,
  getResourcesByCategory,
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
    it('should expose schema-backed medical resources', () => {
      expect(Resource.PATIENT).toBe('PATIENT');
      expect(Resource.MEDICAL_SERVICE).toBe('MEDICAL_SERVICE');
      expect(Resource.PRESCRIPTION).toBe('PRESCRIPTION');
      expect(Resource.UPLOAD_DOCUMENT).toBe('UPLOAD_DOCUMENT');
      expect(Resource.AVAILABLE_SLOTS).toBe('AVAILABLE_SLOTS');
    });

    it('should expose schema-backed public resources', () => {
      expect(Resource.USER).toBe('USER');
      expect(Resource.ACCOUNT).toBe('ACCOUNT');
      expect(Resource.GENERAL_SETTINGS).toBe('GENERAL_SETTINGS');
      expect(Resource.CALENDAR_SYNC).toBe('CALENDAR_SYNC');
      expect(Resource.DOCUMENT_LAYOUT).toBe('DOCUMENT_LAYOUT');
    });

    it('should expose schema categories', () => {
      expect(ResourceCategory.CORE).toBe('core');
      expect(ResourceCategory.CLINICAL).toBe('clinical');
      expect(ResourceCategory.DOCUMENTS).toBe('documents');
      expect(ResourceCategory.SETTINGS).toBe('settings');
      expect(ResourceCategory.SYSTEM).toBe('system');
    });
  });

  describe('Action', () => {
    it('should expose the permission catalog core actions', () => {
      expect(Action.CREATE).toBe('CREATE');
      expect(Action.VIEW).toBe('VIEW');
      expect(Action.UPDATE).toBe('UPDATE');
      expect(Action.DELETE).toBe('DELETE');
    });

    it('should expose workflow-specific actions', () => {
      expect(Action.CHECK_IN).toBe('CHECK_IN');
      expect(Action.UPDATE_STATUS).toBe('UPDATE_STATUS');
      expect(Action.TRANSFER_OWNERSHIP).toBe('TRANSFER_OWNERSHIP');
      expect(Action.ASSIGN_ROLES).toBe('ASSIGN_ROLES');
      expect(Action.ROTATE_TOKEN).toBe('ROTATE_TOKEN');
    });
  });

  describe('isMedicalResource', () => {
    it('should return true for medical resources', () => {
      expect(isMedicalResource(Resource.PATIENT)).toBe(true);
      expect(isMedicalResource(Resource.MEDICAL_SERVICE)).toBe(true);
      expect(isMedicalResource(Resource.PRESCRIPTION)).toBe(true);
      expect(isMedicalResource(Resource.MEDICATION_SEARCH)).toBe(true);
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
      expect(isPublicResource(Resource.CALENDAR_SYNC)).toBe(true);
    });

    it('should return false for medical resources', () => {
      expect(isPublicResource(Resource.PATIENT)).toBe(false);
      expect(isPublicResource(Resource.MEDICAL_SERVICE)).toBe(false);
    });
  });

  describe('Operation', () => {
    describe('constructor and toString', () => {
      it('should create operation and format as RESOURCE:ACTION', () => {
        const op = new Operation(Resource.PATIENT, Action.VIEW);
        expect(op.toString()).toBe('PATIENT:VIEW');
      });

      it('should handle different resource and action combinations', () => {
        expect(new Operation(Resource.USER, Action.UPDATE).toString()).toBe('USER:UPDATE');
        expect(new Operation(Resource.PRESCRIPTION, Action.CREATE).toString()).toBe('PRESCRIPTION:CREATE');
        expect(new Operation(Resource.LOG_RECORDS, Action.VIEW).toString()).toBe('LOG_RECORDS:VIEW');
        expect(new Operation(Resource.MEDICAL_SERVICE, Action.CHECK_IN).toString()).toBe('MEDICAL_SERVICE:CHECK_IN');
      });
    });

    describe('fromString', () => {
      it('should parse valid operation string', () => {
        const op = Operation.fromString('PATIENT:VIEW');
        expect(op).not.toBeNull();
        expect(op?.resource).toBe(Resource.PATIENT);
        expect(op?.action).toBe(Action.VIEW);
      });

      it('should return null for invalid format', () => {
        expect(Operation.fromString('INVALID')).toBeNull();
        expect(Operation.fromString('PATIENT')).toBeNull();
        expect(Operation.fromString('PATIENT:RETRIEVE:EXTRA')).toBeNull();
      });

      it('should return null for invalid resource', () => {
        expect(Operation.fromString('INVALID_RESOURCE:VIEW')).toBeNull();
      });

      it('should return null for invalid action', () => {
        expect(Operation.fromString('PATIENT:INVALID_ACTION')).toBeNull();
      });

      it('should handle multiple valid operations', () => {
        const testCases = ['USER:UPDATE', 'PRESCRIPTION:CREATE', 'MEDICAL_SERVICE:DELETE', 'DOCUMENT_LAYOUT:VIEW'];

        testCases.forEach((opStr) => {
          const op = Operation.fromString(opStr);
          expect(op).not.toBeNull();
          expect(op?.toString()).toBe(opStr);
        });
      });
    });

    describe('equals', () => {
      it('should return true for equal operations', () => {
        const op1 = new Operation(Resource.PATIENT, Action.VIEW);
        const op2 = new Operation(Resource.PATIENT, Action.VIEW);
        expect(op1.equals(op2)).toBe(true);
      });

      it('should return false for different resources', () => {
        const op1 = new Operation(Resource.PATIENT, Action.VIEW);
        const op2 = new Operation(Resource.USER, Action.VIEW);
        expect(op1.equals(op2)).toBe(false);
      });

      it('should return false for different actions', () => {
        const op1 = new Operation(Resource.PATIENT, Action.VIEW);
        const op2 = new Operation(Resource.PATIENT, Action.UPDATE);
        expect(op1.equals(op2)).toBe(false);
      });
    });

    describe('toJSON', () => {
      it('should convert to JSON representation', () => {
        const op = new Operation(Resource.PATIENT, Action.VIEW);
        const json = op.toJSON();

        expect(json).toEqual({
          resource: Resource.PATIENT,
          action: Action.VIEW,
          operation: 'PATIENT:VIEW',
        });
      });
    });
  });

  describe('Predefined Operations', () => {
    it('should have patient operations', () => {
      expect(Operations.PATIENT_CREATE.toString()).toBe('PATIENT:CREATE');
      expect(Operations.PATIENT_VIEW.toString()).toBe('PATIENT:VIEW');
      expect(Operations.PATIENT_UPDATE.toString()).toBe('PATIENT:UPDATE');
      expect(Operations.PATIENT_DELETE.toString()).toBe('PATIENT:DELETE');
    });

    it('should have medical service workflow and subresource operations', () => {
      expect(Operations.MEDICAL_SERVICE_STATUS_UPDATE.toString()).toBe('MEDICAL_SERVICE:UPDATE_STATUS');
      expect(Operations.MEDICAL_SERVICE_FEES_UPDATE.toString()).toBe('MEDICAL_SERVICE:UPDATE');
      expect(Operations.MEDICAL_SERVICE_TIMESTAMPS_UPDATE.toString()).toBe('MEDICAL_SERVICE:CORRECT_TIMESTAMPS');
      expect(Operations.MEDICAL_SERVICE_CHECK_IN.toString()).toBe('MEDICAL_SERVICE:CHECK_IN');
      expect(Operations.MEDICAL_SERVICE_SCHEDULES_UPDATE.toString()).toBe('MEDICAL_SERVICE:UPDATE_SCHEDULE');
      expect(Operations.MEDICAL_SERVICE_NOTE_UPDATE.toString()).toBe('MEDICAL_SERVICE_NOTE:UPDATE');
    });

    it('should have document and calendar operations', () => {
      expect(Operations.DOCUMENT_LAYOUT_CREATE.toString()).toBe('DOCUMENT_LAYOUT:CREATE');
      expect(Operations.CALENDAR_SYNC_VIEW.toString()).toBe('CALENDAR_SYNC:VIEW');
      expect(Operations.CALENDAR_SYNC_ENABLE.toString()).toBe('CALENDAR_SYNC:ENABLE');
      expect(Operations.CALENDAR_TOKEN_ROTATE.toString()).toBe('CALENDAR_TOKEN:ROTATE_TOKEN');
      expect(Operations.GENERATED_DOCUMENT_GENERATE.toString()).toBe('GENERATED_DOCUMENT:GENERATE');
      expect(Operations.GENERATED_DOCUMENT_PREVIEW.toString()).toBe('GENERATED_DOCUMENT:PREVIEW');
    });
  });

  describe('getAllOperations', () => {
    it('should return all predefined operations', () => {
      const ops = getAllOperations();
      expect(ops.length).toBeGreaterThan(0);
      expect(ops).toContain(Operations.PATIENT_VIEW);
      expect(ops).toContain(Operations.USER_UPDATE);
    });
  });

  describe('getOperationsByResource', () => {
    it('should return operations for specific resource', () => {
      const patientOps = getOperationsByResource(Resource.PATIENT);
      expect(patientOps).toContain(Operations.PATIENT_CREATE);
      expect(patientOps).toContain(Operations.PATIENT_VIEW);
      expect(patientOps).toContain(Operations.PATIENT_UPDATE);
      expect(patientOps).toContain(Operations.PATIENT_DELETE);
    });

    it('should not include operations from other resources', () => {
      const patientOps = getOperationsByResource(Resource.PATIENT);
      expect(patientOps).not.toContain(Operations.USER_UPDATE);
      expect(patientOps).not.toContain(Operations.PRESCRIPTION_VIEW);
    });
  });

  describe('getOperationsByAction', () => {
    it('should return operations for specific action', () => {
      const viewOps = getOperationsByAction(Action.VIEW);
      expect(viewOps).toContain(Operations.PATIENT_VIEW);
      expect(viewOps).toContain(Operations.CALENDAR_SYNC_VIEW);
      expect(viewOps).toContain(Operations.DOCUMENT_LAYOUT_VIEW);
    });

    it('should not include operations with other actions', () => {
      const viewOps = getOperationsByAction(Action.VIEW);
      expect(viewOps).not.toContain(Operations.PATIENT_CREATE);
      expect(viewOps).not.toContain(Operations.USER_UPDATE);
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

    it('should expose schema resource categories', () => {
      const categories = getResourceCategories();
      expect(categories.core).toEqual([Resource.ACCOUNT]);
      expect(categories.clinical).toContain(Resource.MEDICAL_SERVICE);
      expect(categories.documents).toContain(Resource.DOCUMENT_MODEL);
      expect(categories.settings).toContain(Resource.MEASURE_MODEL);
      expect(categories.system).toEqual([Resource.LOG_RECORDS]);
    });

    it('should return category resources by category key', () => {
      const schedulingResources = getResourcesByCategory(ResourceCategory.SCHEDULING);
      expect(schedulingResources).toEqual([Resource.AVAILABLE_SLOTS]);
    });
  });

  describe('getResourceFromOperation', () => {
    it('should extract resource from valid operation string', () => {
      expect(getResourceFromOperation('PATIENT:VIEW')).toBe(Resource.PATIENT);
      expect(getResourceFromOperation('USER:UPDATE')).toBe(Resource.USER);
      expect(getResourceFromOperation('PRESCRIPTION:CREATE')).toBe(Resource.PRESCRIPTION);
    });

    it('should return null for invalid operation format', () => {
      expect(getResourceFromOperation('INVALID')).toBeNull();
      expect(getResourceFromOperation('PATIENT')).toBeNull();
      expect(getResourceFromOperation('PATIENT:RETRIEVE:EXTRA')).toBeNull();
    });

    it('should return null for invalid resource', () => {
      expect(getResourceFromOperation('INVALID_RESOURCE:VIEW')).toBeNull();
    });

    it('should work with valid resources', () => {
      expect(getResourceFromOperation('MEDICAL_SERVICE:CREATE')).toBe(Resource.MEDICAL_SERVICE);
      expect(getResourceFromOperation('LOG_RECORDS:VIEW')).toBe(Resource.LOG_RECORDS);
    });
  });

  describe('getActionFromOperation', () => {
    it('should extract action from valid operation string', () => {
      expect(getActionFromOperation('PATIENT:VIEW')).toBe(Action.VIEW);
      expect(getActionFromOperation('USER:UPDATE')).toBe(Action.UPDATE);
      expect(getActionFromOperation('PRESCRIPTION:CREATE')).toBe(Action.CREATE);
    });

    it('should return null for invalid operation format', () => {
      expect(getActionFromOperation('INVALID')).toBeNull();
      expect(getActionFromOperation('PATIENT')).toBeNull();
      expect(getActionFromOperation('PATIENT:VIEW:EXTRA')).toBeNull();
    });

    it('should return null for invalid action', () => {
      expect(getActionFromOperation('PATIENT:INVALID_ACTION')).toBeNull();
    });

    it('should work with all valid actions', () => {
      expect(getActionFromOperation('PATIENT:CREATE')).toBe(Action.CREATE);
      expect(getActionFromOperation('MEDICAL_SERVICE:UPDATE')).toBe(Action.UPDATE);
      expect(getActionFromOperation('DOCUMENT_LAYOUT:DELETE')).toBe(Action.DELETE);
      expect(getActionFromOperation('MEDICAL_SERVICE:CHECK_IN')).toBe(Action.CHECK_IN);
      expect(getActionFromOperation('CALENDAR_TOKEN:ROTATE_TOKEN')).toBe(Action.ROTATE_TOKEN);
    });
  });
});
