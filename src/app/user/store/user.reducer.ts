import { createReducer, on } from "@ngrx/store";
import * as UserActions from './user.action'
import { initialStateType, loginState, registerState } from '../types/user.types'

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

export const initialState : initialStateType = {
    user : null,
    loading : false,
    loaded : false,
    error : null
}


// User login
export const loginReducer = createReducer(
    loginInitialState,
    on(UserActions.loginUser, (state, {formData}) => ({...state, loading : true})),
    on(UserActions.loginUserSuccess, (state, {userData}) => ({...state, loading : false, loaded : true, user : userData})),
    on(UserActions.loginUserFailure, (state, {error}) => ({...state, loading : false, error}))
)

// User register
export const registerReducer = createReducer(
    registerInitialState,
    on(UserActions.registerUser, (state, {userData}) => ({...state, loading : true, user : userData})),
    on(UserActions.registerUseruccess, (state, {userData}) => ({...state, loaded : true, loading : false, user : userData})),
    on(UserActions.registerUserFailure, (state, {error}) => ({...state, loading : false, error}))
)

// Forgot password
export const forgetpasswordReducer = createReducer(
    registerInitialState,
    on(UserActions.forgotEmailUser, (state, {email}) => ({...state, loading : true})),
    on(UserActions.forgotEmailUserSuccess, (state, {message}) => ({...state, loading : false, loaded : true, message})),
    on(UserActions.forgotEmailUserFailure, (state, {error}) => ({...state, error, loading : false}))
)

// User details with token
export const getUserDetailsByTokenReducer = createReducer(
    registerInitialState,
    on(UserActions.getUserDetailsByToken, (state, {token}) => ({...state, loading : true})),
    on(UserActions.getUserDetailsByTokenSuccess, (state, {userData}) => ({...state, loading : false, loaded : true, user : userData})),
    on(UserActions.getUserDetailsByTokenFailure, (state, {error}) => ({...state, error, loading : false}))
)

// New password
export const newPasswordReducer = createReducer(
    registerInitialState,
    on(UserActions.newPassword, (state, {token, password}) => ({...state, loading : true})),
    on(UserActions.newPasswordSuccess, (state, {userData}) => ({...state, loading : false, loaded : true, user : userData})),
    on(UserActions.newPasswordFailure, (state, {error}) => ({...state, error, loading : false}))
)

// Professional data
export const ProfessionalDataReducer = createReducer(
    initialState,
    on(UserActions.getProfessionalData, (state, { email }) => ({...state, loading : true})),
    on(UserActions.getProfessionalDataSuccess, (state, {userData}) => ({...state, loading : false, loaded : true, user : userData})),
    on(UserActions.getProfessionalDataFailure, (state, { error }) => ({...state, loading : true, error}))
)

// Get Professionals 
export const professionalsList = createReducer(
    initialState,
    on(UserActions.getProfessionals, (state) => ({...state, loading : true})),
    on(UserActions.getProfessionalsSuccess, (state, {professionals}) => ({...state, loading : false, loaded : true, user : professionals})),
    on(UserActions.getProfessionalsFailure, (state, {error}) => ({...state, loading : false, error : error}))
)