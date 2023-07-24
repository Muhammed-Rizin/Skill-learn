import { createReducer, on } from "@ngrx/store";
import { State } from "../types/professional.types";
import * as professionalActions from './professional.actions'
import { state } from "@angular/animations";

export const initialState : State = {
    user : null,
    loaded : false,
    loading : false,
    error : null
}

export const professionalRegisterReducer = createReducer(
    initialState,
    on(professionalActions.professionalRegister, (state, {professionalData}) => ({...state, loading : true})),
    on(professionalActions.professionalRegisterSuccess, (state,{professionalData}) => (
        {...state, loaded : true, loading : false, user : professionalData})),
    on(professionalActions.professionalRegisterFailure, (state, {error}) => ({...state, loading : false, error}))
)

export const professionalLoginReducer = createReducer(
    initialState,
    on(professionalActions.professionalLogin, (state, {professionalData}) => ({...state, loading : true})),
    on(professionalActions.professionalLoginSuccess, (state, {professionalData}) => (
        {...state, loaded : true, loading : false, user : professionalData})),
    on(professionalActions.professionalLoginFailure, (state, {error}) => ({...state, loading : false, error}))

)

export const professionalForgetpasswordReducer = createReducer(
    initialState,
    on(professionalActions.forgotEmailProfessional, (state, {email}) => ({...state, loading : true})),
    on(professionalActions.forgotEmailProfessionalSuccess, (state, {message}) => ({...state, loading : false, loaded : true, message})),
    on(professionalActions.forgotEmailProfessionalFailure, (state, {error}) => ({...state, error, loading : false}))
)

export const getProfessionalDetailsReducer = createReducer(
    initialState,
    on(professionalActions.getProfessionalDetails, (state, {token}) => ({...state, loading : true})),
    on(professionalActions.getProfessionalDetailsSuccess, (state, {professionalData}) => ({...state, loading : false, loaded : true, Professional : professionalData})),
    on(professionalActions.getProfessionalDetailsFailure, (state, {error}) => ({...state, error, loading : false}))
)

export const professionalNewPasswordReducer = createReducer(
    initialState,
    on(professionalActions.newPassword, (state, {token, password}) => ({...state, loading : true})),
    on(professionalActions.newPasswordSuccess, (state, {professionalData}) => ({...state, loading : false, loaded : true, Professional : professionalData})),
    on(professionalActions.newPasswordFailure, (state, {error}) => ({...state, error, loading : false}))
)