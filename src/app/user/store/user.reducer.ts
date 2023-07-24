import { createReducer, on } from "@ngrx/store";
import * as UserActions from './user.action'
import { loginState, registerState } from '../types/user.types'

export const loginInitialState : loginState = {
    user : null,
    loading : false,
    loaded : false,
    error : null
}

export const initialState : registerState = {
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
    initialState,
    on(UserActions.registerUser, (state, {userData}) => ({...state, loading : true, user : userData})),
    on(UserActions.registerUseruccess, (state, {userData}) => ({...state, loaded : true, loading : false, user : userData})),
    on(UserActions.registerUserFailure, (state, {error}) => ({...state, loading : false, error}))
)

export const forgetpasswordReducer = createReducer(
    initialState,
    on(UserActions.forgotEmailUser, (state, {email}) => ({...state, loading : true})),
    on(UserActions.forgotEmailUserSuccess, (state, {message}) => ({...state, loading : false, loaded : true, message})),
    on(UserActions.forgotEmailUserFailure, (state, {error}) => ({...state, error, loading : false}))
)

export const getUserDetailsReducer = createReducer(
    initialState,
    on(UserActions.getUserDetails, (state, {token}) => ({...state, loading : true})),
    on(UserActions.getUserDetailsSuccess, (state, {userData}) => ({...state, loading : false, loaded : true, user : userData})),
    on(UserActions.getUserDetailsFailure, (state, {error}) => ({...state, error, loading : false}))
)

export const newPasswordReducer = createReducer(
    initialState,
    on(UserActions.newPassword, (state, {token, password}) => ({...state, loading : true})),
    on(UserActions.newPasswordSuccess, (state, {userData}) => ({...state, loading : false, loaded : true, user : userData})),
    on(UserActions.newPasswordFailure, (state, {error}) => ({...state, error, loading : false}))
)