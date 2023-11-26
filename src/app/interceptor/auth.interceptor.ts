import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
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
      return next.handle(request).pipe(
        tap(
          (event : HttpEvent<any>)=>{},
          (error : any) => {
            if(error instanceof HttpErrorResponse){
              if(error.status === 401){
                localStorage.removeItem('professional_token')
                this.router.navigate(['/professional'])
              }
            }
          } 
        )
      )
      
    }else if (request.url.includes('/fcm')){
      return next.handle(request).pipe(
        tap(
          (event : HttpEvent<any>)=>{},
          (error : any) => {
            if(error instanceof HttpErrorResponse){
              if(error.status === 401){
                localStorage.removeItem('professional_token')
                this.router.navigate(['/professional'])
              }
            }
          } 
        )
      )
    }else {
      const token = localStorage.getItem('userJwt') || localStorage.getItem('professional_token')
      request = request.clone({headers : request.headers.set('authorization', 'Bearer ' + token)})
      return next.handle(request).pipe(
        tap(
          (event : HttpEvent<any>)=>{},
          (error : any) => {
            if(error instanceof HttpErrorResponse){
              if(error.status === 401){
                localStorage.removeItem('userJwt')
                this.router.navigate(['/'])
              }else if(error.status == 500) {
                localStorage.setItem('server-error' , 'server-error')
                this.router.navigate(['/server-error'])
              }
            }
          } 
        )
      )
    }
  }
}
