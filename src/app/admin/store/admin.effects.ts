import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as adminActions from './admin.actions';
import { catchError, map, mergeMap, of } from 'rxjs';
import { AdminService } from 'src/app/services/admin/admin.service';
import { User, adminData } from '../types/admin.types';
import { Router } from '@angular/router';

@Injectable()
export class adminEffects {
  constructor(
    private actions$: Actions,
    private adminService: AdminService,
    private router: Router,
  ) {}

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(adminActions.adminLoginAction),
      mergeMap((payload) =>
        this.adminService.adminLogin(payload.formData).pipe(
          map((adminData: adminData) => {
            localStorage.setItem('admin_jwt', adminData.token);
            this.router.navigate(['/admin/dashboard']);
            return adminActions.adminLoginSuccess({ adminData: adminData });
          }),
          catchError((error) =>
            of(adminActions.adminLoginFailure({ error: error.error })),
          ),
        ),
      ),
    );
  });

  loadTotalUsers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(adminActions.loadTotalUsers),
      mergeMap(() =>
        this.adminService.getTotalUsers().pipe(
          map((users) => adminActions.loadTotalUsersSuccess({ user: users })),
          catchError((error) =>
            of(adminActions.loadTotalUsersFailure({ error })),
          ),
        ),
      ),
    );
  });

  loadTotalProfessionals$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(adminActions.loadTotalProfessionals),
      mergeMap(() =>
        this.adminService.getTotalProfessionals().pipe(
          map((Professionals) =>
            adminActions.loadTotalProfessionalsSuccess({ user: Professionals }),
          ),
          catchError((error) =>
            of(adminActions.loadTotalProfessionalsFailure({ error })),
          ),
        ),
      ),
    );
  });

  loadTotalRequestProfessionals$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(adminActions.loadTotalRequestProfessionals),
      mergeMap(() =>
        this.adminService.getTotalRequestProfessionals().pipe(
          map((Professionals) =>
            adminActions.loadTotalRequestProfessionalsSuccess({
              user: Professionals,
            }),
          ),
          catchError((error) =>
            of(adminActions.loadTotalRequestProfessionalsFailure({ error })),
          ),
        ),
      ),
    );
  });

  loadUsers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(adminActions.loadUsers),
      mergeMap((payload) => {
        return this.adminService.getUsers(payload.page, payload.limit).pipe(
          map((users) => adminActions.loadUsersSuccess({ user: users })),
          catchError((error) => of(adminActions.loadUsersFailure({ error }))),
        );
      }),
    );
  });

  blockUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(adminActions.userBlocking),
      mergeMap((payload) => {
        return this.adminService.blockUser(payload.id).pipe(
          map((id) => adminActions.userBlockingSuccess({ id: id })),
          catchError((error) =>
            of(adminActions.userBlockingFailure({ error: error })),
          ),
        );
      }),
    );
  });

  unblockUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(adminActions.userUnblocking),
      mergeMap((payload) => {
        return this.adminService.unblockUser(payload.id).pipe(
          map((id) => adminActions.userUnblockingSuccess({ id: id })),
          catchError((error) =>
            of(adminActions.userUnblockingFailure({ error: error })),
          ),
        );
      }),
    );
  });

  loadProfessionals$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(adminActions.loadProfessionals),
      mergeMap((payload) =>
        this.adminService.getProfessionals(payload.page, payload.limit).pipe(
          map((Professionals) =>
            adminActions.loadProfessionalsSuccess({ user: Professionals }),
          ),
          catchError((error) =>
            of(adminActions.loadProfessionalsFailure({ error })),
          ),
        ),
      ),
    );
  });

  loadRequestProfessionals$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(adminActions.loadRequestProfessionals),
      mergeMap((payload) =>
        this.adminService
          .getRequestProfessionals(payload.page, payload.limit)
          .pipe(
            map((Professionals) =>
              adminActions.loadRequestProfessionalsSuccess({
                user: Professionals,
              }),
            ),
            catchError((error) =>
              of(adminActions.loadRequestProfessionalsFailure({ error })),
            ),
          ),
      ),
    );
  });

  approveProfessionals$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(adminActions.approveProfessionals),
      mergeMap((payload) => {
        return this.adminService.approveProfessionals(payload.id).pipe(
          map((id) => adminActions.approveProfessionalsSuccess({ id: id.id })),
          catchError((error) =>
            of(adminActions.approveProfessionalsFailure({ error: error })),
          ),
        );
      }),
    );
  });

  rejectProfessionals$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(adminActions.rejectProfessionals),
      mergeMap((payload) => {
        return this.adminService.rejectProfessionals(payload.id).pipe(
          map((id) => adminActions.rejectProfessionalsSuccess({ id: id })),
          catchError((error) =>
            of(adminActions.rejectProfessionalsFailure({ error: error })),
          ),
        );
      }),
    );
  });

  blockProfessionals$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(adminActions.professionalBlocking),
      mergeMap((payload) => {
        return this.adminService.blockProfessionals(payload.id).pipe(
          map((id) => adminActions.professionalBlockingSuccess({ id: id })),
          catchError((error) =>
            of(adminActions.professionalBlockingFailure({ error: error })),
          ),
        );
      }),
    );
  });

  unblockProfessionals$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(adminActions.professionalUnblocking),
      mergeMap((payload) => {
        return this.adminService.unblockProfessionals(payload.id).pipe(
          map((id) => adminActions.professionalUnblockingSuccess({ id: id })),
          catchError((error) =>
            of(adminActions.professionalUnblockingFailure({ error: error })),
          ),
        );
      }),
    );
  });
}
