import { createFeatureSelector, createSelector } from "@ngrx/store";
import { loginState, registerState } from "../types/user.types";

export const selectLoginState = createFeatureSelector<registerState>('loginUserState')
export const selectError = createSelector(selectLoginState, state => (state?.error?.message))
export const selectLoading = createSelector(selectLoginState, state => state.loading)
export const selectUserData = createSelector(selectLoginState, state => state.user)

export const selectRegisterState = createFeatureSelector<registerState>('registerUserState')
export const selectRegisterError = createSelector(selectRegisterState, state => (state?.error?.message))
export const selectRegisterUserData = createSelector(selectRegisterState, state => state.user)
export const selectRegisterLoading = createSelector(selectRegisterState, state => state.loading)


export const selectForgotPasswordState = createFeatureSelector<registerState>('userForgetPasswordState')
export const selectForgotPasswordError = createSelector(selectForgotPasswordState, state => (state?.error?.error?.message))
export const selectForgotPasswordMessage = createSelector(selectForgotPasswordState, state => state?.message?.message)
export const selectForgotPasswordLoading = createSelector(selectForgotPasswordState, state => state.loading)