import { Action } from './actions';
import { Operation } from './operation';
import { Resource, ResourceCategory } from './resources';

export type Locale = 'fr-FR' | 'us-EN';

const enAction: Record<Action, string> = {
  [Action.CREATE]: 'Create',
  [Action.DELETE]: 'Delete',
  [Action.DISABLE]: 'Disable',
  [Action.ENABLE]: 'Enable',
  [Action.RECOVER]: 'Recover',
  [Action.TRANSFER_OWNERSHIP]: 'Transfer Ownership',
  [Action.VIEW]: 'View',
  [Action.UPDATE]: 'Update',

  [Action.ROTATE_TOKEN]: 'Rotate Token',
  [Action.GENERATE]: 'Generate',
  [Action.PREVIEW]: 'Preview',

  [Action.CANCEL]: 'Cancel',
  [Action.CHECK_IN]: 'Check In',
  [Action.COMPLETE]: 'Complete',
  [Action.REOPEN]: 'Reopen',
  [Action.RESET]: 'Reset',
  [Action.START]: 'Start',
  [Action.UNDO_CANCEL]: 'Undo Cancel',
  [Action.UNDO_CHECK_IN]: 'Undo Check In',
  [Action.UNSTART]: 'Unstart',

  [Action.ASSIGN]: 'Assign',
  [Action.UPDATE_STATUS]: 'Update Status',
  [Action.UPDATE_SCHEDULE]: 'Update Schedule',
  [Action.CORRECT_TIMESTAMPS]: 'Correct Timestamps',
  [Action.UPDATE_TYPE]: 'Update Type',

  [Action.SEARCH]: 'Search',
  [Action.ASSIGN_ROLES]: 'Assign Roles',
  [Action.INVITE]: 'Invite',
  [Action.REMOVE]: 'Remove',
  [Action.UPLOAD]: 'Upload',
};

const frAction: Record<Action, string> = {
  [Action.CREATE]: 'Creer',
  [Action.DELETE]: 'Supprimer',
  [Action.DISABLE]: 'Desactiver',
  [Action.ENABLE]: 'Activer',
  [Action.RECOVER]: 'Recuperer',
  [Action.TRANSFER_OWNERSHIP]: 'Transferer la propriete',
  [Action.VIEW]: 'Voir',
  [Action.UPDATE]: 'Mettre a jour',

  [Action.ROTATE_TOKEN]: 'Renouveler le jeton',
  [Action.GENERATE]: 'Generer',
  [Action.PREVIEW]: 'Previsualiser',

  [Action.CANCEL]: 'Annuler',
  [Action.CHECK_IN]: 'Enregistrer l arrivee',
  [Action.COMPLETE]: 'Terminer',
  [Action.REOPEN]: 'Reouvrir',
  [Action.RESET]: 'Reinitialiser',
  [Action.START]: 'Demarrer',
  [Action.UNDO_CANCEL]: 'Annuler l annulation',
  [Action.UNDO_CHECK_IN]: 'Annuler l enregistrement',
  [Action.UNSTART]: 'Annuler le demarrage',

  [Action.ASSIGN]: 'Assigner',
  [Action.CORRECT_TIMESTAMPS]: 'Corriger les horodatages',
  [Action.UPDATE_STATUS]: 'Mettre a jour le statut',
  [Action.UPDATE_SCHEDULE]: 'Mettre a jour le planning',
  [Action.UPDATE_TYPE]: 'Mettre a jour le type',

  [Action.SEARCH]: 'Rechercher',
  [Action.ASSIGN_ROLES]: 'Assigner les roles',
  [Action.INVITE]: 'Inviter',
  [Action.REMOVE]: 'Retirer',
  [Action.UPLOAD]: 'Televerser',
};

const frResourceOverrides: Partial<Record<Resource, string>> = {
  [Resource.ACCOUNT]: 'Compte',
  [Resource.CALCULATED_MEASURE_MODEL]: 'Modele de mesure calculee',
  [Resource.CALENDAR_SETTINGS]: 'Parametres du calendrier',
  [Resource.CALENDAR_SYNC]: 'Synchronisation du calendrier',
  [Resource.CALENDAR_TOKEN]: 'Jeton de calendrier',
  [Resource.DOCUMENT_LAYOUT]: 'Mise en page du document',
  [Resource.DOCUMENT_MODEL]: 'Modele de document',
  [Resource.GENERAL_SETTINGS]: 'Parametres generaux',
  [Resource.GENERATED_DOCUMENT]: 'Document genere',
  [Resource.LOG_RECORDS]: 'Journaux',
  [Resource.LOCATION]: 'Lieu',
  [Resource.MEASURE_MODEL]: 'Modele de mesure',
  [Resource.MEDICATION_SEARCH]: 'Recherche de medicaments',
  [Resource.MEDICAL_HISTORY]: 'Antecedents medicaux',
  [Resource.MEDICAL_HISTORY_MODEL]: "Modele d'antecedents medicaux",
  [Resource.MEDICAL_SERVICE]: 'Service medical',
  [Resource.MEDICAL_SERVICE_NOTE]: 'Note du service medical',
  [Resource.MEMBERSHIP]: 'Adhesion',
  [Resource.OBSERVATION]: 'Observation',
  [Resource.PATIENT]: 'Patient',
  [Resource.PATIENT_PAYMENT]: 'Paiement du patient',
  [Resource.PREFERENCES]: 'Preferences',
  [Resource.PRESCRIPTION]: 'Ordonnance',
  [Resource.PRESCRIPTION_MODEL]: "Modele d'ordonnance",
  [Resource.TASK_TYPE]: 'Type de tache',
  [Resource.UPLOAD_DOCUMENT]: 'Document televerse',
  [Resource.USER]: 'Utilisateur',
  [Resource.AVAILABLE_SLOTS]: 'Creneaux disponibles',
};

const enResourceCategory: Record<ResourceCategory, string> = {
  [ResourceCategory.CORE]: 'Core',
  [ResourceCategory.CLINICAL]: 'Clinical',
  [ResourceCategory.DOCUMENTS]: 'Documents',
  [ResourceCategory.BILLING]: 'Billing',
  [ResourceCategory.MEMBERSHIP]: 'Membership',
  [ResourceCategory.INTEGRATION]: 'Integration',
  [ResourceCategory.SETTINGS]: 'Settings',
  [ResourceCategory.SCHEDULING]: 'Scheduling',
  [ResourceCategory.EXTERNAL]: 'External',
  [ResourceCategory.SYSTEM]: 'System',
};

const frResourceCategory: Record<ResourceCategory, string> = {
  [ResourceCategory.CORE]: 'Noyau',
  [ResourceCategory.CLINICAL]: 'Clinique',
  [ResourceCategory.DOCUMENTS]: 'Documents',
  [ResourceCategory.BILLING]: 'Facturation',
  [ResourceCategory.MEMBERSHIP]: 'Adhesion',
  [ResourceCategory.INTEGRATION]: 'Integration',
  [ResourceCategory.SETTINGS]: 'Parametres',
  [ResourceCategory.SCHEDULING]: 'Planification',
  [ResourceCategory.EXTERNAL]: 'Externe',
  [ResourceCategory.SYSTEM]: 'Systeme',
};

function humanizeKey(key: string): string {
  return key
    .toLowerCase()
    .split('_')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

export function getActionLabel(action: Action, locale: Locale = 'us-EN'): string {
  return locale === 'fr-FR' ? frAction[action] : enAction[action];
}

export function getResourceLabel(resource: Resource, locale: Locale = 'us-EN'): string {
  if (locale === 'fr-FR') return frResourceOverrides[resource] ?? humanizeKey(resource);
  return humanizeKey(resource);
}

export function getResourceCategoryLabel(category: ResourceCategory, locale: Locale = 'us-EN'): string {
  return locale === 'fr-FR' ? frResourceCategory[category] : enResourceCategory[category];
}

export function getOperationLabel(
  operation: Operation | string,
  locale: Locale = 'us-EN',
  opts?: { order?: 'action-resource' | 'resource-action'; separator?: string },
): string {
  const order = opts?.order ?? 'action-resource';
  const sep = opts?.separator ?? ' ';

  const op = typeof operation === 'string' ? Operation.fromString(operation) : operation;
  if (!op) return '';
  const a = getActionLabel(op.action, locale);
  const r = getResourceLabel(op.resource, locale);
  return order === 'resource-action' ? `${r}${sep}${a}` : `${a}${sep}${r}`;
}
