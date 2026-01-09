import {
  BooleanStatus,
  BOOLEAN_STATUS_METADATA,
  BOOLEAN_METADATA_REGISTRY,
  getStatusMetadataForFeature,
  getStatusIconForFeature,
  getStatusColorForFeature,
  getStatusLabelForFeature,
  getStatusDescriptionForFeature,
  getAllStatusesForFeature,
  getAllStatusMetadataForFeature,
} from '../src/status';

describe('Boolean Status', () => {
  describe('BooleanStatus enum', () => {
    it('should have TRUE and FALSE values', () => {
      expect(BooleanStatus.TRUE).toBe('true');
      expect(BooleanStatus.FALSE).toBe('false');
    });
  });

  describe('BOOLEAN_STATUS_METADATA', () => {
    it('should have metadata for both TRUE and FALSE', () => {
      expect(BOOLEAN_STATUS_METADATA[BooleanStatus.TRUE]).toBeDefined();
      expect(BOOLEAN_STATUS_METADATA[BooleanStatus.FALSE]).toBeDefined();
    });

    it('should have all required fields for TRUE', () => {
      const trueMetadata = BOOLEAN_STATUS_METADATA[BooleanStatus.TRUE];
      expect(trueMetadata.icon).toBe('check_circle');
      expect(trueMetadata.color).toBe('#4CAF50');
      expect(trueMetadata.label.short['us-EN']).toBe('Yes');
      expect(trueMetadata.label.short['fr-FR']).toBe('Oui');
      expect(trueMetadata.label.long['us-EN']).toBe('Active');
      expect(trueMetadata.label.long['fr-FR']).toBe('Actif');
      expect(trueMetadata.description['us-EN']).toBeTruthy();
      expect(trueMetadata.description['fr-FR']).toBeTruthy();
    });

    it('should have all required fields for FALSE', () => {
      const falseMetadata = BOOLEAN_STATUS_METADATA[BooleanStatus.FALSE];
      expect(falseMetadata.icon).toBe('cancel');
      expect(falseMetadata.color).toBe('#F44336');
      expect(falseMetadata.label.short['us-EN']).toBe('No');
      expect(falseMetadata.label.short['fr-FR']).toBe('Non');
      expect(falseMetadata.label.long['us-EN']).toBe('Inactive');
      expect(falseMetadata.label.long['fr-FR']).toBe('Inactif');
      expect(falseMetadata.description['us-EN']).toBeTruthy();
      expect(falseMetadata.description['fr-FR']).toBeTruthy();
    });
  });

  describe('BOOLEAN_METADATA_REGISTRY', () => {
    describe('yesNo preset', () => {
      it('should have correct labels', () => {
        const yesNoMetadata = BOOLEAN_METADATA_REGISTRY.yesNo;
        expect(yesNoMetadata[BooleanStatus.TRUE].label.short['us-EN']).toBe('Yes');
        expect(yesNoMetadata[BooleanStatus.TRUE].label.long['us-EN']).toBe('Yes');
        expect(yesNoMetadata[BooleanStatus.FALSE].label.short['us-EN']).toBe('No');
        expect(yesNoMetadata[BooleanStatus.FALSE].label.long['us-EN']).toBe('No');
        expect(yesNoMetadata[BooleanStatus.TRUE].label.short['fr-FR']).toBe('Oui');
        expect(yesNoMetadata[BooleanStatus.FALSE].label.short['fr-FR']).toBe('Non');
      });

      it('should have correct icons and colors', () => {
        const yesNoMetadata = BOOLEAN_METADATA_REGISTRY.yesNo;
        expect(yesNoMetadata[BooleanStatus.TRUE].icon).toBe('check_circle');
        expect(yesNoMetadata[BooleanStatus.TRUE].color).toBe('#4CAF50');
        expect(yesNoMetadata[BooleanStatus.FALSE].icon).toBe('cancel');
        expect(yesNoMetadata[BooleanStatus.FALSE].color).toBe('#F44336');
      });
    });

    describe('activeInactive preset', () => {
      it('should have correct labels', () => {
        const activeInactiveMetadata = BOOLEAN_METADATA_REGISTRY.activeInactive;
        expect(activeInactiveMetadata[BooleanStatus.TRUE].label.short['us-EN']).toBe('Active');
        expect(activeInactiveMetadata[BooleanStatus.TRUE].label.long['us-EN']).toBe('Active');
        expect(activeInactiveMetadata[BooleanStatus.FALSE].label.short['us-EN']).toBe('Inactive');
        expect(activeInactiveMetadata[BooleanStatus.FALSE].label.long['us-EN']).toBe('Inactive');
        expect(activeInactiveMetadata[BooleanStatus.TRUE].label.short['fr-FR']).toBe('Actif');
        expect(activeInactiveMetadata[BooleanStatus.FALSE].label.short['fr-FR']).toBe('Inactif');
      });

      it('should have correct icons and colors', () => {
        const activeInactiveMetadata = BOOLEAN_METADATA_REGISTRY.activeInactive;
        expect(activeInactiveMetadata[BooleanStatus.TRUE].icon).toBe('check_circle');
        expect(activeInactiveMetadata[BooleanStatus.TRUE].color).toBe('#4CAF50');
        expect(activeInactiveMetadata[BooleanStatus.FALSE].icon).toBe('cancel');
        expect(activeInactiveMetadata[BooleanStatus.FALSE].color).toBe('#F44336');
      });
    });

    describe('enabledDisabled preset', () => {
      it('should have correct labels', () => {
        const enabledDisabledMetadata = BOOLEAN_METADATA_REGISTRY.enabledDisabled;
        expect(enabledDisabledMetadata[BooleanStatus.TRUE].label.short['us-EN']).toBe('Enabled');
        expect(enabledDisabledMetadata[BooleanStatus.TRUE].label.long['us-EN']).toBe('Enabled');
        expect(enabledDisabledMetadata[BooleanStatus.FALSE].label.short['us-EN']).toBe('Disabled');
        expect(enabledDisabledMetadata[BooleanStatus.FALSE].label.long['us-EN']).toBe('Disabled');
        expect(enabledDisabledMetadata[BooleanStatus.TRUE].label.short['fr-FR']).toBe('Activé');
        expect(enabledDisabledMetadata[BooleanStatus.FALSE].label.short['fr-FR']).toBe('Désactivé');
      });
    });

    describe('validInvalid preset', () => {
      it('should have correct labels', () => {
        const validInvalidMetadata = BOOLEAN_METADATA_REGISTRY.validInvalid;
        expect(validInvalidMetadata[BooleanStatus.TRUE].label.short['us-EN']).toBe('Valid');
        expect(validInvalidMetadata[BooleanStatus.TRUE].label.long['us-EN']).toBe('Valid');
        expect(validInvalidMetadata[BooleanStatus.FALSE].label.short['us-EN']).toBe('Invalid');
        expect(validInvalidMetadata[BooleanStatus.FALSE].label.long['us-EN']).toBe('Invalid');
        expect(validInvalidMetadata[BooleanStatus.TRUE].label.short['fr-FR']).toBe('Valide');
        expect(validInvalidMetadata[BooleanStatus.FALSE].label.short['fr-FR']).toBe('Invalide');
      });
    });
  });

  describe('Feature utility functions', () => {
    describe('getStatusMetadataForFeature', () => {
      it('should return metadata for yesNo preset', () => {
        const metadata = getStatusMetadataForFeature('yesNo', BooleanStatus.TRUE);
        expect(metadata).toBeDefined();
        expect(metadata.icon).toBe('check_circle');
        expect(metadata.label.short['us-EN']).toBe('Yes');
      });

      it('should return metadata for activeInactive preset', () => {
        const metadata = getStatusMetadataForFeature('activeInactive', BooleanStatus.FALSE);
        expect(metadata).toBeDefined();
        expect(metadata.label.short['us-EN']).toBe('Inactive');
      });

      it('should return metadata for enabledDisabled preset', () => {
        const metadata = getStatusMetadataForFeature('enabledDisabled', BooleanStatus.TRUE);
        expect(metadata).toBeDefined();
        expect(metadata.label.short['us-EN']).toBe('Enabled');
      });

      it('should return metadata for validInvalid preset', () => {
        const metadata = getStatusMetadataForFeature('validInvalid', BooleanStatus.FALSE);
        expect(metadata).toBeDefined();
        expect(metadata.label.short['us-EN']).toBe('Invalid');
      });
    });

    describe('getStatusIconForFeature', () => {
      it('should return correct icon for TRUE across all presets', () => {
        expect(getStatusIconForFeature('yesNo', BooleanStatus.TRUE)).toBe('check_circle');
        expect(getStatusIconForFeature('activeInactive', BooleanStatus.TRUE)).toBe('check_circle');
        expect(getStatusIconForFeature('enabledDisabled', BooleanStatus.TRUE)).toBe('check_circle');
        expect(getStatusIconForFeature('validInvalid', BooleanStatus.TRUE)).toBe('check_circle');
      });

      it('should return correct icon for FALSE across all presets', () => {
        expect(getStatusIconForFeature('yesNo', BooleanStatus.FALSE)).toBe('cancel');
        expect(getStatusIconForFeature('activeInactive', BooleanStatus.FALSE)).toBe('cancel');
        expect(getStatusIconForFeature('enabledDisabled', BooleanStatus.FALSE)).toBe('cancel');
        expect(getStatusIconForFeature('validInvalid', BooleanStatus.FALSE)).toBe('cancel');
      });
    });

    describe('getStatusColorForFeature', () => {
      it('should return green for TRUE across all presets', () => {
        expect(getStatusColorForFeature('yesNo', BooleanStatus.TRUE)).toBe('#4CAF50');
        expect(getStatusColorForFeature('activeInactive', BooleanStatus.TRUE)).toBe('#4CAF50');
        expect(getStatusColorForFeature('enabledDisabled', BooleanStatus.TRUE)).toBe('#4CAF50');
        expect(getStatusColorForFeature('validInvalid', BooleanStatus.TRUE)).toBe('#4CAF50');
      });

      it('should return red for FALSE across all presets', () => {
        expect(getStatusColorForFeature('yesNo', BooleanStatus.FALSE)).toBe('#F44336');
        expect(getStatusColorForFeature('activeInactive', BooleanStatus.FALSE)).toBe('#F44336');
        expect(getStatusColorForFeature('enabledDisabled', BooleanStatus.FALSE)).toBe('#F44336');
        expect(getStatusColorForFeature('validInvalid', BooleanStatus.FALSE)).toBe('#F44336');
      });
    });

    describe('getStatusLabelForFeature', () => {
      it('should return correct short labels in English for yesNo', () => {
        expect(getStatusLabelForFeature('yesNo', BooleanStatus.TRUE, 'us-EN', 'short')).toBe('Yes');
        expect(getStatusLabelForFeature('yesNo', BooleanStatus.FALSE, 'us-EN', 'short')).toBe('No');
      });

      it('should return correct short labels in French for yesNo', () => {
        expect(getStatusLabelForFeature('yesNo', BooleanStatus.TRUE, 'fr-FR', 'short')).toBe('Oui');
        expect(getStatusLabelForFeature('yesNo', BooleanStatus.FALSE, 'fr-FR', 'short')).toBe('Non');
      });

      it('should return correct labels for activeInactive', () => {
        expect(getStatusLabelForFeature('activeInactive', BooleanStatus.TRUE, 'us-EN', 'short')).toBe('Active');
        expect(getStatusLabelForFeature('activeInactive', BooleanStatus.FALSE, 'us-EN', 'short')).toBe('Inactive');
        expect(getStatusLabelForFeature('activeInactive', BooleanStatus.TRUE, 'fr-FR', 'short')).toBe('Actif');
        expect(getStatusLabelForFeature('activeInactive', BooleanStatus.FALSE, 'fr-FR', 'short')).toBe('Inactif');
      });

      it('should return correct labels for enabledDisabled', () => {
        expect(getStatusLabelForFeature('enabledDisabled', BooleanStatus.TRUE, 'us-EN', 'short')).toBe('Enabled');
        expect(getStatusLabelForFeature('enabledDisabled', BooleanStatus.FALSE, 'us-EN', 'short')).toBe('Disabled');
        expect(getStatusLabelForFeature('enabledDisabled', BooleanStatus.TRUE, 'fr-FR', 'short')).toBe('Activé');
        expect(getStatusLabelForFeature('enabledDisabled', BooleanStatus.FALSE, 'fr-FR', 'short')).toBe('Désactivé');
      });

      it('should return correct labels for validInvalid', () => {
        expect(getStatusLabelForFeature('validInvalid', BooleanStatus.TRUE, 'us-EN', 'short')).toBe('Valid');
        expect(getStatusLabelForFeature('validInvalid', BooleanStatus.FALSE, 'us-EN', 'short')).toBe('Invalid');
        expect(getStatusLabelForFeature('validInvalid', BooleanStatus.TRUE, 'fr-FR', 'short')).toBe('Valide');
        expect(getStatusLabelForFeature('validInvalid', BooleanStatus.FALSE, 'fr-FR', 'short')).toBe('Invalide');
      });

      it('should return long labels when format is long', () => {
        expect(getStatusLabelForFeature('yesNo', BooleanStatus.TRUE, 'us-EN', 'long')).toBe('Yes');
        expect(getStatusLabelForFeature('activeInactive', BooleanStatus.TRUE, 'us-EN', 'long')).toBe('Active');
        expect(getStatusLabelForFeature('enabledDisabled', BooleanStatus.TRUE, 'us-EN', 'long')).toBe('Enabled');
        expect(getStatusLabelForFeature('validInvalid', BooleanStatus.TRUE, 'us-EN', 'long')).toBe('Valid');
      });
    });

    describe('getStatusDescriptionForFeature', () => {
      it('should return descriptions in English', () => {
        const description = getStatusDescriptionForFeature('yesNo', BooleanStatus.TRUE, 'us-EN');
        expect(description).toBeTruthy();
        expect(typeof description).toBe('string');
      });

      it('should return descriptions in French', () => {
        const description = getStatusDescriptionForFeature('activeInactive', BooleanStatus.FALSE, 'fr-FR');
        expect(description).toBeTruthy();
        expect(typeof description).toBe('string');
      });
    });

    describe('getAllStatusesForFeature', () => {
      it('should return both TRUE and FALSE for yesNo', () => {
        const statuses = getAllStatusesForFeature('yesNo');
        expect(statuses).toHaveLength(2);
        expect(statuses).toContain(BooleanStatus.TRUE);
        expect(statuses).toContain(BooleanStatus.FALSE);
      });

      it('should return both TRUE and FALSE for all presets', () => {
        const presets = ['yesNo', 'activeInactive', 'enabledDisabled', 'validInvalid'] as const;
        presets.forEach((preset) => {
          const statuses = getAllStatusesForFeature(preset);
          expect(statuses).toHaveLength(2);
          expect(statuses).toContain(BooleanStatus.TRUE);
          expect(statuses).toContain(BooleanStatus.FALSE);
        });
      });
    });

    describe('getAllStatusMetadataForFeature', () => {
      it('should return complete metadata for yesNo', () => {
        const metadata = getAllStatusMetadataForFeature('yesNo');
        expect(metadata[BooleanStatus.TRUE]).toBeDefined();
        expect(metadata[BooleanStatus.FALSE]).toBeDefined();
        expect(metadata[BooleanStatus.TRUE].label.short['us-EN']).toBe('Yes');
        expect(metadata[BooleanStatus.FALSE].label.short['us-EN']).toBe('No');
      });

      it('should return complete metadata for all presets', () => {
        const presets = ['yesNo', 'activeInactive', 'enabledDisabled', 'validInvalid'] as const;
        presets.forEach((preset) => {
          const metadata = getAllStatusMetadataForFeature(preset);
          expect(metadata[BooleanStatus.TRUE]).toBeDefined();
          expect(metadata[BooleanStatus.FALSE]).toBeDefined();
          expect(metadata[BooleanStatus.TRUE].icon).toBeTruthy();
          expect(metadata[BooleanStatus.TRUE].color).toBeTruthy();
          expect(metadata[BooleanStatus.FALSE].icon).toBeTruthy();
          expect(metadata[BooleanStatus.FALSE].color).toBeTruthy();
        });
      });
    });
  });

  describe('Edge cases', () => {
    it('should handle default locale and format parameters', () => {
      // Should default to 'us-EN' and 'short'
      const label = getStatusLabelForFeature('yesNo', BooleanStatus.TRUE);
      expect(label).toBe('Yes');
    });

    it('should handle all metadata fields are present', () => {
      const presets = ['yesNo', 'activeInactive', 'enabledDisabled', 'validInvalid'] as const;
      presets.forEach((preset) => {
        [BooleanStatus.TRUE, BooleanStatus.FALSE].forEach((status) => {
          const metadata = getStatusMetadataForFeature(preset, status);
          expect(metadata.icon).toBeTruthy();
          expect(metadata.color).toBeTruthy();
          expect(metadata.label.short['us-EN']).toBeTruthy();
          expect(metadata.label.short['fr-FR']).toBeTruthy();
          expect(metadata.label.long['us-EN']).toBeTruthy();
          expect(metadata.label.long['fr-FR']).toBeTruthy();
          expect(metadata.description['us-EN']).toBeTruthy();
          expect(metadata.description['fr-FR']).toBeTruthy();
        });
      });
    });
  });
});
