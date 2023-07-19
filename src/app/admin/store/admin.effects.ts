import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as adminActions from './admin.actions'
import { catchError, map, mergeMap, of } from "rxjs";
import { AdminService } from "src/app/services/admin/admin.service";
import { User, adminData } from "../types/admin.types";
import { Router } from "@angular/router";

@Injectable()
export class adminEffects {
    constructor(
        private actions$ : Actions,
        private adminService : AdminService,
        private router : Router
    ){}

    login$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(adminActions.adminLogin),
            mergeMap((payload) => 
                this.adminService.adminLogin(payload).pipe(
                    map((adminData : adminData) => {
                        localStorage.setItem('admin_jwt',adminData.token)
                        this.router.navigate(['/admin/dashboard'])
                        return adminActions.adminLoginSuccess({adminData : adminData})
                    }),
                    catchError(error => of(adminActions.adminLoginFailure({error : error.error})))
                )
            )
        )
    })

    loadUsers$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(adminActions.loadUsers),
            mergeMap(() => 
                this.adminService.getUsers().pipe(
                    map((users : User[]) => adminActions.loadUsersSuccess({user : users})),
                    catchError(error => of(adminActions.loadUsersFailure({error})))
                )
            )
        )
    })

    blockUser$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(adminActions.userBlocking),
            mergeMap((paylod) => {
                return this.adminService.blockUser(paylod.id).pipe(
                    map((user : User[]) => adminActions.userBlockingSuccess({user : user})),
                    catchError(error => of(adminActions.userBlockingFailure({error: error})))
                )
            })
        )
    })

    unblockUser$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(adminActions.userunBlocking),
            mergeMap((paylod) => {
                return this.adminService.unblockUser(paylod.id).pipe(
                    map((user : User[]) => adminActions.userunBlockingSuccess({user : user})),
                    catchError(error => of(adminActions.userunBlockingFailure({error: error})))
                )
            })
        )
    })

    loadProfessionals$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(adminActions.loadProfessionals),
            mergeMap(() => 
                this.adminService.getProfessionals().pipe(
                    map((Professionals : User[]) => adminActions.loadProfessionalsSuccess({user : Professionals})),
                    catchError(error => of(adminActions.loadProfessionalsFailure({error})))
                )
            )
        )
    })

    loadRequestProfessionals$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(adminActions.loadRequestProfessionals),
            mergeMap(() => 
                this.adminService.getRequestProfessionals().pipe(
                    map((Professionals : User[]) => adminActions.loadRequestProfessionalsSuccess({user : Professionals})),
                    catchError(error => of(adminActions.loadRequestProfessionalsFailure({error})))
                )
            )
        )
    })

    approveProfessionals$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(adminActions.approveProfessionals),
            mergeMap((paylod) => {
                return this.adminService.approveProfessionals(paylod.id).pipe(
                    map((user : User[]) => adminActions.approveProfessionalsSuccess({user : user})),
                    catchError(error => of(adminActions.approveProfessionalsFailure({error: error})))
                )
            })
        )
    })

    rejectProfessionals$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(adminActions.rejectProfessionals),
            mergeMap((paylod) => {
                return this.adminService.rejectProfessionals(paylod.id).pipe(
                    map((user : User[]) => adminActions.rejectProfessionalsSuccess({user : user})),
                    catchError(error => of(adminActions.rejectProfessionalsFailure({error: error})))
                )
            })
        )
    })

    blockProfessionals$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(adminActions.professionalBlocking),
            mergeMap((paylod) => {
                return this.adminService.blockProfessionals(paylod.id).pipe(
                    map((user : User[]) => adminActions.professionalBlockingSuccess({user : user})),
                    catchError(error => of(adminActions.professionalBlockingFailure({error: error})))
                )
            })
        )
    })

    unblockProfessionals$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(adminActions.professionalunBlocking),
            mergeMap((paylod) => {
                return this.adminService.unblockProfessionals(paylod.id).pipe(
                    map((user : User[]) => adminActions.professionalunBlockingSuccess({user : user})),
                    catchError(error => of(adminActions.professionalunBlockingFailure({error: error})))
                )
            })
        )
    })
}