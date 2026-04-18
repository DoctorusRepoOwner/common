import {
  Action,
  ActionAccess,
  getActionsByAccess,
  getActionAccess,
  getActionFromOperation,
  getAllResourceActions,
  getAllResourceActionsByAccess,
  generateOperationsForResources,
  getResourceActions,
  getResourceActionsByAccess,
  getResourceCategories,
  getResourceFromOperation,
  getResourcesByCategories,
  getResourcesByCategory,
  isReadAction,
  isMedicalResource,
  isPublicResource,
  isWriteAction,
  MEDICAL_RESOURCES,
  Operation,
  PUBLIC_RESOURCES,
  Resource,
  ResourceCategory,
} from '../src/operations';

describe('Operations Module', () => {
  describe('Resource', () => {
    it('should expose requested resources', () => {
      expect(Resource.PATIENT).toBe('PATIENT');
      expect(Resource.CONTACT).toBe('CONTACT');
      expect(Resource.PATIENT_MEDICAL_NOTE).toBe('PATIENT_MEDICAL_NOTE');
      expect(Resource.PATIENT_PROPERTY_MODEL).toBe('PATIENT_PROPERTY_MODEL');
      expect(Resource.ROLE).toBe('ROLE');
      expect(Resource.AVAILABLE_SLOTS).toBe('AVAILABLE_SLOTS');
    });

    it('should expose requested categories', () => {
      expect(ResourceCategory.CORE).toBe('core');
      expect(ResourceCategory.MEMBERSHIP).toBe('membership');
      expect(ResourceCategory.CLINICAL).toBe('clinical');
      expect(ResourceCategory.SYSTEM).toBe('system');
    });
  });

  describe('Action', () => {
    it('should expose requested core actions', () => {
      expect(Action.VIEW).toBe('VIEW');
      expect(Action.CREATE).toBe('CREATE');
      expect(Action.UPDATE).toBe('UPDATE');
      expect(Action.DELETE).toBe('DELETE');
    });

    it('should expose requested workflow actions', () => {
      expect(Action.CHECK_IN).toBe('CHECK_IN');
      expect(Action.COMPLETE).toBe('COMPLETE');
      expect(Action.CANCEL).toBe('CANCEL');
      expect(Action.ASSIGN).toBe('ASSIGN');
      expect(Action.ROTATE).toBe('ROTATE');
      expect(Action.TRANSFER_OWNERSHIP).toBe('TRANSFER_OWNERSHIP');
    });

    it('should classify actions by access level', () => {
      expect(getActionAccess(Action.VIEW)).toBe(ActionAccess.READ);
      expect(getActionAccess(Action.UPDATE)).toBe(ActionAccess.WRITE);
      expect(isReadAction(Action.VIEW)).toBe(true);
      expect(isWriteAction(Action.CREATE)).toBe(true);
      expect(getActionsByAccess(ActionAccess.READ)).toEqual([Action.VIEW]);
      expect(getActionsByAccess(ActionAccess.WRITE)).toContain(Action.DELETE);
    });
  });

  describe('Backend APIs', () => {
    it('should fetch all actions for a resource', () => {
      expect(getResourceActions(Resource.MEDICAL_SERVICE)).toEqual([
        Action.VIEW,
        Action.CREATE,
        Action.UPDATE,
        Action.DELETE,
        Action.CHECK_IN,
        Action.COMPLETE,
        Action.CANCEL,
        Action.ASSIGN,
      ]);
      expect(getResourceActions(Resource.CALENDAR_TOKEN)).toEqual([Action.VIEW, Action.ROTATE]);
      expect(getResourceActions(Resource.AVAILABLE_SLOTS)).toEqual([Action.VIEW]);
    });

    it('should fetch all resources for one category', () => {
      expect(getResourcesByCategory(ResourceCategory.CORE)).toEqual([Resource.ACCOUNT]);
      expect(getResourcesByCategory(ResourceCategory.SCHEDULING)).toEqual([Resource.AVAILABLE_SLOTS]);
      expect(getResourcesByCategory(ResourceCategory.SYSTEM)).toEqual([]);
    });

    it('should fetch all resources for many categories', () => {
      expect(getResourcesByCategories([ResourceCategory.CORE, ResourceCategory.MEMBERSHIP])).toEqual([
        Resource.ACCOUNT,
        Resource.USER,
        Resource.MEMBERSHIP,
      ]);
    });

    it('should expose full resource->actions map', () => {
      const all = getAllResourceActions();
      expect(all[Resource.PATIENT]).toContain(Action.VIEW);
      expect(all[Resource.PATIENT]).toContain(Action.CREATE);
      expect(all[Resource.CALENDAR_SYNC]).toEqual([Action.ENABLE, Action.DISABLE, Action.VIEW]);
    });

    it('should filter resource actions by access', () => {
      expect(getResourceActionsByAccess(Resource.PATIENT, ActionAccess.READ)).toEqual([Action.VIEW]);
      expect(getResourceActionsByAccess(Resource.PATIENT, ActionAccess.WRITE)).toEqual([
        Action.CREATE,
        Action.UPDATE,
        Action.DELETE,
      ]);

      const allRead = getAllResourceActionsByAccess(ActionAccess.READ);
      expect(allRead[Resource.PATIENT]).toEqual([Action.VIEW]);
      expect(allRead[Resource.CALENDAR_SYNC]).toEqual([Action.VIEW]);
    });

    it('should generate operations for resources based on action list', () => {
      const ops = generateOperationsForResources(
        [Resource.PATIENT, Resource.CALENDAR_TOKEN],
        [Action.VIEW, Action.UPDATE, Action.ROTATE],
      );

      expect(ops.map((op) => op.toString())).toEqual([
        'PATIENT:VIEW',
        'PATIENT:UPDATE',
        'CALENDAR_TOKEN:VIEW',
        'CALENDAR_TOKEN:ROTATE',
      ]);
    });

    it('should ignore duplicate inputs when generating operations', () => {
      const ops = generateOperationsForResources([Resource.PATIENT, Resource.PATIENT], [Action.VIEW, Action.VIEW]);

      expect(ops.map((op) => op.toString())).toEqual(['PATIENT:VIEW']);
    });
  });

  describe('Legacy resource helpers', () => {
    it('should classify medical resources', () => {
      expect(isMedicalResource(Resource.PATIENT)).toBe(true);
      expect(isMedicalResource(Resource.CONTACT)).toBe(true);
      expect(isMedicalResource(Resource.PATIENT_MEDICAL_NOTE)).toBe(true);
      expect(isMedicalResource(Resource.USER)).toBe(false);
    });

    it('should classify public resources', () => {
      expect(isPublicResource(Resource.USER)).toBe(true);
      expect(isPublicResource(Resource.ACCOUNT)).toBe(true);
      expect(isPublicResource(Resource.CALENDAR_TOKEN)).toBe(true);
      expect(isPublicResource(Resource.PATIENT)).toBe(false);
    });

    it('should expose legacy arrays', () => {
      expect(MEDICAL_RESOURCES).toContain(Resource.PATIENT);
      expect(PUBLIC_RESOURCES).toContain(Resource.USER);
      expect(MEDICAL_RESOURCES.filter((r) => PUBLIC_RESOURCES.includes(r))).toHaveLength(0);
    });
  });

  describe('Operation helpers', () => {
    it('should serialize and parse operation strings', () => {
      const op = new Operation(Resource.PATIENT, Action.VIEW);
      expect(op.toString()).toBe('PATIENT:VIEW');

      const parsed = Operation.fromString('PATIENT:VIEW');
      expect(parsed?.resource).toBe(Resource.PATIENT);
      expect(parsed?.action).toBe(Action.VIEW);
    });

    it('should reject invalid operation strings', () => {
      expect(Operation.fromString('INVALID')).toBeNull();
      expect(Operation.fromString('PATIENT')).toBeNull();
      expect(Operation.fromString('PATIENT:VIEW:EXTRA')).toBeNull();
      expect(Operation.fromString('INVALID_RESOURCE:VIEW')).toBeNull();
      expect(Operation.fromString('PATIENT:INVALID_ACTION')).toBeNull();
    });

    it('should extract resource and action from operation strings', () => {
      expect(getResourceFromOperation('ROLE:CREATE')).toBe(Resource.ROLE);
      expect(getActionFromOperation('CALENDAR_TOKEN:ROTATE')).toBe(Action.ROTATE);
      expect(getResourceFromOperation('INVALID')).toBeNull();
      expect(getActionFromOperation('INVALID')).toBeNull();
    });

    it('should expose category map', () => {
      const categories = getResourceCategories();
      expect(categories.core).toEqual([Resource.ACCOUNT]);
      expect(categories.membership).toEqual([Resource.USER, Resource.MEMBERSHIP]);
      expect(categories.clinical).toContain(Resource.CONTACT);
      expect(categories.settings).toContain(Resource.PATIENT_PROPERTY_MODEL);
      expect(categories.system).toEqual([]);
    });
  });
});
