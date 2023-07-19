import { createReducer, on } from "@ngrx/store";
import * as UserActions from './user.action'
import { loginState, registerState } from '../types/user.types'

export const loginInitialState : loginState = {
    user : null,
    loading : false,
    loaded : false,
    error : null
}

export const registerInitialState : registerState = {
    user : null,
    loading : false,
    loaded : false,
    error : null
} 

export const loginReducer = createReducer(
    loginInitialState,
    on(UserActions.loginUser, (state, {formData}) => ({...state, loading : true})),
    on(UserActions.loginUserSuccess, (state, {userData}) => ({...state, loading : false, loaded : true, user : userData})),
    on(UserActions.loginUserFailure, (state, {error}) => ({...state, loading : false, error}))
)

export const registerReducer = createReducer(
    registerInitialState,
    on(UserActions.registerUser, (state, {userData}) => ({...state, loading : true, user : userData})),
    on(UserActions.registerUseruccess, (state, {userData}) => ({...state, loaded : true, loading : false, user : userData})),
    on(UserActions.registerUserFailure, (state, {error}) => ({...state, loading : false, error}))
)