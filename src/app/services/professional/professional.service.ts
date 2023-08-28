import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CompleteSchedule, CompleteTask, Schedule, Task, professionalData, professionalType } from 'src/app/professional/types/professional.types';
import { ChatData, Payment, PaymentData, Review, userData } from 'src/app/user/types/user.types';
import { environment } from 'src/environments/environment';

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


  checkEmail(email : string): Observable<{message : string}> {
    return this.http.get<{message : string}>(`${this.apiUrl}/professional/checkemail?email=${email}`, httpOptions)
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

  getChatHistory(roomId : string, page : number, limit : number) : Observable<{chatData : ChatData, total : number}> {
    return this.http.get<{chatData : ChatData, total : number}>(
      `${this.apiUrl}/professional/getchathistory?roomid=${roomId}&page=${page}&limit=${limit}`
      , httpOptions)
  }

  updateReadStatus(roomId : string){
    return this.http.patch(`${this.apiUrl}/professional/messageseen?roomid=${roomId}`, httpOptions)
  }

  sendVerifyUser(): Observable<{message : string}>{
    return this.http.get<{message : string}>(`${this.apiUrl}/professional/sendverifymail`, httpOptions)
  }

  verifyEmail(token : string) {
    return this.http.get(`${this.apiUrl}/professional/verifyemail?token=${token}`, httpOptions)
  }
  submitFile(image : FormData, id : string) {
    return this.http.post(`${this.apiUrl}/professional/uploadimage?id=${id}`,image)
  }

  getSubscribers() : Observable<Payment[]> {
    return this.http.get<Payment[]>(`${this.apiUrl}/professional/getsubscribers`,httpOptions)
  }

  addTask(task : Task) {
    return this.http.post(`${this.apiUrl}/professional/addtask`,{task}, httpOptions)
  }

  getInProgressTask(page : number) : Observable<{data : CompleteTask[], total : number}> {
    return this.http.get<{data : CompleteTask[], total : number}>(`${this.apiUrl}/professional/inprogresstask?page=${page}`, httpOptions)
  }

  getCompletedTask(page : number) : Observable<{data : CompleteTask[], total : number}> {
    return this.http.get<{data : CompleteTask[], total : number}>(`${this.apiUrl}/professional/completedtask?page=${page}`, httpOptions)
  }

  scheduleMeeting(schedule  : Schedule) {
    return this.http.post(`${this.apiUrl}/professional/schedule`,{schedule}, httpOptions)
  }

  getInProgressMeeting(page : number) : Observable<{data : CompleteSchedule[], total : number}> {
    return this.http.get<{data : CompleteSchedule[], total : number}>(`${this.apiUrl}/professional/inprogressmeeting?page=${page}`,httpOptions)
  }
  getCompletedMeeting(page : number) : Observable<{data : CompleteSchedule[], total : number}> {
    return this.http.get<{data : CompleteSchedule[], total : number}>(`${this.apiUrl}/professional/completedmeeting?page=${page}`,httpOptions)
  }

  getPayments(page :number, limit : number) : Observable<{data : PaymentData[], total : number}> {
    return this.http.get<{data : PaymentData[], total : number}>(`${this.apiUrl}/payment/professionalhistory?page=${page}&limit=${limit}`)
  }

  getReviews(id : string, page : number) : Observable<{data : Review[], total : number}> {
    return this.http.get<{data : Review[], total : number}>(`${this.apiUrl}/review/professionalreviews?id=${id}&page=${page}`, httpOptions)
  }

  addNotificationToken(token : string) {
    return this.http.patch(`${this.apiUrl}/professional/setnotification`,{token}, httpOptions)
  }

  meetingDone(id : string) {
    return this.http.patch(`${this.apiUrl}/professional/meetingdone`,{id}, httpOptions)
  }
}
