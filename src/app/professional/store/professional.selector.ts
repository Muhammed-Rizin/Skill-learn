import { createFeatureSelector, createSelector } from "@ngrx/store"
import { State } from "../types/professional.types"

export const selectRegisterState = createFeatureSelector<State>('registerProfessionalState')
export const selectRegisterError = createSelector(selectRegisterState, state => (state?.error?.message))
export const selectRegisterUserData = createSelector(selectRegisterState, state => state.user)
export const selectRegisterLoading = createSelector(selectRegisterState, state => state.loading)

export const selectLoginState = createFeatureSelector<State>('loginProfessionalState')
export const selectLoginError = createSelector(selectLoginState, state => (state?.error?.message))
export const selectLoginUserData = createSelector(selectLoginState, state => (state.user))
export const selectLoginLoading = createSelector(selectLoginState, state => (state.loading))

export const selectForgotPasswordState = createFeatureSelector<State>('professionalForgotPasswordState')
export const selectForgotPasswordError = createSelector(selectForgotPasswordState, state => (state?.error?.error?.message))
export const selectForgotPasswordMessage = createSelector(selectForgotPasswordState, state => state?.message?.message)
export const selectForgotPasswordLoading = createSelector(selectForgotPasswordState, state => state.loading)