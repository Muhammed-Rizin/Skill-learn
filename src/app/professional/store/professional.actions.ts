import { createAction, props } from "@ngrx/store";
import { professionalData, professionalType } from "../types/professional.types";

export const professionalRegister = 
createAction(`[Professional component] professional register`, props<{professionalData : professionalType}>())
export const professionalRegisterSuccess = 
createAction(`[Professional component] professional register success`, props<{professionalData : professionalData}>())
export const professionalRegisterFailure = createAction(`[Professional component] professional register failure`, props<{error : any}>())


export const professionalLogin = 
createAction(`[Professional component] professional login`, props<{professionalData : professionalType}>())
export const professionalLoginSuccess = 
createAction(`[Professional component] professional login success`, props<{professionalData : professionalData}>())
export const professionalLoginFailure = createAction(`[Professional component] professional register failure`, props<{error : any}>())