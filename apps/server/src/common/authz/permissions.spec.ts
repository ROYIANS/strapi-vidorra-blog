import {
  getPermissionsForRole,
  getPermissionsForRoles,
  PERMISSIONS,
  ROLES,
} from '@vidorra/types';

describe('permissions', () => {
  it('exposes stable role constants for cross-app reuse', () => {
    expect(ROLES).toEqual({
      ADMIN: 'ADMIN',
      EDITOR: 'EDITOR',
      READER: 'READER',
    });
  });

  it('grants all user-management permissions to ADMIN', () => {
    const permissions = getPermissionsForRole('ADMIN');

    expect(permissions).toEqual(
      expect.arrayContaining([
        PERMISSIONS.DASHBOARD_VIEW,
        PERMISSIONS.USERS_VIEW,
        PERMISSIONS.USERS_UPDATE,
        PERMISSIONS.USERS_DELETE,
      ]),
    );
  });

  it('grants readonly user-management permissions to EDITOR', () => {
    const permissions = getPermissionsForRole('EDITOR');

    expect(permissions).toEqual(
      expect.arrayContaining([
        PERMISSIONS.DASHBOARD_VIEW,
        PERMISSIONS.USERS_VIEW,
      ]),
    );
    expect(permissions).not.toContain(PERMISSIONS.USERS_UPDATE);
    expect(permissions).not.toContain(PERMISSIONS.USERS_DELETE);
  });

  it('returns deduplicated union across roles', () => {
    const permissions = getPermissionsForRoles(['READER', 'EDITOR']);

    expect(permissions).toEqual(
      expect.arrayContaining([
        PERMISSIONS.DASHBOARD_VIEW,
        PERMISSIONS.USERS_VIEW,
      ]),
    );
    expect(permissions.filter((item) => item === PERMISSIONS.DASHBOARD_VIEW)).toHaveLength(1);
  });
});
