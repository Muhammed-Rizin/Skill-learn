import { createAction, props } from "@ngrx/store";
import { registerUserType, userData } from "../types/user.types";
import { professionalData } from "src/app/professional/types/professional.types";


// User login
export const loginUser = createAction(`[User Component] Login User`, props<{formData : FormData}>())
export const loginUserSuccess = createAction(`[User Component] Login User Success`, props<{userData : userData}>())
export const loginUserFailure = createAction(`[User Component] Login User Failure`, props<{error : any}>())

// User register
export const registerUser = createAction(`[User Component] Register User`, props<{userData : registerUserType}>())
export const registerUseruccess = createAction(`[User Component] Register User Success`,props<{userData : userData}>())
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

// List professinals
export const getProfessionals = createAction(`[User Component] Professionals `)
export const getProfessionalsSuccess = createAction(`[User Component] Professionals `, props<{professionals : professionalData[]}>())
export const getProfessionalsFailure = createAction(`[User Component] Professionals `, props<{error : any}>())