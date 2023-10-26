import { Injectable } from '@angular/core'
import * as UserActions from "./user.action"
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { catchError, map, mergeMap, of } from 'rxjs'
import { UserService } from 'src/app/services/user/user.service'
import { registerUserType, userData } from '../types/user.types'
import { Router } from '@angular/router'
import { professionalData } from 'src/app/professional/types/professional.types'

@Injectable()
export class UserEffects {
    constructor(
        private actions$ : Actions,
        private userService : UserService,
        private router : Router
    ){}


    loginUser$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(UserActions.loginUseraction),
            mergeMap((payload) => 
                this.userService.userLogin(payload.data).pipe(
                    map((users : userData) => {
                        localStorage.setItem('userjwt',users.token)
                        this.router.navigate(['/'])
                        return UserActions.loginUserSuccess({userData : users})
                    }),
                    catchError(error => of(UserActions.loginUserFailure({error : error.error})))
                )
            )
        )
    })
    registerUser$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(UserActions.registerUser),
            mergeMap((payload) => (
                this.userService.userRegister(payload.userData).pipe(
                    map((users : userData) => {
                        localStorage.setItem('userjwt', users.token)
                        this.router.navigate(['/'])
                        return UserActions.registerUseruccess({userData : users})
                }),
                    catchError(error => of(UserActions.registerUserFailure({error : error.error})))
                )
            ))
        )
    })

    forgetPassword$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(UserActions.forgotEmailUser),
            mergeMap((paylod) => {
                return(
                this.userService.sendForgotPasswordMail(paylod.email).pipe(
                    map((message : string) => {
                        return UserActions.forgotEmailUserSuccess({message})
                    }),
                    catchError(error => of(UserActions.forgotEmailUserFailure({error : error})))
                )
            )})
        )
    })

    newPassword$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(UserActions.newPassword),
            mergeMap((payload) => {
                return (
                this.userService.newPassword(payload.token, payload.password).pipe(
                    map((user : userData) =>{ 
                        localStorage.setItem('userjwt', user.token)
                        this.router.navigate(['/'])
                        return UserActions.newPasswordSuccess({userData : user})
                    }),
                    catchError(error => of(UserActions.newPasswordFailure({error : error})))
                )
            )})
        )
    })


    getUserDetailsByToken$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(UserActions.getUserDetailsByToken),
            mergeMap((payload) => (
                this.userService.getUserDetailsByToken(payload.token).pipe(
                    map((user : userData) => UserActions.getUserDetailsByTokenSuccess({userData : user})),
                    catchError(error => of(UserActions.getUserDetailsByTokenFailure({error : error})))
                )
            ))
        )
    })

    getProfessionalData$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(UserActions.getProfessionalData),
            mergeMap((payload) => {
                return this.userService.getProfessionalDataByEmail(payload.email).pipe(
                    map((user : professionalData) => UserActions.getProfessionalDataSuccess({userData : user})),
                    catchError(error => of(UserActions.getProfessionalDataFailure({error : error})))
                )
            })
        )
    })

    professionalList$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(UserActions.getProfessionals),
            mergeMap((payload) => (
                this.userService.getProfessionals().pipe(
                    map((data ) => UserActions.getProfessionalsSuccess({professionals : data.data})),
                    catchError(error => of(UserActions.getProfessionalsFailure({error : error})))
                )
            ))
        )
    })
    
    userInprogressTask$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(UserActions.getInprogressTask),
            mergeMap((payload) => (
                this.userService.getInProgressTask(payload.page).pipe(
                    map((data ) => UserActions.getInprogressTaskSuccess({tasks : data.data, total : data.total})),
                    catchError(error => of(UserActions.getInprogressTaskFailure({error : error})))
                )
            ))
        )
    })
    userCompletedTask$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(UserActions.getCompletedTask),
            mergeMap((payload) => (
                this.userService.getCompletedTask(payload.page).pipe(
                    map((data ) => UserActions.getCompletedTaskSuccess({tasks : data.data, total : data.total})),
                    catchError(error => of(UserActions.getCompletedTaskFailure({error : error})))
                )
            ))
        )
    })


    usersInprogressSchedule$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(UserActions.getInprogressSchedule),
            mergeMap((payload) => (
                this.userService.getInProgressMeeting(payload.page).pipe(
                    map((data ) => {
                        return UserActions.getInprogressScheduleSuccess({meeting : data.data, total : data.total})}),
                    catchError(error => of(UserActions.getInprogressScheduleFailure({error : error})))
                )
            ))
        )
    })
    userCompletedSchedules$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(UserActions.getCompletedSchedule),
            mergeMap((payload) => (
                this.userService.getCompletedMeeting(payload.page).pipe(
                    map((data ) => UserActions.getCompletedScheduleSuccess({meeting : data.data, total : data.total})),
                    catchError(error => of(UserActions.getCompletedScheduleFailure({error : error})))
                )
            ))
        )
    })
}