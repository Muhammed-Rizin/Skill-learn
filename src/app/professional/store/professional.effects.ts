import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as professionalActions from './professional.actions'
import { catchError, map, mergeMap, of } from "rxjs";
import { ProfessionalService } from "src/app/services/professional/professional.service";
import { professionalData } from "../types/professional.types";
@Injectable()
export class professionalEffects {
    constructor(
        private actions$ : Actions,
        private router : Router,
        private professionalService : ProfessionalService
    ){}

    registerUser$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(professionalActions.professionalRegister),
            mergeMap((payload) => (
                this.professionalService.professionalRegister(payload).pipe(
                    map((data : professionalData) => {
                        localStorage.setItem('professional_token', data.token)
                        this.router.navigate(['/professional'])
                        return professionalActions.professionalRegisterSuccess({professionalData : data})
                }),
                    catchError(error => of(professionalActions.professionalRegisterFailure({error : error.error})))
                )
            ))
        )
    })

    loginUser$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(professionalActions.professionalLogin),
            mergeMap((payload) => 
                this.professionalService.professionalLogin(payload).pipe(
                    map((data : professionalData) => {
                        localStorage.setItem('professional_token',data.token)
                        this.router.navigate(['/professional'])
                        return professionalActions.professionalLoginSuccess({professionalData : data})
                    }),
                    catchError(error => of(professionalActions.professionalLoginFailure({error : error.error})))
                )
            )
        )
    })

    forgetPassword$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(professionalActions.forgotEmailProfessional),
            mergeMap((paylod) => {
                return(
                this.professionalService.sendForgotPasswordMail(paylod.email).pipe(
                    map((message : string) => {
                        return professionalActions.forgotEmailProfessionalSuccess({message})
                    }),
                    catchError(error => of(professionalActions.forgotEmailProfessionalFailure({error : error})))
                )
            )})
        )
    })

    getUserDetails$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(professionalActions.getProfessionalDetails),
            mergeMap((payload) => (
                this.professionalService.getProfessionalDetails(payload.token).pipe(
                    map((user : professionalData) => professionalActions.getProfessionalDetailsSuccess({professionalData : user})),
                    catchError(error => of(professionalActions.getProfessionalDetailsFailure({error : error})))
                )
            ))
        )
    })

    newPassword$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(professionalActions.newPassword),
            mergeMap((payload) => {
                return (
                this.professionalService.newPassword(payload.token, payload.password).pipe(
                    map((user : professionalData) =>{ 
                        localStorage.setItem('professional_token', user.token)
                        this.router.navigate(['/professional'])
                        return professionalActions.newPasswordSuccess({professionalData : user})
                    }),
                    catchError(error => of(professionalActions.newPasswordFailure({error : error})))
                )
            )})
        )
    })

    
    userInprogressTask$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(professionalActions.getInprogressTask),
            mergeMap(() => (
                this.professionalService.getInProgressTask().pipe(
                    map((data ) => professionalActions.getInprogressTaskSuccess({tasks : data})),
                    catchError(error => of(professionalActions.getInprogressTaskFailure({error : error})))
                )
            ))
        )
    })
    userCompletedTask$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(professionalActions.getCompletedTask),
            mergeMap(() => (
                this.professionalService.getCompletedTask().pipe(
                    map((data ) => professionalActions.getCompletedTaskSuccess({tasks : data})),
                    catchError(error => of(professionalActions.getCompletedTaskFailure({error : error})))
                )
            ))
        )
    })


    usersInprogressSchedule$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(professionalActions.getInprogressSchedule),
            mergeMap(() => (
                this.professionalService.getInProgressMeeting().pipe(
                    map((data ) => professionalActions.getInprogressScheduleSuccess({meeting : data})),
                    catchError(error => of(professionalActions.getInprogressScheduleFailure({error : error})))
                )
            ))
        )
    })
    userCompletedSchedules$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(professionalActions.getCompletedSchedule),
            mergeMap(() => (
                this.professionalService.getCompletedMeeting().pipe(
                    map((data ) => professionalActions.getCompletedScheduleSuccess({meeting : data})),
                    catchError(error => of(professionalActions.getCompletedScheduleFailure({error : error})))
                )
            ))
        )
    })
}