import { createAction, props } from "@ngrx/store";
import { registerUserType, userData } from "../types/user.types";

export const loginUser = createAction(`[User Component] Login User`, props<{formData : FormData}>())
export const loginUserSuccess = createAction(`[User Component] Login User Success`, props<{userData : userData}>())
export const loginUserFailure = createAction(`[User Component] Login User Failure`, props<{error : any}>())

export const registerUser = createAction(`[User Component] Register User`, props<{userData : registerUserType}>())
export const registerUseruccess = createAction(`[User Component] Register User Success`,props<{userData : userData}>())
export const registerUserFailure = createAction(`[User Component] Register User Failure`, props<{error : any}>())

export const forgotEmailUser = createAction('[User Component] Forgot password', props<{email : string}>())
export const forgotEmailUserSuccess = createAction('[User Component] Forgot password success', props<{message  : string}>())
export const forgotEmailUserFailure = createAction('[User Component] Forgot password failure', props<{error : any}>())

export const getUserDetails = createAction('[User Component] Get details', props<{token : string}>())
export const getUserDetailsSuccess = createAction('[User Component] Get details success', props<{userData  : userData}>())
export const getUserDetailsFailure = createAction('[User Component] Get details failure', props<{error : any}>())

export const newPassword = createAction('[User Component] New password', props<{token : string, password : string}>())
export const newPasswordSuccess = createAction('[User Component] New password success', props<{userData : userData}>())
export const newPasswordFailure = createAction('[User Component] New password failure', props<{error : any}>())