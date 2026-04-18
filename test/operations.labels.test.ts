import { Action } from '../src/operations/actions';
import {
  getActionLabel,
  getOperationLabel,
  getResourceCategoryLabel,
  getResourceLabel,
} from '../src/operations/labels';
import { Operation } from '../src/operations/operation';
import { Resource, ResourceCategory } from '../src/operations/resources';

describe('Operations Labels (i18n)', () => {
  it('should label actions in English (us-EN)', () => {
    expect(getActionLabel(Action.VIEW, 'us-EN')).toBe('View');
    expect(getActionLabel(Action.UPDATE, 'us-EN')).toBe('Update');
    expect(getActionLabel(Action.CREATE, 'us-EN')).toBe('Create');
    expect(getActionLabel(Action.CHECK_IN, 'us-EN')).toBe('Check In');
    expect(getActionLabel(Action.TRANSFER_OWNERSHIP, 'us-EN')).toBe('Transfer Ownership');
  });

  it('should label actions in French (fr-FR)', () => {
    expect(getActionLabel(Action.VIEW, 'fr-FR')).toBe('Voir');
    expect(getActionLabel(Action.UPDATE, 'fr-FR')).toBe('Mettre a jour');
    expect(getActionLabel(Action.CREATE, 'fr-FR')).toBe('Creer');
    expect(getActionLabel(Action.CHECK_IN, 'fr-FR')).toBe('Enregistrer l arrivee');
    expect(getActionLabel(Action.INVITE, 'fr-FR')).toBe('Inviter');
  });

  it('should label resources in English (us-EN)', () => {
    expect(getResourceLabel(Resource.PATIENT, 'us-EN')).toBe('Patient');
    expect(getResourceLabel(Resource.GENERAL_SETTINGS, 'us-EN')).toBe('General Settings');
    expect(getResourceLabel(Resource.AVAILABLE_SLOTS, 'us-EN')).toBe('Available Slots');
  });

  it('should label resources with French overrides (fr-FR)', () => {
    expect(getResourceLabel(Resource.ACCOUNT, 'fr-FR')).toBe('Compte');
    expect(getResourceLabel(Resource.LOCATION, 'fr-FR')).toBe('Lieu');
    expect(getResourceLabel(Resource.CALENDAR_TOKEN, 'fr-FR')).toBe('Jeton de calendrier');
    expect(getResourceLabel(Resource.PATIENT, 'fr-FR')).toBe('Patient');
  });

  it('should format operation labels from Operation object (locale variants)', () => {
    const op = new Operation(Resource.PATIENT, Action.VIEW);
    expect(getOperationLabel(op, 'us-EN')).toBe('View Patient');
    expect(getOperationLabel(op, 'fr-FR')).toBe('Voir Patient');
  });

  it('should format operation labels from string (locale variants)', () => {
    expect(getOperationLabel('PATIENT:VIEW', 'us-EN')).toBe('View Patient');
    expect(getOperationLabel('PATIENT:VIEW', 'fr-FR')).toBe('Voir Patient');
  });

  it('should support resource-action order', () => {
    const op = new Operation(Resource.CALENDAR_TOKEN, Action.ROTATE);
    expect(getOperationLabel(op, 'us-EN', { order: 'resource-action' })).toBe('Calendar Token Rotate');
  });

  it('should label resource categories in English and French', () => {
    expect(getResourceCategoryLabel(ResourceCategory.CLINICAL, 'us-EN')).toBe('Clinical');
    expect(getResourceCategoryLabel(ResourceCategory.CLINICAL, 'fr-FR')).toBe('Clinique');
    expect(getResourceCategoryLabel(ResourceCategory.SETTINGS, 'us-EN')).toBe('Settings');
    expect(getResourceCategoryLabel(ResourceCategory.SETTINGS, 'fr-FR')).toBe('Parametres');
  });
});
