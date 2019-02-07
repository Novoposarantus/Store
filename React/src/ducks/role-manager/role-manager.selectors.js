export const getPermissionsOfRole = state => state.roleManager.permissions;
export const getRoles = state => state.roleManager.roles;
export const getIsRoleManagerLoading = state => state.roleManager.isPermissionsLoading || state.roleManager.isRolesLoading;
export const getError = state => state.roleManager.error;