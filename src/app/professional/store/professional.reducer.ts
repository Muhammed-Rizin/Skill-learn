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