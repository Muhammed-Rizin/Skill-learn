import { createAction, props } from "@ngrx/store";
import { registerUserType, userData } from "../types/user.types";

export const loginUser = createAction(`[User Component] Login User`, props<{formData : FormData}>())
export const loginUserSuccess = createAction(`[User Component] Login User Success`, props<{userData : userData}>())
export const loginUserFailure = createAction(`[User Component] Login User Failure`, props<{error : any}>())

export const registerUser = createAction(`[User Component] Register User`, props<{userData : registerUserType}>())
export const registerUseruccess = createAction(`[User Component] Register User Success`,props<{userData : userData}>())
export const registerUserFailure = createAction(`[User Component] Register User Failure`, props<{error : any}>())
