import { createReducer, on } from "@ngrx/store";
import * as UserActions from './user.action'
import { ScheduleInitialState, initialStateType, loginState, registerState, taskInitialState } from '../types/user.types'

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

export const TaskInitialState : taskInitialState = {
    tasks : null,
    loading : false,
    loaded : false,
    error : null
}

export const scheduleInitialState : ScheduleInitialState = {
    meeting: null,
    loading: false,
    loaded: false,
    error: undefined
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


export const inprogressTask = createReducer(
    TaskInitialState,
    on(UserActions.getInprogressTask, (state) => ({...state, loading : true})),
    on(UserActions.getInprogressTaskSuccess, (state, {tasks}) => ({...state, loading : false, loaded : true, tasks : tasks})),
    on(UserActions.getInprogressTaskFailure, (state, {error}) => ({...state, loading : false, error : error})),
)

export const completedTask = createReducer(
    TaskInitialState,
    on(UserActions.getCompletedTask, (state) => ({...state, loading : true})),
    on(UserActions.getCompletedTaskSuccess, (state, {tasks}) => ({...state, loading : false, loaded : true, tasks : tasks})),
    on(UserActions.getCompletedTaskFailure, (state, {error}) => ({...state, loading : false, error : error})),
)

export const inprogressSchedule = createReducer(
    scheduleInitialState,
    on(UserActions.getInprogressSchedule, (state) => ({...state, loading : true})),
    on(UserActions.getInprogressScheduleSuccess, (state, {meeting}) => ({...state, loading : false, loaded : true, meeting : meeting})),
    on(UserActions.getInprogressScheduleFailure, (state, {error}) => ({...state, loading : false, error : error})),
)

export const completedSchedule = createReducer(
    scheduleInitialState,
    on(UserActions.getCompletedSchedule, (state) => ({...state, loading : true})),
    on(UserActions.getCompletedScheduleSuccess, (state, {meeting}) => ({...state, loading : false, loaded : true, meeting : meeting})),
    on(UserActions.getCompletedScheduleFailure, (state, {error}) => ({...state, loading : false, error : error})),
)