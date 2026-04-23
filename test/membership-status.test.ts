import * as MembershipStatusModule from '../src/status/membership-status';

const {
  MembershipStatus,
  getStatusMetadata,
  getStatusIcon,
  getStatusColor,
  getStatusLabel,
  getStatusLongLabel,
  getStatusDescription,
  isActiveMembership,
  isPendingMembership,
  isInactiveMembership,
} = MembershipStatusModule;

describe('Membership Status', () => {
  describe('MembershipStatus Enum', () => {
    it('should have all required states', () => {
      expect(MembershipStatus.ACTIVE).toBe('active');
      expect(MembershipStatus.PENDING).toBe('pending');
      expect(MembershipStatus.REVOKED).toBe('revoked');
      expect(MembershipStatus.REFUSED).toBe('refused');
    });
  });

  describe('Status Metadata', () => {
    it('should return metadata for ACTIVE state', () => {
      const metadata = getStatusMetadata(MembershipStatus.ACTIVE);
      expect(metadata.icon).toBe('check_circle');
      expect(metadata.color).toBe('#4CAF50');
      expect(metadata.label.short['us-EN']).toBe('Active');
      expect(metadata.label.short['fr-FR']).toBe('Actif');
    });

    it('should return metadata for PENDING state', () => {
      const metadata = getStatusMetadata(MembershipStatus.PENDING);
      expect(metadata.icon).toBe('schedule');
      expect(metadata.color).toBe('#FF9800');
      expect(metadata.label.short['us-EN']).toBe('Pending');
      expect(metadata.label.short['fr-FR']).toBe('En attente');
    });

    it('should return metadata for REVOKED state', () => {
      const metadata = getStatusMetadata(MembershipStatus.REVOKED);
      expect(metadata.icon).toBe('cancel');
      expect(metadata.color).toBe('#F44336');
      expect(metadata.label.short['us-EN']).toBe('Revoked');
      expect(metadata.label.short['fr-FR']).toBe('Révoqué');
    });

    it('should return metadata for REFUSED state', () => {
      const metadata = getStatusMetadata(MembershipStatus.REFUSED);
      expect(metadata.icon).toBe('block');
      expect(metadata.color).toBe('#9C27B0');
      expect(metadata.label.short['us-EN']).toBe('Refused');
      expect(metadata.label.short['fr-FR']).toBe('Refusé');
    });
  });

  describe('Helper Functions', () => {
    it('should get icon for status', () => {
      expect(getStatusIcon(MembershipStatus.ACTIVE)).toBe('check_circle');
      expect(getStatusIcon(MembershipStatus.PENDING)).toBe('schedule');
      expect(getStatusIcon(MembershipStatus.REVOKED)).toBe('cancel');
      expect(getStatusIcon(MembershipStatus.REFUSED)).toBe('block');
    });

    it('should get color for status', () => {
      expect(getStatusColor(MembershipStatus.ACTIVE)).toBe('#4CAF50');
      expect(getStatusColor(MembershipStatus.PENDING)).toBe('#FF9800');
      expect(getStatusColor(MembershipStatus.REVOKED)).toBe('#F44336');
      expect(getStatusColor(MembershipStatus.REFUSED)).toBe('#9C27B0');
    });

    it('should get short label for status', () => {
      expect(getStatusLabel(MembershipStatus.ACTIVE, 'us-EN')).toBe('Active');
      expect(getStatusLabel(MembershipStatus.ACTIVE, 'fr-FR')).toBe('Actif');
      expect(getStatusLabel(MembershipStatus.PENDING, 'us-EN')).toBe('Pending');
      expect(getStatusLabel(MembershipStatus.REVOKED, 'us-EN')).toBe('Revoked');
    });

    it('should get long label for status', () => {
      expect(getStatusLongLabel(MembershipStatus.ACTIVE, 'us-EN')).toBe('Active Membership');
      expect(getStatusLongLabel(MembershipStatus.ACTIVE, 'fr-FR')).toBe('Adhésion active');
      expect(getStatusLongLabel(MembershipStatus.PENDING, 'us-EN')).toBe('Pending Membership');
    });

    it('should get description for status', () => {
      const desc = getStatusDescription(MembershipStatus.ACTIVE, 'us-EN');
      expect(desc).toBe('The membership is valid and grants normal access');
    });
  });

  describe('Classification Functions', () => {
    it('should identify active membership', () => {
      expect(isActiveMembership(MembershipStatus.ACTIVE)).toBe(true);
      expect(isActiveMembership(MembershipStatus.PENDING)).toBe(false);
      expect(isActiveMembership(MembershipStatus.REVOKED)).toBe(false);
      expect(isActiveMembership(MembershipStatus.REFUSED)).toBe(false);
    });

    it('should identify pending membership', () => {
      expect(isPendingMembership(MembershipStatus.ACTIVE)).toBe(false);
      expect(isPendingMembership(MembershipStatus.PENDING)).toBe(true);
      expect(isPendingMembership(MembershipStatus.REVOKED)).toBe(false);
      expect(isPendingMembership(MembershipStatus.REFUSED)).toBe(false);
    });

    it('should identify inactive membership', () => {
      expect(isInactiveMembership(MembershipStatus.ACTIVE)).toBe(false);
      expect(isInactiveMembership(MembershipStatus.PENDING)).toBe(false);
      expect(isInactiveMembership(MembershipStatus.REVOKED)).toBe(true);
      expect(isInactiveMembership(MembershipStatus.REFUSED)).toBe(true);
    });
  });
});
