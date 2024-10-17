import { createAction, props } from '@ngrx/store';
import {
  CompleteSchedule,
  CompleteTask,
  professionalData,
  professionalType,
} from '../types/professional.types';

export const professionalRegister = createAction(
  `[Professional component] professional register`,
  props<{ professionalData: professionalType }>(),
);
export const professionalRegisterSuccess = createAction(
  `[Professional component] professional register success`,
  props<{ professionalData: professionalData }>(),
);
export const professionalRegisterFailure = createAction(
  `[Professional component] professional register failure`,
  props<{ error: any }>(),
);

export const professionalLogin = createAction(
  `[Professional component] professional login`,
  props<{ professionalData: professionalType }>(),
);
export const professionalLoginSuccess = createAction(
  `[Professional component] professional login success`,
  props<{ professionalData: professionalData }>(),
);
export const professionalLoginFailure = createAction(
  `[Professional component] professional register failure`,
  props<{ error: any }>(),
);

export const forgotEmailProfessional = createAction(
  '[Professional Component] Forgot password',
  props<{ email: string }>(),
);
export const forgotEmailProfessionalSuccess = createAction(
  '[Professional Component] Forgot password success',
  props<{ message: string }>(),
);
export const forgotEmailProfessionalFailure = createAction(
  '[Professional Component] Forgot password failure',
  props<{ error: any }>(),
);

export const getProfessionalDetails = createAction(
  '[Professional Component] Get details',
  props<{ token: string }>(),
);
export const getProfessionalDetailsSuccess = createAction(
  '[Professional Component] Get details success',
  props<{ professionalData: professionalData }>(),
);
export const getProfessionalDetailsFailure = createAction(
  '[Professional Component] Get details failure',
  props<{ error: any }>(),
);

export const newPassword = createAction(
  '[Professional Component] New password',
  props<{ token: string; password: string }>(),
);
export const newPasswordSuccess = createAction(
  '[Professional Component] New password success',
  props<{ professionalData: professionalData }>(),
);
export const newPasswordFailure = createAction(
  '[Professional Component] New password failure',
  props<{ error: any }>(),
);

// List inprogress tasks
export const getInprogressTask = createAction(
  `[Professional component] get inprogress task`,
  props<{ page: number }>(),
);
export const getInprogressTaskSuccess = createAction(
  `[Professional component] get inprogress task success`,
  props<{ tasks: CompleteTask[]; total: number }>(),
);
export const getInprogressTaskFailure = createAction(
  `[Professional component] get inprogress task failure`,
  props<{ error: any }>(),
);

// List completed tasks
export const getCompletedTask = createAction(
  `[Professional component] get completed task`,
  props<{ page: number }>(),
);
export const getCompletedTaskSuccess = createAction(
  `[Professional component] get completed task success`,
  props<{ tasks: CompleteTask[]; total: number }>(),
);
export const getCompletedTaskFailure = createAction(
  `[Professional component] get completed task failure`,
  props<{ error: any }>(),
);

// List inprogress schedules
export const getInprogressSchedule = createAction(
  `[Professional component] get inprogress schedule`,
  props<{ page: number }>(),
);
export const getInprogressScheduleSuccess = createAction(
  `[Professional component] get inprogress schedule success`,
  props<{ meeting: CompleteSchedule[]; total: number }>(),
);
export const getInprogressScheduleFailure = createAction(
  `[Professional component] get inprogress schedule failure`,
  props<{ error: any }>(),
);

// List completed schedules
export const getCompletedSchedule = createAction(
  `[Professional component] get completed schedule`,
  props<{ page: number }>(),
);
export const getCompletedScheduleSuccess = createAction(
  `[Professional component] get completed schedule success`,
  props<{ meeting: CompleteSchedule[]; total: number }>(),
);
export const getCompletedScheduleFailure = createAction(
  `[Professional component] get completed schedule failure`,
  props<{ error: any }>(),
);
