import {
  MedicalServiceStatus,
  MEDICAL_SERVICE_STATUS_METADATA,
  getStatusMetadata,
  getStatusIcon,
  getStatusColor,
  getStatusLabel,
  getStatusDescription,
  getAllMedicalServiceStatuses,
  isValidMedicalServiceStatus,
  isValidTransition,
  getAllowedTransitions,
} from '../src/status/medical-service-status';

describe('Medical Service Status', () => {
  describe('MedicalServiceStatus enum', () => {
    it('should have all required status values', () => {
      expect(MedicalServiceStatus.PENDING).toBe('pending');
      expect(MedicalServiceStatus.IN_PROGRESS).toBe('in_progress');
      expect(MedicalServiceStatus.ON_WAITING_ROOM).toBe('on_waiting_room');
      expect(MedicalServiceStatus.CANCELED).toBe('canceled');
      expect(MedicalServiceStatus.COMPLETED).toBe('completed');
    });
  });

  describe('MEDICAL_SERVICE_STATUS_METADATA', () => {
    it('should have metadata for all statuses', () => {
      const statuses = Object.values(MedicalServiceStatus);
      statuses.forEach((status) => {
        expect(MEDICAL_SERVICE_STATUS_METADATA[status]).toBeDefined();
        expect(MEDICAL_SERVICE_STATUS_METADATA[status].icon).toBeTruthy();
        expect(MEDICAL_SERVICE_STATUS_METADATA[status].color).toBeTruthy();
        expect(MEDICAL_SERVICE_STATUS_METADATA[status].label.short['us-EN']).toBeTruthy();
        expect(MEDICAL_SERVICE_STATUS_METADATA[status].label.short['fr-FR']).toBeTruthy();
        expect(MEDICAL_SERVICE_STATUS_METADATA[status].label.long['us-EN']).toBeTruthy();
        expect(MEDICAL_SERVICE_STATUS_METADATA[status].label.long['fr-FR']).toBeTruthy();
        expect(MEDICAL_SERVICE_STATUS_METADATA[status].description['us-EN']).toBeTruthy();
        expect(MEDICAL_SERVICE_STATUS_METADATA[status].description['fr-FR']).toBeTruthy();
      });
    });

    it('should have correct icons for each status', () => {
      expect(MEDICAL_SERVICE_STATUS_METADATA[MedicalServiceStatus.PENDING].icon).toBe('schedule');
      expect(MEDICAL_SERVICE_STATUS_METADATA[MedicalServiceStatus.ON_WAITING_ROOM].icon).toBe('event_busy');
      expect(MEDICAL_SERVICE_STATUS_METADATA[MedicalServiceStatus.IN_PROGRESS].icon).toBe('medical_services');
      expect(MEDICAL_SERVICE_STATUS_METADATA[MedicalServiceStatus.COMPLETED].icon).toBe('check_circle');
      expect(MEDICAL_SERVICE_STATUS_METADATA[MedicalServiceStatus.CANCELED].icon).toBe('cancel');
    });

    it('should have correct colors for each status', () => {
      expect(MEDICAL_SERVICE_STATUS_METADATA[MedicalServiceStatus.PENDING].color).toBe('#9E9E9E');
      expect(MEDICAL_SERVICE_STATUS_METADATA[MedicalServiceStatus.ON_WAITING_ROOM].color).toBe('#FF9800');
      expect(MEDICAL_SERVICE_STATUS_METADATA[MedicalServiceStatus.IN_PROGRESS].color).toBe('#2196F3');
      expect(MEDICAL_SERVICE_STATUS_METADATA[MedicalServiceStatus.COMPLETED].color).toBe('#4CAF50');
      expect(MEDICAL_SERVICE_STATUS_METADATA[MedicalServiceStatus.CANCELED].color).toBe('#F44336');
    });
  });

  describe('getStatusMetadata', () => {
    it('should return metadata for a status', () => {
      const metadata = getStatusMetadata(MedicalServiceStatus.PENDING);
      expect(metadata).toBeDefined();
      expect(metadata.icon).toBe('schedule');
      expect(metadata.color).toBe('#9E9E9E');
    });
  });

  describe('getStatusIcon', () => {
    it('should return the correct icon for each status', () => {
      expect(getStatusIcon(MedicalServiceStatus.PENDING)).toBe('schedule');
      expect(getStatusIcon(MedicalServiceStatus.ON_WAITING_ROOM)).toBe('event_busy');
      expect(getStatusIcon(MedicalServiceStatus.IN_PROGRESS)).toBe('medical_services');
      expect(getStatusIcon(MedicalServiceStatus.COMPLETED)).toBe('check_circle');
      expect(getStatusIcon(MedicalServiceStatus.CANCELED)).toBe('cancel');
    });
  });

  describe('getStatusColor', () => {
    it('should return the correct color for each status', () => {
      expect(getStatusColor(MedicalServiceStatus.PENDING)).toBe('#9E9E9E');
      expect(getStatusColor(MedicalServiceStatus.ON_WAITING_ROOM)).toBe('#FF9800');
      expect(getStatusColor(MedicalServiceStatus.IN_PROGRESS)).toBe('#2196F3');
      expect(getStatusColor(MedicalServiceStatus.COMPLETED)).toBe('#4CAF50');
      expect(getStatusColor(MedicalServiceStatus.CANCELED)).toBe('#F44336');
    });
  });

  describe('getStatusLabel', () => {
    it('should return short English labels by default', () => {
      expect(getStatusLabel(MedicalServiceStatus.PENDING)).toBe('Pending');
      expect(getStatusLabel(MedicalServiceStatus.ON_WAITING_ROOM)).toBe('Waiting');
      expect(getStatusLabel(MedicalServiceStatus.IN_PROGRESS)).toBe('In Progress');
      expect(getStatusLabel(MedicalServiceStatus.COMPLETED)).toBe('Completed');
      expect(getStatusLabel(MedicalServiceStatus.CANCELED)).toBe('Canceled');
    });

    it('should return short French labels when locale is fr-FR', () => {
      expect(getStatusLabel(MedicalServiceStatus.PENDING, 'fr-FR')).toBe('En attente');
      expect(getStatusLabel(MedicalServiceStatus.ON_WAITING_ROOM, 'fr-FR')).toBe('En attente');
      expect(getStatusLabel(MedicalServiceStatus.IN_PROGRESS, 'fr-FR')).toBe('En cours');
      expect(getStatusLabel(MedicalServiceStatus.COMPLETED, 'fr-FR')).toBe('Terminé');
      expect(getStatusLabel(MedicalServiceStatus.CANCELED, 'fr-FR')).toBe('Annulé');
    });

    it('should return long English labels when format is long', () => {
      expect(getStatusLabel(MedicalServiceStatus.PENDING, 'us-EN', 'long')).toBe('Pending Service');
      expect(getStatusLabel(MedicalServiceStatus.ON_WAITING_ROOM, 'us-EN', 'long')).toBe('In Waiting Room');
      expect(getStatusLabel(MedicalServiceStatus.IN_PROGRESS, 'us-EN', 'long')).toBe('Service In Progress');
      expect(getStatusLabel(MedicalServiceStatus.COMPLETED, 'us-EN', 'long')).toBe('Service Completed');
      expect(getStatusLabel(MedicalServiceStatus.CANCELED, 'us-EN', 'long')).toBe('Service Canceled');
    });

    it('should return long French labels when locale is fr-FR and format is long', () => {
      expect(getStatusLabel(MedicalServiceStatus.PENDING, 'fr-FR', 'long')).toBe('Service en attente');
      expect(getStatusLabel(MedicalServiceStatus.ON_WAITING_ROOM, 'fr-FR', 'long')).toBe("Dans la salle d'attente");
      expect(getStatusLabel(MedicalServiceStatus.IN_PROGRESS, 'fr-FR', 'long')).toBe('Service en cours');
      expect(getStatusLabel(MedicalServiceStatus.COMPLETED, 'fr-FR', 'long')).toBe('Service terminé');
      expect(getStatusLabel(MedicalServiceStatus.CANCELED, 'fr-FR', 'long')).toBe('Service annulé');
    });
  });

  describe('getStatusDescription', () => {
    it('should return English descriptions by default', () => {
      expect(getStatusDescription(MedicalServiceStatus.PENDING)).toBe(
        'The medical service is scheduled and waiting to begin',
      );
      expect(getStatusDescription(MedicalServiceStatus.ON_WAITING_ROOM)).toBe(
        'Patient has checked in and is waiting in the waiting room',
      );
      expect(getStatusDescription(MedicalServiceStatus.IN_PROGRESS)).toBe(
        'The medical service consultation is currently in progress',
      );
      expect(getStatusDescription(MedicalServiceStatus.COMPLETED)).toBe(
        'The medical service has been successfully completed',
      );
      expect(getStatusDescription(MedicalServiceStatus.CANCELED)).toBe(
        'The medical service has been canceled and will not proceed',
      );
    });

    it('should return French descriptions when locale is fr-FR', () => {
      expect(getStatusDescription(MedicalServiceStatus.PENDING, 'fr-FR')).toBe(
        'Le service médical est planifié et en attente de démarrage',
      );
      expect(getStatusDescription(MedicalServiceStatus.ON_WAITING_ROOM, 'fr-FR')).toBe(
        "Le patient s'est enregistré et attend dans la salle d'attente",
      );
      expect(getStatusDescription(MedicalServiceStatus.IN_PROGRESS, 'fr-FR')).toBe(
        'La consultation du service médical est actuellement en cours',
      );
      expect(getStatusDescription(MedicalServiceStatus.COMPLETED, 'fr-FR')).toBe(
        'Le service médical a été terminé avec succès',
      );
      expect(getStatusDescription(MedicalServiceStatus.CANCELED, 'fr-FR')).toBe(
        'Le service médical a été annulé et ne sera pas effectué',
      );
    });
  });

  describe('getAllMedicalServiceStatuses', () => {
    it('should return all status values', () => {
      const statuses = getAllMedicalServiceStatuses();
      expect(statuses).toHaveLength(5);
      expect(statuses).toContain(MedicalServiceStatus.PENDING);
      expect(statuses).toContain(MedicalServiceStatus.ON_WAITING_ROOM);
      expect(statuses).toContain(MedicalServiceStatus.IN_PROGRESS);
      expect(statuses).toContain(MedicalServiceStatus.COMPLETED);
      expect(statuses).toContain(MedicalServiceStatus.CANCELED);
    });
  });

  describe('isValidMedicalServiceStatus', () => {
    it('should return true for valid statuses', () => {
      expect(isValidMedicalServiceStatus('pending')).toBe(true);
      expect(isValidMedicalServiceStatus('in_progress')).toBe(true);
      expect(isValidMedicalServiceStatus('on_waiting_room')).toBe(true);
      expect(isValidMedicalServiceStatus('canceled')).toBe(true);
      expect(isValidMedicalServiceStatus('completed')).toBe(true);
    });

    it('should return false for invalid statuses', () => {
      expect(isValidMedicalServiceStatus('invalid')).toBe(false);
      expect(isValidMedicalServiceStatus('PENDING')).toBe(false);
      expect(isValidMedicalServiceStatus('')).toBe(false);
    });
  });

  describe('Status transitions', () => {
    describe('isValidTransition', () => {
      it('should allow valid transitions from PENDING', () => {
        expect(isValidTransition(MedicalServiceStatus.PENDING, MedicalServiceStatus.ON_WAITING_ROOM)).toBe(true);
        expect(isValidTransition(MedicalServiceStatus.PENDING, MedicalServiceStatus.IN_PROGRESS)).toBe(true);
        expect(isValidTransition(MedicalServiceStatus.PENDING, MedicalServiceStatus.CANCELED)).toBe(true);
      });

      it('should disallow invalid transitions from PENDING', () => {
        expect(isValidTransition(MedicalServiceStatus.PENDING, MedicalServiceStatus.COMPLETED)).toBe(false);
        expect(isValidTransition(MedicalServiceStatus.PENDING, MedicalServiceStatus.PENDING)).toBe(false);
      });

      it('should allow valid transitions from ON_WAITING_ROOM', () => {
        expect(isValidTransition(MedicalServiceStatus.ON_WAITING_ROOM, MedicalServiceStatus.IN_PROGRESS)).toBe(true);
        expect(isValidTransition(MedicalServiceStatus.ON_WAITING_ROOM, MedicalServiceStatus.CANCELED)).toBe(true);
        expect(isValidTransition(MedicalServiceStatus.ON_WAITING_ROOM, MedicalServiceStatus.PENDING)).toBe(true);
      });

      it('should allow valid transitions from IN_PROGRESS', () => {
        expect(isValidTransition(MedicalServiceStatus.IN_PROGRESS, MedicalServiceStatus.COMPLETED)).toBe(true);
        expect(isValidTransition(MedicalServiceStatus.IN_PROGRESS, MedicalServiceStatus.CANCELED)).toBe(true);
      });

      it('should allow reopening a completed service', () => {
        expect(isValidTransition(MedicalServiceStatus.COMPLETED, MedicalServiceStatus.IN_PROGRESS)).toBe(true);
      });

      it('should allow uncanceling a service', () => {
        expect(isValidTransition(MedicalServiceStatus.CANCELED, MedicalServiceStatus.PENDING)).toBe(true);
      });
    });

    describe('getAllowedTransitions', () => {
      it('should return allowed transitions from PENDING', () => {
        const transitions = getAllowedTransitions(MedicalServiceStatus.PENDING);
        expect(transitions).toHaveLength(3);
        expect(transitions).toContain(MedicalServiceStatus.ON_WAITING_ROOM);
        expect(transitions).toContain(MedicalServiceStatus.IN_PROGRESS);
        expect(transitions).toContain(MedicalServiceStatus.CANCELED);
      });

      it('should return allowed transitions from ON_WAITING_ROOM', () => {
        const transitions = getAllowedTransitions(MedicalServiceStatus.ON_WAITING_ROOM);
        expect(transitions).toHaveLength(3);
        expect(transitions).toContain(MedicalServiceStatus.IN_PROGRESS);
        expect(transitions).toContain(MedicalServiceStatus.CANCELED);
        expect(transitions).toContain(MedicalServiceStatus.PENDING);
      });

      it('should return allowed transitions from IN_PROGRESS', () => {
        const transitions = getAllowedTransitions(MedicalServiceStatus.IN_PROGRESS);
        expect(transitions).toHaveLength(2);
        expect(transitions).toContain(MedicalServiceStatus.COMPLETED);
        expect(transitions).toContain(MedicalServiceStatus.CANCELED);
      });

      it('should return allowed transitions from COMPLETED', () => {
        const transitions = getAllowedTransitions(MedicalServiceStatus.COMPLETED);
        expect(transitions).toHaveLength(1);
        expect(transitions).toContain(MedicalServiceStatus.IN_PROGRESS);
      });

      it('should return allowed transitions from CANCELED', () => {
        const transitions = getAllowedTransitions(MedicalServiceStatus.CANCELED);
        expect(transitions).toHaveLength(1);
        expect(transitions).toContain(MedicalServiceStatus.PENDING);
      });
    });
  });
});
