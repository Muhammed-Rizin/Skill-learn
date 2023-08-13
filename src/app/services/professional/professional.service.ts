import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CompleteSchedule, CompleteTask, Schedule, Task, professionalData, professionalType } from 'src/app/professional/types/professional.types';
import { ChatData, Payment, PaymentData, Review, userData } from 'src/app/user/types/user.types';
import { environment } from 'src/environment/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root'
})
export class ProfessionalService {

  apiUrl : string = environment.apiUrl
  constructor(private http : HttpClient) { }

  professionalRegister(data : professionalType) : Observable<professionalData>{
    return this.http.post<professionalData>(`${this.apiUrl}/professional/register`,data, httpOptions)
  }
  professionalLogin(data : professionalType) : Observable<professionalData>{
    return this.http.post<professionalData>(`${this.apiUrl}/professional/login`,data, httpOptions)
  }

  sendForgotPasswordMail(email : string) : Observable<string> {
    return this.http.get<string>(`${this.apiUrl}/professional/forgetpassword?email=${email}`, httpOptions)
  }


  getProfessionalDetails(token : string) : Observable<professionalData> {
    return this.http.get<professionalData>(`${this.apiUrl}/professional/forgetpassword/professional_details?token=${token}`, httpOptions)
  }

  newPassword(token : string, password : string) : Observable<professionalData> {
    return this.http.post<professionalData>(`${this.apiUrl}/professional/newpassword`, {token,password}, httpOptions)
  }

  isBlocked() : Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/professional/isblocked`, httpOptions)
  }

  isApproved() : Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/professional/isapproved`, httpOptions)
  }

  updateProfessional(data : professionalData) : Observable<professionalData> {
    return this.http.patch<professionalData>(`${this.apiUrl}/professional/updateprofessional`,{data}, httpOptions)
  }

  getProfessionalData() : Observable<professionalData> {
    return this.http.get<professionalData>(`${this.apiUrl}/professional/professionaldata`)
  }

  getUserDataByEmail(email :string) : Observable<professionalData> {
    return this.http.get<professionalData>(`${this.apiUrl}/professional/userdatabyemail?email=${email}`, httpOptions)
  }

  getChats() : Observable<ChatData[]> {
    return this.http.get<ChatData[]>(`${this.apiUrl}/professional/getchats`, httpOptions)
  }

  getChatHistory(roomId : string) : Observable<ChatData> {
    return this.http.get<ChatData>(`${this.apiUrl}/professional/getchathistory?roomid=${roomId}`, httpOptions)
  }

  sendVerifyUser(){
    return this.http.get(`${this.apiUrl}/professional/sendverifymail`, httpOptions)
  }

  verifyEmail(token : string) {
    return this.http.get(`${this.apiUrl}/professional/verifyemail?token=${token}`, httpOptions)
  }
  submitFile(image : FormData, id : string) {
    console.log(image)
    return this.http.post(`${this.apiUrl}/professional/uploadimage?id=${id}`,image)
  }

  getSubscribers() : Observable<Payment[]> {
    return this.http.get<Payment[]>(`${this.apiUrl}/professional/getsubscribers`,httpOptions)
  }

  addTask(task : Task) {
    return this.http.post(`${this.apiUrl}/professional/addtask`,{task}, httpOptions)
  }

  getInProgressTask() : Observable<CompleteTask[]> {
    return this.http.get<CompleteTask[]>(`${this.apiUrl}/professional/inprogresstask`, httpOptions)
  }

  getCompletedTask() : Observable<CompleteTask[]> {
    return this.http.get<CompleteTask[]>(`${this.apiUrl}/professional/completedtask`, httpOptions)
  }

  scheduleMeeting(schedule  : Schedule) {
    console.log(schedule);
    return this.http.post(`${this.apiUrl}/professional/schedule`,{schedule}, httpOptions)
  }

  getInProgressMeeting() : Observable<CompleteSchedule[]> {
    return this.http.get<CompleteSchedule[]>(`${this.apiUrl}/professional/inprogressmeeting`,httpOptions)
  }
  getCompletedMeeting() : Observable<CompleteSchedule[]> {
    return this.http.get<CompleteSchedule[]>(`${this.apiUrl}/professional/completedmeeting`,httpOptions)
  }

  getPayments() : Observable<PaymentData[]> {
    return this.http.get<PaymentData[]>(`${this.apiUrl}/payment/professionalhistory`)
  }

  getReviews(id : string) : Observable<Review[]> {
    return this.http.get<Review[]>(`${this.apiUrl}/review/professionalreviews?id=${id}`, httpOptions)
  }

  addNotificationToken(token : string) {
    return this.http.patch(`${this.apiUrl}/professional/setnotification`,{token}, httpOptions)
  }
}
