import { createAction, props } from "@ngrx/store";
import { loginUser, registerUserType, userData } from "../types/user.types";
import { CompleteSchedule, CompleteTask, Task, professionalData } from "src/app/professional/types/professional.types";


// User login
export const loginUserAction = createAction(`[User Component] Login User`, props<{data : loginUser}>())
export const loginUserSuccess = createAction(`[User Component] Login User Success`, props<{userData : userData}>())
export const loginUserFailure = createAction(`[User Component] Login User Failure`, props<{error : any}>())

// User register
export const registerUser = createAction(`[User Component] Register User`, props<{userData : registerUserType}>())
export const registerUserSuccess = createAction(`[User Component] Register User Success`,props<{userData : userData}>())
export const registerUserFailure = createAction(`[User Component] Register User Failure`, props<{error : any}>())

// Forgot password
export const forgotEmailUser = createAction('[User Component] Forgot password', props<{email : string}>())
export const forgotEmailUserSuccess = createAction('[User Component] Forgot password success', props<{message  : string}>())
export const forgotEmailUserFailure = createAction('[User Component] Forgot password failure', props<{error : any}>())

// User details by token
export const getUserDetailsByToken = createAction('[User Component] Get details by token', props<{token : string}>())
export const getUserDetailsByTokenSuccess = createAction('[User Component] Get details by token success', props<{userData  : userData}>())
export const getUserDetailsByTokenFailure = createAction('[User Component] Get details by token failure', props<{error : any}>())

// New password
export const newPassword = createAction('[User Component] New password', props<{token : string, password : string}>())
export const newPasswordSuccess = createAction('[User Component] New password success', props<{userData : userData}>())
export const newPasswordFailure = createAction('[User Component] New password failure', props<{error : any}>())

// Single professional data
export const getProfessionalData = createAction(`[User Component] Get professional data`, props<{email : string}>())
export const getProfessionalDataSuccess = createAction(`[User Component] Get professional data success`, props<{userData : professionalData}>())
export const getProfessionalDataFailure = createAction(`[User Component] Get professional data failure`, props<{error : any}>())

// List professionals
export const getProfessionals = createAction(`[User Component] Professionals `)
export const getProfessionalsSuccess = 
createAction(`[User Component] Professionals success `, props<{professionals : professionalData[]}>())
export const getProfessionalsFailure = createAction(`[User Component] Professionals failure `, props<{error : any}>())

// List inprogress tasks 
export const getInprogressTask = createAction(`[User component] get inprogress task`, props<{page : number}>())
export const getInprogressTaskSuccess = 
createAction(`[User component] get inprogress task success`, props<{tasks : CompleteTask[], total : number}>())
export const getInprogressTaskFailure = createAction(`[User component] get inprogress task failure`, props<{error : any}>())

// List completed tasks
export const getCompletedTask = createAction(`[User component] get completed task`, props<{page : number}>())
export const getCompletedTaskSuccess = 
createAction(`[User component] get completed task success`, props<{tasks : CompleteTask[], total: number}>())
export const getCompletedTaskFailure = createAction(`[User component] get completed task failure`, props<{error : any}>())

// List inprogress schedules 
export const getInprogressSchedule = createAction(`[User component] get inprogress schedule`, props<{page : number}>())
export const getInprogressScheduleSuccess = 
createAction(`[User component] get inprogress schedule success`, props<{meeting : CompleteSchedule[], total: number}>())
export const getInprogressScheduleFailure = createAction(`[User component] get inprogress schedule failure`, props<{error : any}>())

// List completed schedules
export const getCompletedSchedule = createAction(`[User component] get completed schedule`, props<{page : number}>())
export const getCompletedScheduleSuccess = 
createAction(`[User component] get completed schedule success`, props<{meeting : CompleteSchedule[],  total: number}>())
export const getCompletedScheduleFailure = createAction(`[User component] get completed schedule failure`, props<{error : any}>())