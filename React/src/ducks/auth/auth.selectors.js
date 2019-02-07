import {authStatusType} from './auth.status-type';

export const getPermissions = state => state.auth.permissions;
export const getIsPermissionsLoading = state => state.auth.isPermissionsLoading;
export const getIsLogined = state => state.auth.status === authStatusType.logined;
export const getIsLogout = state => state.auth.status === authStatusType.logout;
export const getIsLoginLoading = state => state.auth.status === authStatusType.loading;
export const getError = state => state.auth.error;