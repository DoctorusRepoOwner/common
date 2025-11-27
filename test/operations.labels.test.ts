import { Action } from '../src/operations/actions';
import { getActionLabel, getOperationLabel, getResourceLabel } from '../src/operations/labels';
import { Operation } from '../src/operations/operation';
import { Resource } from '../src/operations/resources';

describe('Operations Labels (i18n)', () => {
  it('should label actions in English (us-EN)', () => {
    expect(getActionLabel(Action.READ, 'us-EN')).toBe('Read');
    expect(getActionLabel(Action.UPDATE, 'us-EN')).toBe('Update');
    expect(getActionLabel(Action.PRESCRIBE, 'us-EN')).toBe('Prescribe');
  });

  it('should label actions in French (fr-FR)', () => {
    expect(getActionLabel(Action.READ, 'fr-FR')).toBe('Lire');
    expect(getActionLabel(Action.UPDATE, 'fr-FR')).toBe('Mettre à jour');
    expect(getActionLabel(Action.PRESCRIBE, 'fr-FR')).toBe('Prescrire');
  });

  it('should label resources (fallback humanized) in English (us-EN)', () => {
    expect(getResourceLabel(Resource.PATIENT, 'us-EN')).toBe('Patient');
    expect(getResourceLabel(Resource.ACCOUNT_OWNERSHIP, 'us-EN')).toBe('Account Ownership');
  });

  it('should label resources with French overrides (fr-FR)', () => {
    expect(getResourceLabel(Resource.ACCOUNT, 'fr-FR')).toBe('Compte');
    expect(getResourceLabel(Resource.ACCOUNT_OWNERSHIP, 'fr-FR')).toBe('Propriété du compte');
    expect(getResourceLabel(Resource.PATIENT, 'fr-FR')).toBe('Patient');
  });

  it('should format operation labels from Operation object (locale variants)', () => {
    const op = new Operation(Resource.PATIENT, Action.READ);
    expect(getOperationLabel(op, 'us-EN')).toBe('Read Patient');
    expect(getOperationLabel(op, 'fr-FR')).toBe('Lire Patient');
  });

  it('should format operation labels from string (locale variants)', () => {
    expect(getOperationLabel('PATIENT:READ', 'us-EN')).toBe('Read Patient');
    expect(getOperationLabel('PATIENT:READ', 'fr-FR')).toBe('Lire Patient');
  });

  it('should support resource-action order', () => {
    const op = new Operation(Resource.PATIENT, Action.CREATE);
    expect(getOperationLabel(op, 'us-EN', { order: 'resource-action' })).toBe('Patient Create');
  });
});
