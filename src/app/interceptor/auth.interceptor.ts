import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor( private router : Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if(request.url.includes('/admin')){
      const token = localStorage.getItem('admin_jwt')
      request = request.clone({headers : request.headers.set('authorization', 'Bearer ' + token)})
      return next.handle(request).pipe(
        tap(
          (event : HttpEvent<any>)=>{},
          (error : any) => {
            if(error instanceof HttpErrorResponse){
              if(error.status === 401){
                localStorage.removeItem('admin_jwt')
                this.router.navigate(['/admin'])
              }
            }
          } 
        )
      )

    }else if (request.url.includes('/professional')){
      const token = localStorage.getItem('professional_token')
      request = request.clone({headers : request.headers.set('authorization', 'Bearer ' + token)})
      return next.handle(request);
      
    }else {
      const token = localStorage.getItem('userjwt')
      request = request.clone({headers : request.headers.set('authorization', 'Bearer ' + token)})
      return next.handle(request).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            // Unauthorized error
            // Perform any necessary actions, such as redirecting to the login page
          } else if (error.status === 404) {
            // Not found error
            // Display a friendly message to the user
          } else {
            // Other error
            // Handle the error based on your application's requirements
          }
  
          // You can also re-throw the error to allow the error to propagate to the subscriber
          return throwError(error);
        })
      )
    }
  }
}
