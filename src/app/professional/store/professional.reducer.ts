import { createReducer, on } from "@ngrx/store";
import { ScheduleInitialState, State, taskInitialState } from "../types/professional.types";
import * as professionalActions from './professional.actions'

export const initialState : State = {
    user : null,
    loaded : false,
    loading : false,
    error : null,
    message : null
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


export const getinprogressTask = createReducer(
    TaskInitialState,
    on(professionalActions.getInprogressTask, (state) => ({...state, loading : true})),
    on(professionalActions.getInprogressTaskSuccess, (state, {tasks}) => ({...state, loading : false, loaded : true, tasks : tasks})),
    on(professionalActions.getInprogressTaskFailure, (state, {error}) => ({...state, loading : false, error : error})),
)

export const getcompletedTask = createReducer(
    TaskInitialState,
    on(professionalActions.getCompletedTask, (state) => ({...state, loading : true})),
    on(professionalActions.getCompletedTaskSuccess, (state, {tasks}) => ({...state, loading : false, loaded : true, tasks : tasks})),
    on(professionalActions.getCompletedTaskFailure, (state, {error}) => ({...state, loading : false, error : error})),
)

export const getinprogressSchedule = createReducer(
    scheduleInitialState,
    on(professionalActions.getInprogressSchedule, (state) => ({...state, loading : true})),
    on(professionalActions.getInprogressScheduleSuccess, (state, {meeting}) => ({...state, loading : false, loaded : true, meeting     : meeting})),
    on(professionalActions.getInprogressScheduleFailure, (state, {error}) => ({...state, loading : false, error : error})),
)

export const getcompletedSchedule = createReducer(
    scheduleInitialState,
    on(professionalActions.getCompletedSchedule, (state) => ({...state, loading : true})),
    on(professionalActions.getCompletedScheduleSuccess, (state, {meeting}) => ({...state, loading : false, loaded : true, meeting : meeting})),
    on(professionalActions.getCompletedScheduleFailure, (state, {error}) => ({...state, loading : false, error : error})),
)