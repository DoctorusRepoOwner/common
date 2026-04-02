import { Action } from '../src/operations/actions';
import { getActionLabel, getOperationLabel, getResourceLabel } from '../src/operations/labels';
import { Operation } from '../src/operations/operation';
import { Resource } from '../src/operations/resources';

describe('Operations Labels (i18n)', () => {
  it('should label actions in English (us-EN)', () => {
    expect(getActionLabel(Action.RETRIEVE, 'us-EN')).toBe('Retrieve');
    expect(getActionLabel(Action.UPDATE, 'us-EN')).toBe('Update');
    expect(getActionLabel(Action.CREATE, 'us-EN')).toBe('Create');
    expect(getActionLabel(Action.CHECK_IN, 'us-EN')).toBe('Check In');
  });

  it('should label actions in French (fr-FR)', () => {
    expect(getActionLabel(Action.RETRIEVE, 'fr-FR')).toBe('Recuperer');
    expect(getActionLabel(Action.UPDATE, 'fr-FR')).toBe('Mettre a jour');
    expect(getActionLabel(Action.CREATE, 'fr-FR')).toBe('Creer');
    expect(getActionLabel(Action.CHECK_IN, 'fr-FR')).toBe('Enregistrement a l arrivee');
  });

  it('should label resources in English (us-EN)', () => {
    expect(getResourceLabel(Resource.PATIENT, 'us-EN')).toBe('Patient');
    expect(getResourceLabel(Resource.ACCOUNT_LOCATION, 'us-EN')).toBe('Account Location');
  });

  it('should label resources with French overrides (fr-FR)', () => {
    expect(getResourceLabel(Resource.ACCOUNT, 'fr-FR')).toBe('Compte');
    expect(getResourceLabel(Resource.ACCOUNT_LOCATION, 'fr-FR')).toBe('Lieu du compte');
    expect(getResourceLabel(Resource.PATIENT, 'fr-FR')).toBe('Patient');
  });

  it('should format operation labels from Operation object (locale variants)', () => {
    const op = new Operation(Resource.PATIENT, Action.RETRIEVE);
    expect(getOperationLabel(op, 'us-EN')).toBe('Retrieve Patient');
    expect(getOperationLabel(op, 'fr-FR')).toBe('Recuperer Patient');
  });

  it('should format operation labels from string (locale variants)', () => {
    expect(getOperationLabel('PATIENT:RETRIEVE', 'us-EN')).toBe('Retrieve Patient');
    expect(getOperationLabel('PATIENT:RETRIEVE', 'fr-FR')).toBe('Recuperer Patient');
  });

  it('should support resource-action order', () => {
    const op = new Operation(Resource.PATIENT, Action.CREATE);
    expect(getOperationLabel(op, 'us-EN', { order: 'resource-action' })).toBe('Patient Create');
  });
});
