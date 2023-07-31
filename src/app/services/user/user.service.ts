import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ChatData, Payment, loginUser, registerUserType, userData } from 'src/app/user/types/user.types';
import { Observable } from 'rxjs';
import { professionalData } from 'src/app/professional/types/professional.types';

const httpOptions = {
  headers: new HttpHeaders({
    'content-Type': 'application/json',
  }),
};


@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl : string = 'http://localhost:5000'
  
  constructor(private http : HttpClient) { }

  userLogin(formData : loginUser) : Observable<userData> {
    return this.http.post<userData>(`${this.apiUrl}/user/login`,formData, httpOptions)
  }

  user() : boolean {
    return localStorage.getItem('userjwt') ? true : false
  }


  userRegister(data : registerUserType) : Observable<userData>{
    return this.http.post<userData>(`${this.apiUrl}/user/register`, data, httpOptions)
  }

  sendForgotPasswordMail(email : string) : Observable<string> {
    return this.http.get<string>(`${this.apiUrl}/user/forgetpassword?email=${email}`, httpOptions)
  }


  getUserDetails(token : string) : Observable<userData> {
    return this.http.get<userData>(`${this.apiUrl}/user/forgetpassword/user_details?token=${token}`)
  }

  newPassword(token : string, password : string) : Observable<userData> {
    return this.http.post<userData>(`${this.apiUrl}/user/newpassword`, {token,password}, httpOptions)
  }

  isBlocked() : Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/user/isblocked`, httpOptions)
  }

  getUserData() : Observable<userData> {
    return this.http.get<userData>(`${this.apiUrl}/user/userdata`)
  }

  getUserDataByEmail(email :string) : Observable<professionalData> {
    return this.http.get<professionalData>(`${this.apiUrl}/user/userdatabyemail?email=${email}`, httpOptions)
  }

  // type
  getChats() : Observable<ChatData> {
    return this.http.get<ChatData>(`${this.apiUrl}/user/getchats`, httpOptions)
  }

  getChatHistory(roomId : string) : Observable<ChatData> {
    return this.http.get<ChatData>(`${this.apiUrl}/user/getchathistory?roomid=${roomId}`, httpOptions)
  }

  updateUser(data: userData) : Observable<userData> {
    return this.http.patch<userData>(`${this.apiUrl}/user/updateuser`,{data}, httpOptions)
  }

  sendVerifyUser(){
    return this.http.get(`${this.apiUrl}/user/sendverifymail`, httpOptions)
  }

  verifyEmail(token : string) {
    return this.http.get(`${this.apiUrl}/user/verifyemail?token=${token}`, httpOptions)
  }

  paymentSuccess(data : Payment) {
    return this.http.post(`${this.apiUrl}/payment/conform`,{data}, httpOptions)
  }
}
