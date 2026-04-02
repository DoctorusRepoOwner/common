import { Action } from './actions';
import { Operation } from './operation';
import { Resource } from './resources';

export type Locale = 'fr-FR' | 'us-EN';

const enAction: Record<Action, string> = {
  [Action.CREATE]: 'Create',
  [Action.READ]: 'Read',
  [Action.DELETE]: 'Delete',
  [Action.RETRIEVE]: 'Retrieve',
  [Action.UPDATE]: 'Update',
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
  [Action.SET_MEDICAL_SERVICE_STATUS]: 'Set Medical Service Status',
  [Action.SET_MEDICAL_SERVICE_FEES]: 'Set Medical Service Fees',
  [Action.CHECK_IN]: 'Check In',
  [Action.UNDO_CHECK_IN]: 'Undo Check In',
  [Action.START_SERVICE]: 'Start Service',
  [Action.UNSTART_SERVICE]: 'Undo Start Service',
  [Action.COMPLETE_SERVICE]: 'Complete Service',
  [Action.REOPEN_COMPLETED_SERVICE]: 'Reopen Completed Service',
  [Action.CANCEL_SERVICE]: 'Cancel Service',
  [Action.UNDO_CANCEL_SERVICE]: 'Undo Cancel Service',
  [Action.FORCE_RESET_STATUS]: 'Force Reset Status',
  [Action.CORRECT_TIMESTAMPS]: 'Correct Timestamps',
  [Action.UPDATE_STATUS]: 'Update Status',
  [Action.VIEW_PATIENTS]: 'View Patients',
  [Action.PUT_PATIENT_PAYMENT]: 'Put Patient Payment',
  [Action.DELETE_PATIENT_PAYMENT]: 'Delete Patient Payment',
  [Action.EXPORT]: 'Export',
  [Action.IMPORT]: 'Import',
  [Action.ARCHIVE]: 'Archive',
  [Action.RESTORE]: 'Restore',
  [Action.SHARE]: 'Share',
  [Action.DOWNLOAD]: 'Download',
  [Action.UPLOAD]: 'Upload',
  [Action.ENABLE_CALENDAR_SYNC]: 'Enable Calendar Sync',
  [Action.DISABLE_CALENDAR_SYNC]: 'Disable Calendar Sync',
  [Action.REGENERATE_CALENDAR_LINK]: 'Regenerate Calendar Link',
  [Action.LOGIN]: 'Login',
  [Action.LOGOUT]: 'Logout',
  [Action.CONFIGURE]: 'Configure',
  [Action.AUDIT]: 'Audit',
};

const frAction: Record<Action, string> = {
  [Action.CREATE]: 'Creer',
  [Action.READ]: 'Lire',
  [Action.DELETE]: 'Supprimer',
  [Action.RETRIEVE]: 'Recuperer',
  [Action.UPDATE]: 'Mettre a jour',
  [Action.PUT]: 'Mettre',
  [Action.LIST]: 'Lister',
  [Action.MANAGE]: 'Gerer',
  [Action.VIEW]: 'Voir',
  [Action.SEARCH]: 'Rechercher',
  [Action.GRANT]: 'Accorder',
  [Action.REVOKE]: 'Revoquer',
  [Action.PRESCRIBE]: 'Prescrire',
  [Action.DIAGNOSE]: 'Diagnostiquer',
  [Action.SCHEDULE]: 'Planifier',
  [Action.CANCEL]: 'Annuler',
  [Action.APPROVE]: 'Approuver',
  [Action.REJECT]: 'Rejeter',
  [Action.SIGN]: 'Signer',
  [Action.VERIFY]: 'Verifier',
  [Action.RECOVER]: 'Recuperer',
  [Action.DISABLE]: 'Desactiver',
  [Action.SET_MEDICAL_SERVICE_STATUS]: 'Definir le statut du service medical',
  [Action.SET_MEDICAL_SERVICE_FEES]: 'Definir les frais du service medical',
  [Action.CHECK_IN]: 'Enregistrement a l arrivee',
  [Action.UNDO_CHECK_IN]: 'Annuler l enregistrement',
  [Action.START_SERVICE]: 'Commencer le service',
  [Action.UNSTART_SERVICE]: 'Annuler le debut du service',
  [Action.COMPLETE_SERVICE]: 'Terminer le service',
  [Action.REOPEN_COMPLETED_SERVICE]: 'Reouvrir le service termine',
  [Action.CANCEL_SERVICE]: 'Annuler le service',
  [Action.UNDO_CANCEL_SERVICE]: 'Annuler l annulation du service',
  [Action.FORCE_RESET_STATUS]: 'Reinitialiser le statut',
  [Action.CORRECT_TIMESTAMPS]: 'Corriger les horodatages',
  [Action.UPDATE_STATUS]: 'Mettre a jour le statut',
  [Action.VIEW_PATIENTS]: 'Voir les patients',
  [Action.PUT_PATIENT_PAYMENT]: 'Enregistrer le paiement patient',
  [Action.DELETE_PATIENT_PAYMENT]: 'Supprimer le paiement patient',
  [Action.EXPORT]: 'Exporter',
  [Action.IMPORT]: 'Importer',
  [Action.ARCHIVE]: 'Archiver',
  [Action.RESTORE]: 'Restaurer',
  [Action.SHARE]: 'Partager',
  [Action.DOWNLOAD]: 'Telecharger',
  [Action.UPLOAD]: 'Televerser',
  [Action.ENABLE_CALENDAR_SYNC]: 'Activer la synchronisation du calendrier',
  [Action.DISABLE_CALENDAR_SYNC]: 'Desactiver la synchronisation du calendrier',
  [Action.REGENERATE_CALENDAR_LINK]: 'Regenerer le lien du calendrier',
  [Action.LOGIN]: 'Connexion',
  [Action.LOGOUT]: 'Deconnexion',
  [Action.CONFIGURE]: 'Configurer',
  [Action.AUDIT]: 'Auditer',
};

const frResourceOverrides: Partial<Record<Resource, string>> = {
  [Resource.ACCOUNT]: 'Compte',
  [Resource.ACCOUNT_GENERAL_SETTINGS]: 'Parametres generaux du compte',
  [Resource.ACCOUNT_LOCATION]: 'Lieu du compte',
  [Resource.ACCOUNT_PREFERENCES]: 'Preferences du compte',
  [Resource.ACCOUNT_SUMMARY]: 'Resume du compte',
  [Resource.AVAILABLE_SLOT]: 'Creneau disponible',
  [Resource.CALCULATED_MEASURE_MODEL]: 'Modele de mesure calculee',
  [Resource.CALENDAR_SYNC]: 'Synchronisation du calendrier',
  [Resource.CALENDAR_TOKEN]: 'Jeton de calendrier',
  [Resource.CONTACT]: 'Contact',
  [Resource.DOCUMENT_LAYOUT]: 'Mise en page du document',
  [Resource.DOCUMENT_MODEL]: 'Modele de document',
  [Resource.GENERATED_DOCUMENT]: 'Document genere',
  [Resource.LOG_RECORD]: 'Journal',
  [Resource.MEASURE_MODEL]: 'Modele de mesure',
  [Resource.MEDICAL_HISTORY]: 'Antecedents medicaux',
  [Resource.MEDICAL_HISTORY_MODEL]: "Modele d'antecedents medicaux",
  [Resource.MEDICAL_SERVICE]: 'Service medical',
  [Resource.MEDICAL_SERVICE_ASSIGNEES]: 'Assignations du service medical',
  [Resource.MEDICAL_SERVICE_DESCRIPTION]: 'Description du service medical',
  [Resource.MEDICAL_SERVICE_FEES]: 'Frais du service medical',
  [Resource.MEDICAL_SERVICE_LOCATION]: 'Lieu du service medical',
  [Resource.MEDICAL_SERVICE_NOTE]: 'Note du service medical',
  [Resource.MEDICAL_SERVICE_SCHEDULE]: 'Planning du service medical',
  [Resource.MEDICAL_SERVICE_STATUS]: 'Statut du service medical',
  [Resource.MEDICAL_SERVICE_TIMESTAMPS]: 'Horodatages du service medical',
  [Resource.MEMBERSHIP]: 'Adhesion',
  [Resource.MEDICATION]: 'Medicament',
  [Resource.OBSERVATION]: 'Observation',
  [Resource.PATIENT]: 'Patient',
  [Resource.PATIENT_MEDICAL_NOTES]: 'Notes medicales du patient',
  [Resource.PATIENT_MEDICAL_PROPERTIES]: 'Proprietes medicales du patient',
  [Resource.PATIENT_PAYMENT]: 'Paiement du patient',
  [Resource.PATIENT_PROFILE]: 'Profil du patient',
  [Resource.PATIENT_PUBLIC_PROPERTIES]: 'Proprietes publiques du patient',
  [Resource.PATIENT_STATUS]: 'Statut du patient',
  [Resource.PRESCRIPTION]: 'Ordonnance',
  [Resource.PRESCRIPTION_MODEL]: "Modele d'ordonnance",
  [Resource.TASK_TYPE]: 'Type de tache',
  [Resource.UPLOAD_DOCUMENT]: 'Document televerse',
  [Resource.USER]: 'Utilisateur',
  [Resource.USER_CALENDAR_PREFERENCES]: 'Preferences de calendrier utilisateur',
  [Resource.USER_PREFERENCES]: 'Preferences utilisateur',
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
