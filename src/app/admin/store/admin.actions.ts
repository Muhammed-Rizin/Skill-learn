import { createAction, props } from '@ngrx/store';
import {
  Professional,
  User,
  adminData,
  adminLogin,
} from '../types/admin.types';

// Admin login
export const adminLoginAction = createAction(
  `[Admin component] Admin login`,
  props<{ formData: adminLogin }>(),
);
export const adminLoginSuccess = createAction(
  `[Admin component] Admin login success`,
  props<{ adminData: adminData }>(),
);
export const adminLoginFailure = createAction(
  `[Admin component] Admin login failure`,
  props<{ error: any }>(),
);

// Loading total users
export const loadTotalUsers = createAction(`[Admin component] Load total user`);
export const loadTotalUsersSuccess = createAction(
  `[Admin component] Load total user success`,
  props<{ user: User[] }>(),
);
export const loadTotalUsersFailure = createAction(
  `[Admin component] Load total user failure`,
  props<{ error: any }>(),
);

// Load total professionals
export const loadTotalProfessionals = createAction(
  `[Admin component] Load total professionals`,
);
export const loadTotalProfessionalsSuccess = createAction(
  `[Admin component] Load total professionals success`,
  props<{ user: Professional[] }>(),
);
export const loadTotalProfessionalsFailure = createAction(
  `[Admin component] Load total professionals failure`,
  props<{ error: any }>(),
);

// Load total requested professionals
export const loadTotalRequestProfessionals = createAction(
  `[Admin component] Load total Request professionals`,
);
export const loadTotalRequestProfessionalsSuccess = createAction(
  `[Admin component] Load total Request professionals success`,
  props<{ user: Professional[] }>(),
);
export const loadTotalRequestProfessionalsFailure = createAction(
  `[Admin component] Load total Request professionals failure`,
  props<{ error: any }>(),
);

// Load users
export const loadUsers = createAction(
  `[Admin component] Load user`,
  props<{ page: number; limit: number }>(),
);
export const loadUsersSuccess = createAction(
  `[Admin component] Load user success`,
  props<{ user: User[] }>(),
);
export const loadUsersFailure = createAction(
  `[Admin component] Load user failure`,
  props<{ error: any }>(),
);

// Block user
export const userBlocking = createAction(
  `[Admin component] User block`,
  props<{ id: string }>(),
);
export const userBlockingSuccess = createAction(
  `[Admin component] User block success`,
  props<{ id: string }>(),
);
export const userBlockingFailure = createAction(
  `[Admin component] User block failure`,
  props<{ error: any }>(),
);

// Unblock user
export const userUnblocking = createAction(
  `[Admin component] User unblock`,
  props<{ id: string }>(),
);
export const userUnblockingSuccess = createAction(
  `[Admin component] User unblock success`,
  props<{ id: string }>(),
);
export const userUnblockingFailure = createAction(
  `[Admin component] User unblock failure`,
  props<{ error: any }>(),
);

// Load professionals
export const loadProfessionals = createAction(
  `[Admin component] Load professionals`,
  props<{ page: number; limit: number }>(),
);
export const loadProfessionalsSuccess = createAction(
  `[Admin component] Load professionals success`,
  props<{ user: Professional[] }>(),
);
export const loadProfessionalsFailure = createAction(
  `[Admin component] Load professionals failure`,
  props<{ error: any }>(),
);

// Load requested professionals
export const loadRequestProfessionals = createAction(
  `[Admin component] Load Request professionals`,
  props<{ page: number; limit: number }>(),
);
export const loadRequestProfessionalsSuccess = createAction(
  `[Admin component] Load Request professionals success`,
  props<{ user: Professional[] }>(),
);
export const loadRequestProfessionalsFailure = createAction(
  `[Admin component] Load Request professionals failure`,
  props<{ error: any }>(),
);

// Approve Professionals
export const approveProfessionals = createAction(
  `[Admin component] Approve professionals`,
  props<{ id: string }>(),
);
export const approveProfessionalsSuccess = createAction(
  `[Admin component] Approve professionals success`,
  props<{ id: string }>(),
);
export const approveProfessionalsFailure = createAction(
  `[Admin component] Approve professionals failure`,
  props<{ error: any }>(),
);

// Reject Professionals
export const rejectProfessionals = createAction(
  `[Admin component] reject professionals`,
  props<{ id: string }>(),
);
export const rejectProfessionalsSuccess = createAction(
  `[Admin component] reject professionals success`,
  props<{ id: string }>(),
);
export const rejectProfessionalsFailure = createAction(
  `[Admin component] reject professionals failure`,
  props<{ error: any }>(),
);

// Block professional
export const professionalBlocking = createAction(
  `[Admin component] professional block`,
  props<{ id: string }>(),
);
export const professionalBlockingSuccess = createAction(
  `[Admin component] professional block success`,
  props<{ id: string }>(),
);
export const professionalBlockingFailure = createAction(
  `[Admin component] professional block failure`,
  props<{ error: any }>(),
);

// Unblock professional
export const professionalUnblocking = createAction(
  `[Admin component] professional unblock`,
  props<{ id: string }>(),
);
export const professionalUnblockingSuccess = createAction(
  `[Admin component] professional unblock success`,
  props<{ id: string }>(),
);
export const professionalUnblockingFailure = createAction(
  `[Admin component] professional unblock failure`,
  props<{ error: any }>(),
);
