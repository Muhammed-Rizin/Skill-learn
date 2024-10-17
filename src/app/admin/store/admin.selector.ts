import { createFeatureSelector, createSelector } from '@ngrx/store';
import { User, initialStateType } from '../types/admin.types';

export const selectAdminLoginState =
  createFeatureSelector<initialStateType>('loginAdminState');
export const selectError = createSelector(
  selectAdminLoginState,
  (state) => state?.error?.message,
);
export const selectLoading = createSelector(
  selectAdminLoginState,
  (state) => state.loading,
);
export const selectUserData = createSelector(
  selectAdminLoginState,
  (state) => state.user,
);

export const selectTotalUsersState =
  createFeatureSelector<initialStateType>('loadTotalUserState');
export const selectTotalUsers = createSelector(
  selectTotalUsersState,
  (state) => state.user,
);
export const selectLoadingTotalUsers = createSelector(
  selectTotalUsersState,
  (state) => state.loading,
);

export const selectTotalProfessionalState =
  createFeatureSelector<initialStateType>('loadTotalProfessionals');
export const selectTotalProfessional = createSelector(
  selectTotalProfessionalState,
  (state) => state.user,
);
export const selectLoadingTotalProfessionals = createSelector(
  selectTotalProfessionalState,
  (state) => state.loading,
);

export const selectTotalRequestProfessionalState =
  createFeatureSelector<initialStateType>('loadTotalRequestedProfessionals');
export const selectTotalRequestProfessional = createSelector(
  selectTotalRequestProfessionalState,
  (state) => state.user,
);
export const selectLoadingTotalRequestProfessionals = createSelector(
  selectTotalRequestProfessionalState,
  (state) => state.loading,
);

export const selectUsersState =
  createFeatureSelector<initialStateType>('loadUsersState');
export const selectUsers = createSelector(
  selectUsersState,
  (state) => state.user,
);
export const selectLoadingUsers = createSelector(
  selectUsersState,
  (state) => state.loading,
);

export const selectProfessionalState = createFeatureSelector<initialStateType>(
  'loadProfessionalState',
);
export const selectProfessional = createSelector(
  selectProfessionalState,
  (state) => state.user,
);
export const selectLoadingProfessionals = createSelector(
  selectProfessionalState,
  (state) => state.loading,
);

export const selectRequestProfessionalState =
  createFeatureSelector<initialStateType>('loadRequestProfessionalState');
export const selectRequestProfessional = createSelector(
  selectRequestProfessionalState,
  (state) => state.user,
);
export const selectLoadingRequestProfessionals = createSelector(
  selectRequestProfessionalState,
  (state) => state.loading,
);
