import { createFeatureSelector, createSelector } from "@ngrx/store";
import { User, initialStateType } from "../types/admin.types";

export const selectAdminLoginState = createFeatureSelector<initialStateType>('loginAdminState')
export const selectError = createSelector(selectAdminLoginState, state => (state?.error?.message))
export const selectLoading = createSelector(selectAdminLoginState, state => state.loading)
export const selectUserData = createSelector(selectAdminLoginState, state => state.user)

export const selectUsersState = createFeatureSelector<initialStateType>('loadUsersState')
export const selectUsers = createSelector(selectUsersState, state => state.user)
export const selectLoadingUsers = createSelector(selectUsersState, state => state.loading)

export const selectProfessionalState = createFeatureSelector<initialStateType>('loadProfessionalState')
export const selectProfessional = createSelector(selectProfessionalState, state => state.user)
export const selectLoadingProfessionals = createSelector(selectProfessionalState, state => state.loading)

export const selectRequestProfessionalState = createFeatureSelector<initialStateType>('loadRequestProfessionalState')
export const selectRequestProfessional = createSelector(selectRequestProfessionalState, state => state.user)
export const selectLoadingRequestProfessionals = createSelector(selectRequestProfessionalState, state => state.loading)