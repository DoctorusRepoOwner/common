import {
  Action,
  ActionAccess,
  getActionsByAccess,
  getActionAccess,
  getActionFromOperation,
  getAllResourceActions,
  getAllResourceActionsByAccess,
  generateOperationsForResources,
  isValidOperation,
  getResourceActions,
  getResourceActionsByAccess,
  getResourceOperationsByAccess,
  getResourceCategories,
  getResourceFromOperation,
  getResourcesByCategories,
  getResourcesByCategory,
  getResourceScope,
  getResourcesByScope,
  isUserResource,
  isAccountResource,
  isPatientResource,
  USER_RESOURCES,
  ACCOUNT_RESOURCES,
  PATIENT_RESOURCES,
  isReadAction,
  isMedicalResource,
  isPublicResource,
  isWriteAction,
  MEDICAL_RESOURCES,
  Operation,
  PUBLIC_RESOURCES,
  Resource,
  ResourceCategory,
  ResourceScope,
} from '../src/operations';
import type {
  ActionForAccess,
  ActionFromOperation,
  AllowedActionForAccess,
  AllowedOperation,
  AllowedOperationFor,
  GeneratedOperationFor,
  OperationFromString,
  ResourceActions,
  ResourceActionsByAccess,
  ResourceForCategory,
  ResourceForScope,
  ResourceFromOperation,
  ResourceOperationForAccess,
} from '../src/operations';

describe('Operations Module', () => {
  describe('Resource', () => {
    it('should expose requested resources', () => {
      expect(Resource.PATIENT).toBe('PATIENT');
      expect(Resource.CONTACT).toBe('CONTACT');
      expect(Resource.PATIENT_MEDICAL_NOTE).toBe('PATIENT_MEDICAL_NOTE');
      expect(Resource.PATIENT_PUBLIC_PROPERTY).toBe('PATIENT_PUBLIC_PROPERTY');
      expect(Resource.PATIENT_MEDICAL_PROPERTY).toBe('PATIENT_MEDICAL_PROPERTY');
      expect(Resource.PATIENT_PROPERTY_MODEL).toBe('PATIENT_PROPERTY_MODEL');
      expect(Resource.ROLE).toBe('ROLE');
      expect(Resource.MEDICATION).toBe('MEDICATION');
      expect(Resource.MEDICAL_SERVICE_SLOT).toBe('MEDICAL_SERVICE_SLOT');
    });

    it('should expose requested categories', () => {
      expect(ResourceCategory.CORE).toBe('core');
      expect(ResourceCategory.MEMBERSHIP).toBe('membership');
      expect(ResourceCategory.CLINICAL).toBe('clinical');
      expect(ResourceCategory.SYSTEM).toBe('system');
    });

    it('should tag resources by owner scope', () => {
      expect(ResourceScope.USER).toBe('user');
      expect(ResourceScope.PATIENT).toBe('patient');
      expect(ResourceScope.ACCOUNT).toBe('account');

      expect(getResourceScope(Resource.USER)).toBe(ResourceScope.USER);
      expect(getResourceScope(Resource.PREFERENCES)).toBe(ResourceScope.USER);
      expect(getResourceScope(Resource.CALENDAR_TOKEN)).toBe(ResourceScope.USER);

      expect(getResourceScope(Resource.ACCOUNT)).toBe(ResourceScope.ACCOUNT);
      expect(getResourceScope(Resource.PATIENT)).toBe(ResourceScope.ACCOUNT);
      expect(getResourceScope(Resource.ROLE)).toBe(ResourceScope.ACCOUNT);
      expect(getResourceScope(Resource.MEDICAL_SERVICE_SLOT)).toBe(ResourceScope.ACCOUNT);

      expect(getResourceScope(Resource.PATIENT_PUBLIC_PROPERTY)).toBe(ResourceScope.PATIENT);
      expect(getResourceScope(Resource.PATIENT_MEDICAL_PROPERTY)).toBe(ResourceScope.PATIENT);
    });

    it('should classify resources by owner with helpers', () => {
      expect(isUserResource(Resource.USER)).toBe(true);
      expect(isUserResource(Resource.CALENDAR_SETTINGS)).toBe(true);
      expect(isUserResource(Resource.PATIENT)).toBe(false);

      expect(isAccountResource(Resource.ACCOUNT)).toBe(true);
      expect(isAccountResource(Resource.PATIENT)).toBe(true);
      expect(isAccountResource(Resource.USER)).toBe(false);

      expect(isPatientResource(Resource.PATIENT_PUBLIC_PROPERTY)).toBe(true);
      expect(isPatientResource(Resource.PATIENT_MEDICAL_PROPERTY)).toBe(true);
      expect(isPatientResource(Resource.PATIENT)).toBe(false);
    });

    it('should return resources by owner', () => {
      const userResources = getResourcesByScope(ResourceScope.USER);
      expect(userResources).toContain(Resource.USER);
      expect(userResources).toContain(Resource.PREFERENCES);
      expect(userResources).not.toContain(Resource.PATIENT);

      const accountResources = getResourcesByScope(ResourceScope.ACCOUNT);
      expect(accountResources).toContain(Resource.PATIENT);
      expect(accountResources).toContain(Resource.ACCOUNT);
      expect(accountResources).not.toContain(Resource.USER);

      const patientResources = getResourcesByScope(ResourceScope.PATIENT);
      expect(patientResources).toContain(Resource.PATIENT_PUBLIC_PROPERTY);
      expect(patientResources).toContain(Resource.PATIENT_MEDICAL_PROPERTY);
      expect(patientResources).not.toContain(Resource.PATIENT);
    });

    it('should type resources by owner scope', () => {
      const userResources: ResourceForScope<ResourceScope.USER>[] = getResourcesByScope(ResourceScope.USER);
      const patientResources: ResourceForScope<ResourceScope.PATIENT>[] = getResourcesByScope(ResourceScope.PATIENT);

      // @ts-expect-error PATIENT is account-scoped, not user-scoped.
      const invalidUserResources: Resource.PATIENT[] = getResourcesByScope(ResourceScope.USER);

      expect(userResources).toContain(Resource.USER);
      expect(patientResources).toEqual([Resource.PATIENT_PUBLIC_PROPERTY, Resource.PATIENT_MEDICAL_PROPERTY]);
      expect(invalidUserResources).toContain(Resource.USER);
    });

    it('should expose USER_RESOURCES, ACCOUNT_RESOURCES and PATIENT_RESOURCES arrays', () => {
      expect(USER_RESOURCES).toContain(Resource.USER);
      expect(USER_RESOURCES).toContain(Resource.CALENDAR_TOKEN);
      expect(ACCOUNT_RESOURCES).toContain(Resource.PATIENT);
      expect(ACCOUNT_RESOURCES).toContain(Resource.ROLE);
      expect(PATIENT_RESOURCES).toContain(Resource.PATIENT_PUBLIC_PROPERTY);
      expect(PATIENT_RESOURCES).toContain(Resource.PATIENT_MEDICAL_PROPERTY);
      const allTagged = new Set([...USER_RESOURCES, ...ACCOUNT_RESOURCES, ...PATIENT_RESOURCES]);
      Object.values(Resource).forEach((r) => expect(allTagged.has(r)).toBe(true));
    });
  });

  describe('Action', () => {
    it('should expose requested core actions', () => {
      expect(Action.VIEW).toBe('VIEW');
      expect(Action.LIST).toBe('LIST');
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
      expect(getActionAccess(Action.LIST)).toBe(ActionAccess.READ);
      expect(getActionAccess(Action.UPDATE)).toBe(ActionAccess.WRITE);
      expect(isReadAction(Action.VIEW)).toBe(true);
      expect(isReadAction(Action.LIST)).toBe(true);
      expect(isWriteAction(Action.CREATE)).toBe(true);
      expect(getActionsByAccess(ActionAccess.READ)).toEqual([Action.VIEW, Action.LIST]);
      expect(getActionsByAccess(ActionAccess.WRITE)).toContain(Action.DELETE);
    });

    it('should type actions by access level', () => {
      const readActions: ActionForAccess<ActionAccess.READ>[] = getActionsByAccess(ActionAccess.READ);
      const writeActions: ActionForAccess<ActionAccess.WRITE>[] = getActionsByAccess(ActionAccess.WRITE);
      const viewAccess: ActionAccess.READ = getActionAccess(Action.VIEW);

      // @ts-expect-error CREATE is not a read action.
      const invalidReadActions: Action.CREATE[] = getActionsByAccess(ActionAccess.READ);

      expect(readActions).toEqual([Action.VIEW, Action.LIST]);
      expect(writeActions).toContain(Action.CREATE);
      expect(viewAccess).toBe(ActionAccess.READ);
      expect(invalidReadActions).toEqual([Action.VIEW, Action.LIST]);
    });
  });

  describe('Backend APIs', () => {
    it('should fetch all actions for a resource', () => {
      expect(getResourceActions(Resource.MEDICAL_SERVICE)).toEqual([
        Action.LIST,
        Action.VIEW,
        Action.CREATE,
        Action.UPDATE,
        Action.DELETE,
        Action.CHECK_IN,
        Action.COMPLETE,
        Action.CANCEL,
        Action.ASSIGN,
      ]);
      expect(getResourceActions(Resource.CALENDAR_TOKEN)).toEqual([Action.VIEW, Action.ROTATE, Action.GENERATE]);
      expect(getResourceActions(Resource.MEDICATION)).toEqual([Action.LIST]);
      expect(getResourceActions(Resource.MEDICAL_SERVICE_SLOT)).toEqual([Action.LIST]);
    });

    it('should type actions by resource', () => {
      const medicationActions: Action.LIST[] = getResourceActions(Resource.MEDICATION);
      const patientReadActions: AllowedActionForAccess<Resource.PATIENT, ActionAccess.READ>[] =
        getResourceActionsByAccess(Resource.PATIENT, ActionAccess.READ);

      // @ts-expect-error VIEW is not allowed on MEDICATION.
      const invalidMedicationActions: Action.VIEW[] = getResourceActions(Resource.MEDICATION);

      expect(medicationActions).toEqual([Action.LIST]);
      expect(patientReadActions).toEqual([Action.LIST, Action.VIEW]);
      expect(invalidMedicationActions).toEqual([Action.LIST]);
    });

    it('should fetch all resources for one category', () => {
      expect(getResourcesByCategory(ResourceCategory.CORE)).toEqual([Resource.ACCOUNT]);
      expect(getResourcesByCategory(ResourceCategory.SCHEDULING)).toEqual([Resource.MEDICAL_SERVICE_SLOT]);
      expect(getResourcesByCategory(ResourceCategory.SYSTEM)).toEqual([]);
    });

    it('should type resources by category', () => {
      const coreResources: ResourceForCategory<ResourceCategory.CORE>[] = getResourcesByCategory(ResourceCategory.CORE);
      const selectedResources: (Resource.ACCOUNT | Resource.MEDICAL_SERVICE_SLOT)[] = getResourcesByCategories([
        ResourceCategory.CORE,
        ResourceCategory.SCHEDULING,
      ] as const);

      // @ts-expect-error PATIENT is not a core resource.
      const invalidCoreResources: Resource.PATIENT[] = getResourcesByCategory(ResourceCategory.CORE);

      expect(coreResources).toEqual([Resource.ACCOUNT]);
      expect(selectedResources).toEqual([Resource.ACCOUNT, Resource.MEDICAL_SERVICE_SLOT]);
      expect(invalidCoreResources).toEqual([Resource.ACCOUNT]);
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
      expect(all[Resource.MEDICATION]).toEqual([Action.LIST]);
      expect(all[Resource.MEDICAL_SERVICE_SLOT]).toEqual([Action.LIST]);
      expect(all[Resource.CALENDAR_SYNC]).toEqual([Action.ENABLE, Action.DISABLE, Action.VIEW]);
    });

    it('should type full resource action maps', () => {
      const all: Readonly<ResourceActions> = getAllResourceActions();
      const allRead: Readonly<ResourceActionsByAccess<ActionAccess.READ>> = getAllResourceActionsByAccess(
        ActionAccess.READ,
      );
      const medicationActions: Action.LIST[] = all[Resource.MEDICATION];
      const patientReadActions: (Action.LIST | Action.VIEW)[] = allRead[Resource.PATIENT];

      // @ts-expect-error MEDICATION only allows LIST.
      const invalidMedicationActions: Action.VIEW[] = all[Resource.MEDICATION];

      expect(medicationActions).toEqual([Action.LIST]);
      expect(patientReadActions).toEqual([Action.LIST, Action.VIEW]);
      expect(invalidMedicationActions).toEqual([Action.LIST]);
    });

    it('should filter resource actions by access', () => {
      expect(getResourceActionsByAccess(Resource.PATIENT, ActionAccess.READ)).toEqual([Action.LIST, Action.VIEW]);
      expect(getResourceActionsByAccess(Resource.PATIENT, ActionAccess.WRITE)).toEqual([
        Action.CREATE,
        Action.UPDATE,
        Action.DELETE,
      ]);

      const allRead = getAllResourceActionsByAccess(ActionAccess.READ);
      expect(allRead[Resource.PATIENT]).toEqual([Action.LIST, Action.VIEW]);
      expect(allRead[Resource.MEDICATION]).toEqual([Action.LIST]);
      expect(allRead[Resource.MEDICAL_SERVICE_SLOT]).toEqual([Action.LIST]);
      expect(allRead[Resource.CALENDAR_SYNC]).toEqual([Action.VIEW]);
    });

    it('should build resource operations filtered by access', () => {
      const readOps = getResourceOperationsByAccess(Resource.PATIENT, ActionAccess.READ);
      const writeOps = getResourceOperationsByAccess(Resource.PATIENT, ActionAccess.WRITE);

      expect(readOps.map((op) => op.toString())).toEqual(['PATIENT:LIST', 'PATIENT:VIEW']);
      expect(writeOps.map((op) => op.toString())).toEqual(['PATIENT:CREATE', 'PATIENT:UPDATE', 'PATIENT:DELETE']);
    });

    it('should type resource operations filtered by access', () => {
      const readOps = getResourceOperationsByAccess(Resource.PATIENT, ActionAccess.READ);
      const typedReadOps: ResourceOperationForAccess<Resource.PATIENT, ActionAccess.READ>[] = readOps;
      const readOperationStrings: ('PATIENT:LIST' | 'PATIENT:VIEW')[] = readOps.map((op) => op.toString());

      // @ts-expect-error CREATE is filtered out of read operations.
      const invalidReadOps: Operation<Resource.PATIENT, Action.CREATE>[] = readOps;

      expect(typedReadOps.map((op) => op.toString())).toEqual(['PATIENT:LIST', 'PATIENT:VIEW']);
      expect(readOperationStrings).toEqual(['PATIENT:LIST', 'PATIENT:VIEW']);
      expect(invalidReadOps).toBe(readOps);
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

    it('should type generated operations from resource and action inputs', () => {
      const ops = generateOperationsForResources(
        [Resource.PATIENT, Resource.CALENDAR_TOKEN] as const,
        [Action.VIEW, Action.UPDATE, Action.ROTATE] as const,
      );
      const typedOps: GeneratedOperationFor<
        Resource.PATIENT | Resource.CALENDAR_TOKEN,
        Action.VIEW | Action.UPDATE | Action.ROTATE
      >[] = ops;

      const patientOps = generateOperationsForResources(
        [Resource.PATIENT] as const,
        [Action.VIEW, Action.ROTATE] as const,
      );
      const patientOnlyViewOps: Operation<Resource.PATIENT, Action.VIEW>[] = patientOps;
      const patientOperationStrings: 'PATIENT:VIEW'[] = patientOps.map((op) => op.toString());

      // @ts-expect-error ROTATE is filtered out of the generated PATIENT operations.
      const invalidPatientOps: Operation<Resource.PATIENT, Action.ROTATE>[] = patientOps;

      expect(typedOps.map((op) => op.toString())).toEqual([
        'PATIENT:VIEW',
        'PATIENT:UPDATE',
        'CALENDAR_TOKEN:VIEW',
        'CALENDAR_TOKEN:ROTATE',
      ]);
      expect(patientOnlyViewOps.map((op) => op.toString())).toEqual(['PATIENT:VIEW']);
      expect(patientOperationStrings).toEqual(['PATIENT:VIEW']);
      expect(invalidPatientOps).toBe(patientOps);
    });

    it('should ignore duplicate inputs when generating operations', () => {
      const ops = generateOperationsForResources([Resource.PATIENT, Resource.PATIENT], [Action.VIEW, Action.VIEW]);

      expect(ops.map((op) => op.toString())).toEqual(['PATIENT:VIEW']);
    });
  });

  describe('isValidOperation', () => {
    it('should return true for a valid resource:action pair', () => {
      expect(isValidOperation(Resource.PATIENT, Action.VIEW)).toBe(true);
      expect(isValidOperation(Resource.PATIENT, Action.CREATE)).toBe(true);
      expect(isValidOperation(Resource.MEDICATION, Action.LIST)).toBe(true);
      expect(isValidOperation(Resource.MEDICAL_SERVICE_SLOT, Action.LIST)).toBe(true);
      expect(isValidOperation(Resource.CALENDAR_TOKEN, Action.ROTATE)).toBe(true);
    });

    it('should return false for an action not allowed on the resource', () => {
      expect(isValidOperation(Resource.MEDICATION, Action.VIEW)).toBe(false);
      expect(isValidOperation(Resource.MEDICAL_SERVICE_SLOT, Action.VIEW)).toBe(false);
      expect(isValidOperation(Resource.CALENDAR_TOKEN, Action.DELETE)).toBe(false);
    });

    it('should narrow action type for a resource', () => {
      const action = Action.LIST as Action;

      if (isValidOperation(Resource.MEDICATION, action)) {
        const medicationAction: Action.LIST = action;
        expect(medicationAction).toBe(Action.LIST);
      } else {
        throw new Error('expected LIST to be valid for MEDICATION');
      }
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
    it('should expose allowed operation string unions', () => {
      const operations = ['PATIENT:VIEW', 'MEDICATION:LIST', 'MEDICAL_SERVICE:CHECK_IN'] satisfies AllowedOperation[];
      const patientOperation = 'PATIENT:DELETE' satisfies AllowedOperationFor<Resource.PATIENT>;

      expect(operations).toEqual(['PATIENT:VIEW', 'MEDICATION:LIST', 'MEDICAL_SERVICE:CHECK_IN']);
      expect(patientOperation).toBe('PATIENT:DELETE');
    });

    it('should reject invalid operation strings at compile time', () => {
      // @ts-expect-error MEDICATION only allows LIST.
      void ('MEDICATION:VIEW' satisfies AllowedOperation);
      // @ts-expect-error MEDICAL_SERVICE_SLOT only allows LIST.
      void ('MEDICAL_SERVICE_SLOT:CREATE' satisfies AllowedOperation);
      // @ts-expect-error Patient operation strings must start with PATIENT.
      void ('ROLE:CREATE' satisfies AllowedOperationFor<Resource.PATIENT>);
    });

    it('should create operation with factory helper', () => {
      const op = Operation.create(Resource.PATIENT, Action.VIEW);
      expect(op.toString()).toBe('PATIENT:VIEW');
    });

    it('should serialize and parse operation strings', () => {
      const op = new Operation(Resource.PATIENT, Action.VIEW);
      expect(op.toString()).toBe('PATIENT:VIEW');

      const parsed = Operation.fromString('PATIENT:VIEW');
      expect(parsed?.resource).toBe(Resource.PATIENT);
      expect(parsed?.action).toBe(Action.VIEW);
    });

    it('should type parsed literal operation strings', () => {
      const parsed = Operation.fromString('CALENDAR_TOKEN:ROTATE');
      const typedParsed: OperationFromString<'CALENDAR_TOKEN:ROTATE'> = parsed;
      const operationString: 'CALENDAR_TOKEN:ROTATE' = typedParsed.toString();
      const operationResource: ResourceFromOperation<'ROLE:CREATE'> = getResourceFromOperation('ROLE:CREATE');
      const operationAction: ActionFromOperation<'CALENDAR_TOKEN:ROTATE'> =
        getActionFromOperation('CALENDAR_TOKEN:ROTATE');

      expect(operationString).toBe('CALENDAR_TOKEN:ROTATE');
      expect(operationResource).toBe(Resource.ROLE);
      expect(operationAction).toBe(Action.ROTATE);
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
