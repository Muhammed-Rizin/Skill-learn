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

}