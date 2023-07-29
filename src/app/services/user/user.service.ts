import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ChatData, loginUser, registerUserType, userData } from 'src/app/user/types/user.types';
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

  sendForgotPasswordMail(email : string) : Observable<string> {
    return this.http.get<string>(`${this.apiUrl}/forgetpassword?email=${email}`, httpOptions)
  }


  getUserDetails(token : string) : Observable<userData> {
    return this.http.get<userData>(`${this.apiUrl}/forgetpassword/user_details?token=${token}`)
  }

  newPassword(token : string, password : string) : Observable<userData> {
    return this.http.post<userData>(`${this.apiUrl}/newpassword`, {token,password}, httpOptions)
  }

  isBlocked() : Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/isblocked`, httpOptions)
  }

  getUserData() : Observable<userData> {
    console.log('Data')
    return this.http.get<userData>(`${this.apiUrl}/userdata`)
  }

  getUserDataByEmail(email :string) : Observable<userData> {
    return this.http.get<userData>(`${this.apiUrl}/userdatabyemail?email=${email}`, httpOptions)
  }

  // type
  getChats() : Observable<ChatData> {
    return this.http.get<ChatData>(`${this.apiUrl}/getchats`, httpOptions)
  }

  getChatHistory(roomId : string) : Observable<ChatData> {
    return this.http.get<ChatData>(`${this.apiUrl}/getchathistory?roomid=${roomId}`, httpOptions)
  }
}
