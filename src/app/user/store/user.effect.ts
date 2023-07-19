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
}