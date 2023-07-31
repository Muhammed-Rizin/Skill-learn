import { Injectable } from '@angular/core'
import * as UserActions from "./user.action"
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { catchError, map, mergeMap, of } from 'rxjs'
import { UserService } from 'src/app/services/user/user.service'
import { registerUserType, userData } from '../types/user.types'
import { Router } from '@angular/router'

@Injectable()
export class UserEffects {
    constructor(
        private actions$ : Actions,
        private userService : UserService,
        private router : Router
    ){}


    loginUser$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(UserActions.loginUser),
            mergeMap((payload) => 
                this.userService.userLogin(payload).pipe(
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
            mergeMap((payload ) => (
                this.userService.userRegister(payload).pipe(
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

    getUserDetails$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(UserActions.getUserDetails),
            mergeMap((payload) => (
                this.userService.getUserDetails(payload.token).pipe(
                    map((user : userData) => UserActions.getUserDetailsSuccess({userData : user})),
                    catchError(error => of(UserActions.getUserDetailsFailure({error : error})))
                )
            ))
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
    
}