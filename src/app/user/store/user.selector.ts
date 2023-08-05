import { createFeatureSelector, createSelector } from "@ngrx/store";
import { initialStateType, loginState, registerState } from "../types/user.types";
import { professionalData } from "src/app/professional/types/professional.types";

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

export const selectProfessionalsState = createFeatureSelector<initialStateType>('professionalListReducer')
export const selectProfessionalsData = createSelector(selectProfessionalsState, state => (state.user as professionalData[]))
export const selectProfessionalsError = createSelector(selectProfessionalsState, state => (state.error?.message))
export const selectProfessionalsLoading = createSelector(selectProfessionalsState, state => (state.loading))