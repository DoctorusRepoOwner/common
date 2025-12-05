import { Action } from './actions';
import { Operation } from './operation';
import { Resource } from './resources';

// Core i18n locale type (only support these explicit codes)
export type Locale = 'fr-FR' | 'us-EN';

const enAction: Partial<Record<Action, string>> = {
  [Action.CREATE]: 'Create',
  [Action.READ]: 'Read',
  [Action.UPDATE]: 'Update',
  [Action.DELETE]: 'Delete',
  [Action.PUT]: 'Put',
  [Action.LIST]: 'List',
  [Action.MANAGE]: 'Manage',
  [Action.VIEW]: 'View',
  [Action.SEARCH]: 'Search',
  [Action.GRANT]: 'Grant',
  [Action.REVOKE]: 'Revoke',
  [Action.PRESCRIBE]: 'Prescribe',
  [Action.DIAGNOSE]: 'Diagnose',
  [Action.SCHEDULE]: 'Schedule',
  [Action.CANCEL]: 'Cancel',
  [Action.APPROVE]: 'Approve',
  [Action.REJECT]: 'Reject',
  [Action.SIGN]: 'Sign',
  [Action.VERIFY]: 'Verify',
  [Action.RECOVER]: 'Recover',
  [Action.DISABLE]: 'Disable',
  [Action.SET_MEDICAL_SERVICE_STATUS]: 'Set medical service status',
  [Action.SET_MEDICAL_SERVICE_FEES]: 'Set medical service fees',
  [Action.UPDATE_STATUS]: 'Update status',
  [Action.VIEW_PATIENTS]: 'View patients',
  [Action.PUT_PATIENT_PAYMENT]: 'Put patient payment',
  [Action.DELETE_PATIENT_PAYMENT]: 'Delete patient payment',
  [Action.EXPORT]: 'Export',
  [Action.IMPORT]: 'Import',
  [Action.ARCHIVE]: 'Archive',
  [Action.RESTORE]: 'Restore',
  [Action.SHARE]: 'Share',
  [Action.DOWNLOAD]: 'Download',
  [Action.UPLOAD]: 'Upload',
  [Action.LOGIN]: 'Login',
  [Action.LOGOUT]: 'Logout',
  [Action.CONFIGURE]: 'Configure',
  [Action.AUDIT]: 'Audit',
};

const frAction: Partial<Record<Action, string>> = {
  [Action.CREATE]: 'Créer',
  [Action.READ]: 'Lire',
  [Action.UPDATE]: 'Mettre à jour',
  [Action.DELETE]: 'Supprimer',
  [Action.PUT]: 'Mettre',
  [Action.LIST]: 'Lister',
  [Action.MANAGE]: 'Gérer',
  [Action.VIEW]: 'Voir',
  [Action.SEARCH]: 'Rechercher',
  [Action.GRANT]: 'Accorder',
  [Action.REVOKE]: 'Révoquer',
  [Action.PRESCRIBE]: 'Prescrire',
  [Action.DIAGNOSE]: 'Diagnostiquer',
  [Action.SCHEDULE]: 'Planifier',
  [Action.CANCEL]: 'Annuler',
  [Action.APPROVE]: 'Approuver',
  [Action.REJECT]: 'Rejeter',
  [Action.SIGN]: 'Signer',
  [Action.VERIFY]: 'Vérifier',
  [Action.RECOVER]: 'Récupérer',
  [Action.DISABLE]: 'Désactiver',
  [Action.SET_MEDICAL_SERVICE_STATUS]: 'Définir le statut du service médical',
  [Action.SET_MEDICAL_SERVICE_FEES]: 'Définir les frais du service médical',
  [Action.UPDATE_STATUS]: 'Mettre à jour le statut',
  [Action.VIEW_PATIENTS]: 'Voir les patients',
  [Action.PUT_PATIENT_PAYMENT]: 'Enregistrer le paiement patient',
  [Action.DELETE_PATIENT_PAYMENT]: 'Supprimer le paiement patient',
  [Action.EXPORT]: 'Exporter',
  [Action.IMPORT]: 'Importer',
  [Action.ARCHIVE]: 'Archiver',
  [Action.RESTORE]: 'Restaurer',
  [Action.SHARE]: 'Partager',
  [Action.DOWNLOAD]: 'Télécharger',
  [Action.UPLOAD]: 'Téléverser',
  [Action.LOGIN]: 'Connexion',
  [Action.LOGOUT]: 'Déconnexion',
  [Action.CONFIGURE]: 'Configurer',
  [Action.AUDIT]: 'Auditer',
};

// For resources we provide a few explicit French overrides and default to humanized names
const frResourceOverrides: Partial<Record<Resource, string>> = {
  [Resource.ACCOUNT]: 'Compte',
  [Resource.ACCOUNT_OWNERSHIP]: 'Propriété du compte',
  [Resource.ACCOUNT_PREFERENCES]: 'Préférences du compte',
  [Resource.USER]: 'Utilisateur',
  [Resource.CONTACT]: 'Contact',
  [Resource.PATIENT]: 'Patient',
  [Resource.PATIENT_MEDICAL_NOTES]: 'Notes médicales du patient',
  [Resource.PATIENT_MEDICAL_PROPERTIES]: 'Propriétés médicales du patient',
  [Resource.PATIENT_PUBLIC_PROPERTIES]: 'Propriétés publiques du patient',
  [Resource.PATIENT_PAYMENT]: 'Paiement du patient',
  [Resource.MEDICAL_SERVICE]: 'Service médical',
  [Resource.MEDICAL_SERVICE_NOTE]: 'Note du service médical',
  [Resource.MEDICAL_SERVICE_SCHEDULE]: 'Planification du service médical',
  [Resource.MEDICAL_SERVICE_FEES]: 'Frais du service médical',
  [Resource.MEDICAL_SERVICE_STATUS]: 'Statut du service médical',
  [Resource.MEDICAL_NOTE]: 'Note médicale',
  [Resource.MEDICAL_RECORD]: 'Dossier médical',
  [Resource.MEDICAL_HISTORY]: 'Antécédents médicaux',
  [Resource.MEDICAL_HISTORY_MODEL]: "Modèle d'antécédents médicaux",
  [Resource.PRESCRIPTION]: 'Ordonnance',
  [Resource.PRESCRIPTION_MODEL]: "Modèle d'ordonnance",
  [Resource.DIAGNOSIS]: 'Diagnostic',
  [Resource.OBSERVATION]: 'Observation',
  [Resource.MEDICATION]: 'Médication',
  [Resource.ALLERGY]: 'Allergie',
  [Resource.IMMUNIZATION]: 'Vaccination',
  [Resource.PROCEDURE]: 'Procédure',
  [Resource.CLINICAL_NOTE]: 'Note clinique',
  [Resource.VITAL_SIGNS]: 'Signes vitaux',
  [Resource.MEASURE_MODEL]: 'Modèle de mesure',
  [Resource.CALCULATED_MEASURE_MODEL]: 'Modèle de mesure calculée',
  [Resource.UPLOADED_DOCUMENT]: 'Document téléversé',
  [Resource.DOCUMENT_LAYOUT]: 'Mise en page du document',
  [Resource.GENERATED_DOCUMENT]: 'Document généré',
  [Resource.DOCUMENT_MODEL]: 'Modèle de document',
  [Resource.SNIPPET]: 'Extrait',
  [Resource.LOCATION]: 'Lieu',
  [Resource.TASK_TYPE]: 'Type de tâche',
  [Resource.LAB_RESULT]: 'Résultat de laboratoire',
  [Resource.IMAGING]: 'Imagerie',
  [Resource.MEMBERSHIP]: 'Adhésion',
  [Resource.SETTINGS]: 'Paramètres',
  [Resource.NOTIFICATION]: 'Notification',
  [Resource.REPORT]: 'Rapport',
  [Resource.AUDIT_LOG]: "Journal d'audit",
  [Resource.SYSTEM]: 'Système',
  [Resource.PUBLIC_RESOURCE]: 'Ressource publique',
  [Resource.MEDICAL_RESOURCE]: 'Ressource médicale',
};

function humanizeKey(key: string): string {
  return key
    .toLowerCase()
    .split('_')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

export function getActionLabel(action: Action, locale: Locale = 'us-EN'): string {
  if (locale === 'fr-FR') return frAction[action] ?? humanizeKey(action);
  return enAction[action] ?? humanizeKey(action);
}

export function getResourceLabel(resource: Resource, locale: Locale = 'us-EN'): string {
  if (locale === 'fr-FR') return frResourceOverrides[resource] ?? humanizeKey(resource);
  return humanizeKey(resource);
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
