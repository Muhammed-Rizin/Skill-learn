import { createReducer, on } from '@ngrx/store';
import { User, initialStateType } from '../types/admin.types';
import * as adminActions from './admin.actions';

export const initialState: initialStateType = {
  user: null,
  loaded: false,
  loading: false,
  error: null,
};

export const adminLoginReducer = createReducer(
  initialState,
  on(adminActions.adminLoginAction, (state, { formData }) => ({
    ...state,
    loading: true,
  })),
  on(adminActions.adminLoginSuccess, (state, { adminData }) => ({
    ...state,
    loading: false,
    loaded: true,
    user: adminData,
  })),
  on(adminActions.adminLoginFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
);

export const loadTotalUserReducer = createReducer(
  initialState,
  on(adminActions.loadTotalUsers, (state) => ({ ...state, loading: true })),
  on(adminActions.loadTotalUsersSuccess, (state, { user }) => ({
    ...state,
    loaded: true,
    loading: false,
    user: user as User[],
  })),
  on(adminActions.loadTotalUsersFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
);

export const loadTotalProfessionalsReducer = createReducer(
  initialState,
  on(adminActions.loadTotalProfessionals, (state) => ({
    ...state,
    loading: true,
  })),
  on(adminActions.loadTotalProfessionalsSuccess, (state, { user }) => ({
    ...state,
    loaded: true,
    loading: false,
    user,
  })),
  on(adminActions.loadTotalProfessionalsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
);

export const loadTotalRequestProfessionalReducer = createReducer(
  initialState,
  on(adminActions.loadTotalRequestProfessionals, (state) => ({
    ...state,
    loading: true,
  })),
  on(adminActions.loadTotalRequestProfessionalsSuccess, (state, { user }) => ({
    ...state,
    loaded: true,
    loading: false,
    user,
  })),
  on(adminActions.loadTotalRequestProfessionalsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
);

export const loadUsersReducer = createReducer(
  initialState,
  on(adminActions.loadUsers, (state, { page, limit }) => ({
    ...state,
    loading: true,
  })),
  on(adminActions.loadUsersSuccess, (state, { user }) => ({
    ...state,
    loaded: true,
    loading: false,
    user,
  })),
  on(adminActions.loadUsersFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(adminActions.userBlocking, (state, { id }) => ({
    ...state,
    loading: true,
  })),
  on(adminActions.userBlockingSuccess, (state, { id }) => ({
    ...state,
    loaded: true,
    loading: false,
    user: (state?.user as User[]).map((user) =>
      user._id == id ? { ...user, blocked: true } : user,
    ),
  })),
  on(adminActions.userBlockingFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(adminActions.userUnblocking, (state, { id }) => ({
    ...state,
    loading: true,
  })),
  on(adminActions.userUnblockingSuccess, (state, { id }) => ({
    ...state,
    loaded: true,
    loading: false,
    user: (state?.user as User[]).map((user) =>
      user._id == id ? { ...user, blocked: false } : user,
    ),
  })),
  on(adminActions.userUnblockingFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
);

export const loadProfessionalsReducer = createReducer(
  initialState,
  on(adminActions.loadProfessionals, (state, { page, limit }) => ({
    ...state,
    loading: true,
  })),
  on(adminActions.loadProfessionalsSuccess, (state, { user }) => ({
    ...state,
    loaded: true,
    loading: false,
    user,
  })),
  on(adminActions.loadProfessionalsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(adminActions.professionalBlocking, (state, { id }) => ({
    ...state,
    loading: true,
  })),
  on(adminActions.professionalBlockingSuccess, (state, { id }) => ({
    ...state,
    loaded: true,
    loading: false,
    user: (state?.user as User[]).map((user) =>
      user._id == id ? { ...user, blocked: true } : user,
    ),
  })),
  on(adminActions.professionalBlockingFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(adminActions.professionalUnblocking, (state, { id }) => ({
    ...state,
    loading: true,
  })),
  on(adminActions.professionalUnblockingSuccess, (state, { id }) => ({
    ...state,
    loaded: true,
    loading: false,
    user: (state?.user as User[]).map((user) =>
      user._id == id ? { ...user, blocked: false } : user,
    ),
  })),
  on(adminActions.professionalBlockingFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
);

export const loadRequestedProfessionalsReducer = createReducer(
  initialState,
  on(adminActions.loadRequestProfessionals, (state, { page, limit }) => ({
    ...state,
    loading: true,
  })),
  on(adminActions.loadRequestProfessionalsSuccess, (state, { user }) => ({
    ...state,
    loaded: true,
    loading: false,
    user,
  })),
  on(adminActions.loadRequestProfessionalsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(adminActions.approveProfessionals, (state, { id }) => ({
    ...state,
    loading: true,
  })),
  on(adminActions.approveProfessionalsSuccess, (state, { id }) => ({
    ...state,
    loaded: true,
    loading: false,
    user: (state?.user as User[]).filter((user) => user._id !== id),
  })),
  on(adminActions.approveProfessionalsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(adminActions.rejectProfessionals, (state, { id }) => ({
    ...state,
    loading: true,
  })),
  on(adminActions.rejectProfessionalsSuccess, (state, { id }) => ({
    ...state,
    loaded: true,
    loading: false,
    user: (state?.user as User[]).map((user) =>
      user._id == id ? { ...user, rejected: true } : user,
    ),
  })),
  on(adminActions.rejectProfessionalsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
);
