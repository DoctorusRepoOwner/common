import { Action } from './actions';
import { Operation } from './operation';
import { Resource, ResourceCategory } from './resources';

export type Locale = 'fr-FR' | 'us-EN';

const enAction: Record<Action, string> = {
  [Action.CREATE]: 'Create',
  [Action.VIEW]: 'View',
  [Action.UPDATE]: 'Update',
  [Action.DELETE]: 'Delete',
  [Action.ASSIGN]: 'Assign',
  [Action.CANCEL]: 'Cancel',
  [Action.CHECK_IN]: 'Check In',
  [Action.COMPLETE]: 'Complete',
  [Action.DISABLE]: 'Disable',
  [Action.ENABLE]: 'Enable',
  [Action.GENERATE]: 'Generate',
  [Action.INVITE]: 'Invite',
  [Action.UPSERT]: 'Create or Update',
  [Action.ROTATE]: 'Rotate',
  [Action.TRANSFER_OWNERSHIP]: 'Transfer Ownership',
};

const frAction: Record<Action, string> = {
  [Action.CREATE]: 'Creer',
  [Action.VIEW]: 'Voir',
  [Action.UPDATE]: 'Mettre a jour',
  [Action.DELETE]: 'Supprimer',
  [Action.ASSIGN]: 'Assigner',
  [Action.CANCEL]: 'Annuler',
  [Action.CHECK_IN]: 'Enregistrer l arrivee',
  [Action.COMPLETE]: 'Terminer',
  [Action.DISABLE]: 'Desactiver',
  [Action.ENABLE]: 'Activer',
  [Action.GENERATE]: 'Generer',
  [Action.INVITE]: 'Inviter',
  [Action.UPSERT]: 'Creer ou mettre a jour',
  [Action.ROTATE]: 'Tourner',
  [Action.TRANSFER_OWNERSHIP]: 'Transferer la propriete',
};

const frResourceOverrides: Partial<Record<Resource, string>> = {
  [Resource.ACCOUNT]: 'Compte',
  [Resource.CALCULATED_MEASURE_MODEL]: 'Modele de mesure calculee',
  [Resource.CALENDAR_SETTINGS]: 'Parametres du calendrier',
  [Resource.CALENDAR_SYNC]: 'Synchronisation du calendrier',
  [Resource.CALENDAR_TOKEN]: 'Jeton de calendrier',
  [Resource.CONTACT]: 'Contact',
  [Resource.DOCUMENT_LAYOUT]: 'Mise en page du document',
  [Resource.DOCUMENT_MODEL]: 'Modele de document',
  [Resource.GENERAL_SETTINGS]: 'Parametres generaux',
  [Resource.GENERATED_DOCUMENT]: 'Document genere',
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
  [Resource.PATIENT_MEDICAL_NOTE]: 'Note medicale patient',
  [Resource.PATIENT_PAYMENT]: 'Paiement du patient',
  [Resource.PATIENT_PROPERTY_MODEL]: 'Modele de propriete patient',
  [Resource.PREFERENCES]: 'Preferences',
  [Resource.PRESCRIPTION]: 'Ordonnance',
  [Resource.PRESCRIPTION_MODEL]: "Modele d'ordonnance",
  [Resource.ROLE]: 'Role',
  [Resource.TASK_TYPE]: 'Type de tache',
  [Resource.UPLOAD_DOCUMENT]: 'Document televerse',
  [Resource.USER]: 'Utilisateur',
  [Resource.AVAILABLE_SLOTS]: 'Creneaux disponibles',
};

const enResourceCategory: Record<ResourceCategory, string> = {
  [ResourceCategory.CORE]: 'Core',
  [ResourceCategory.MEMBERSHIP]: 'Membership',
  [ResourceCategory.CLINICAL]: 'Clinical',
  [ResourceCategory.DOCUMENTS]: 'Documents',
  [ResourceCategory.SETTINGS]: 'Settings',
  [ResourceCategory.INTEGRATION]: 'Integration',
  [ResourceCategory.SCHEDULING]: 'Scheduling',
  [ResourceCategory.EXTERNAL]: 'External',
  [ResourceCategory.SYSTEM]: 'System',
};

const frResourceCategory: Record<ResourceCategory, string> = {
  [ResourceCategory.CORE]: 'Noyau',
  [ResourceCategory.MEMBERSHIP]: 'Adhesion',
  [ResourceCategory.CLINICAL]: 'Clinique',
  [ResourceCategory.DOCUMENTS]: 'Documents',
  [ResourceCategory.SETTINGS]: 'Parametres',
  [ResourceCategory.INTEGRATION]: 'Integration',
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
