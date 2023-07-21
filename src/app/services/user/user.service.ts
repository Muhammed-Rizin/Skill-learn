import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { loginUser, registerUserType, userData } from 'src/app/user/types/user.types';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'content-Type': 'application/json',
  }),
};


@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl : string = 'http://localhost:5000/user'
  
  constructor(private http : HttpClient) { }

  userLogin(formData : loginUser) : Observable<userData> {
    return this.http.post<userData>(`${this.apiUrl}/login`,formData, httpOptions)
  }

  user() : boolean {
    return localStorage.getItem('userjwt') ? true : false
  }


  userRegister(data : registerUserType) : Observable<userData>{
    return this.http.post<userData>(`${this.apiUrl}/register`, data, httpOptions)
  }
}
