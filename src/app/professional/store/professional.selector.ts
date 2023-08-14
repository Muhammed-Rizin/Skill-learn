import { createFeatureSelector, createSelector } from "@ngrx/store"
import { CompleteSchedule, CompleteTask, ScheduleInitialState, State, taskInitialState } from "../types/professional.types"

export const selectRegisterState = createFeatureSelector<State>('registerProfessionalState')
export const selectRegisterError = createSelector(selectRegisterState, state => (state?.error?.message))
export const selectRegisterUserData = createSelector(selectRegisterState, state => state.user)
export const selectRegisterLoading = createSelector(selectRegisterState, state => state.loading)

export const selectLoginState = createFeatureSelector<State>('loginProfessionalState')
export const selectLoginError = createSelector(selectLoginState, state => (state?.error?.message))
export const selectLoginUserData = createSelector(selectLoginState, state => (state.user))
export const selectLoginLoading = createSelector(selectLoginState, state => (state.loading))

export const selectForgotPasswordState = createFeatureSelector<State>('professionalForgotPasswordState')
export const selectForgotPasswordError = createSelector(selectForgotPasswordState, state => (state?.error?.error?.message))
export const selectForgotPasswordMessage = createSelector(selectForgotPasswordState, state => state?.message?.message)
export const selectForgotPasswordLoading = createSelector(selectForgotPasswordState, state => state.loading)

export const selectInprogressTaskState = createFeatureSelector<taskInitialState>('professionalInprogressTask')
export const selectInprogressTaskData = createSelector(selectInprogressTaskState, state => (state.tasks as CompleteTask[]))
export const selectInprogressTaskError = createSelector(selectInprogressTaskState, state => (state.error?.message))
export const selectInprogressTaskLoading = createSelector(selectInprogressTaskState, state => (state.loading))
export const selectInprogressTotalTask = createSelector(selectInprogressTaskState, state => (state.total))

export const selectCompletedTaskState = createFeatureSelector<taskInitialState>('professionalCompletedTask')
export const selectCompletedTaskData = createSelector(selectCompletedTaskState, state => (state.tasks as CompleteTask[]))
export const selectCompletedTaskError = createSelector(selectCompletedTaskState, state => (state.error?.message))
export const selectCompletedTaskLoading = createSelector(selectCompletedTaskState, state => (state.loading))
export const selectCompletedTotalTask = createSelector(selectCompletedTaskState, state => (state.total))

export const selectInprogressScheduleState = createFeatureSelector<ScheduleInitialState>('professionalInprogressSchedule')
export const selectInprogressScheduleData = createSelector(selectInprogressScheduleState, state => (state.meeting as CompleteSchedule[]))
export const selectInprogressScheduleError = createSelector(selectInprogressScheduleState, state => (state.error?.message))
export const selectInprogressScheduleLoading = createSelector(selectInprogressScheduleState, state => (state.loading))
export const selectInprogressTotalSchedule = createSelector(selectInprogressScheduleState, state => (state.total))

export const selectCompletedScheduleState = createFeatureSelector<ScheduleInitialState>('professionalCompletedSchedule')
export const selectCompletedScheduleData = createSelector(selectCompletedScheduleState, state => (state.meeting as CompleteSchedule[]))
export const selectCompletedScheduleError = createSelector(selectCompletedScheduleState, state => (state.error?.message))
export const selectCompletedScheduleLoading = createSelector(selectCompletedScheduleState, state => (state.loading))
export const selectCompletedTotalSchedule = createSelector(selectCompletedScheduleState, state => (state.total))