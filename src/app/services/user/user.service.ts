import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  ChatData,
  Payment,
  PaymentData,
  Review,
  addReview,
  loginUser,
  registerUserType,
  userData,
} from 'src/app/user/types/user.types';
import { Observable } from 'rxjs';
import {
  CompleteSchedule,
  CompleteTask,
  professionalData,
} from 'src/app/professional/types/professional.types';
import { environment } from 'src/environments/environment';
import { FormGroup } from '@angular/forms';

const httpOptions = {
  headers: new HttpHeaders({
    'content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  userLogin(formData: loginUser): Observable<userData> {
    return this.http.post<userData>(
      `${this.apiUrl}/user/login`,
      formData,
      httpOptions,
    );
  }

  user(): boolean {
    return localStorage.getItem('userJwt') ? true : false;
  }

  checkEmail(email: string): Observable<{ message: string }> {
    return this.http.get<{ message: string }>(
      `${this.apiUrl}/user/checkemail?email=${email}`,
      httpOptions,
    );
  }

  userRegister(data: registerUserType): Observable<userData> {
    return this.http.post<userData>(
      `${this.apiUrl}/user/register`,
      data,
      httpOptions,
    );
  }

  sendForgotPasswordMail(email: string): Observable<string> {
    return this.http.get<string>(
      `${this.apiUrl}/user/forgetpassword?email=${email}`,
      httpOptions,
    );
  }

  getUserDetailsByToken(token: string): Observable<userData> {
    return this.http.get<userData>(
      `${this.apiUrl}/user/forgetpassword/user_details?token=${token}`,
    );
  }

  newPassword(token: string, password: string): Observable<userData> {
    return this.http.post<userData>(
      `${this.apiUrl}/user/newpassword`,
      { token, password },
      httpOptions,
    );
  }

  isBlocked(): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/user/isblocked`, httpOptions);
  }

  getUserData(): Observable<userData> {
    return this.http.get<userData>(`${this.apiUrl}/user/userdata`);
  }

  getProfessionalDataByEmail(email: string): Observable<professionalData> {
    return this.http.get<professionalData>(
      `${this.apiUrl}/user/userdatabyemail?email=${email}`,
      httpOptions,
    );
  }

  getProfessionalDataById(id: string): Observable<professionalData> {
    return this.http.get<professionalData>(
      `${this.apiUrl}/user/professionalData?id=${id}`,
      httpOptions,
    );
  }

  getChats(): Observable<ChatData[]> {
    return this.http.get<ChatData[]>(
      `${this.apiUrl}/user/getchats`,
      httpOptions,
    );
  }

  getChatHistory(
    roomId: string,
    page: number,
    limit: number,
  ): Observable<{ chatData: ChatData; total: number }> {
    return this.http.get<{ chatData: ChatData; total: number }>(
      `${this.apiUrl}/user/getchathistory?roomid=${roomId}&page=${page}&limit=${limit}`,
      httpOptions,
    );
  }

  updateReadStatus(roomId: string) {
    return this.http.patch(
      `${this.apiUrl}/user/messageseen?roomid=${roomId}`,
      httpOptions,
    );
  }

  updateUser(data: userData): Observable<userData> {
    return this.http.patch<userData>(
      `${this.apiUrl}/user/updateuser`,
      { data },
      httpOptions,
    );
  }

  sendVerifyUser(): Observable<{ message: string }> {
    return this.http.get<{ message: string }>(
      `${this.apiUrl}/user/sendverifymail`,
      httpOptions,
    );
  }

  verifyEmail(token: string) {
    return this.http.get(
      `${this.apiUrl}/user/verifyemail?token=${token}`,
      httpOptions,
    );
  }

  paymentSuccess(data: Payment) {
    return this.http.post(
      `${this.apiUrl}/payment/conform`,
      { data },
      httpOptions,
    );
  }

  getProfessionals(): Observable<{
    data: professionalData[];
    totalProfessional: number;
  }> {
    return this.http.get<{
      data: professionalData[];
      totalProfessional: number;
    }>(`${this.apiUrl}/user/professionalsdata`);
  }

  submitFile(image: FormData, id: string) {
    return this.http.post(`${this.apiUrl}/user/uploadimage?id=${id}`, image);
  }

  subscribed(from: string, to: string): Observable<Payment> {
    return this.http.get<Payment>(
      `${this.apiUrl}/payment/subscribed?from=${from}&to=${to}`,
    );
  }

  getInProgressTask(
    page: number,
  ): Observable<{ data: CompleteTask[]; total: number }> {
    return this.http.get<{ data: CompleteTask[]; total: number }>(
      `${this.apiUrl}/user/inprogresstask?page=${page}`,
      httpOptions,
    );
  }

  getCompletedTask(
    page: number,
  ): Observable<{ data: CompleteTask[]; total: number }> {
    return this.http.get<{ data: CompleteTask[]; total: number }>(
      `${this.apiUrl}/user/completedtask?page=${page}`,
      httpOptions,
    );
  }

  taskDone(taskid: string) {
    return this.http.patch(
      `${this.apiUrl}/user/taskdone`,
      { taskid },
      httpOptions,
    );
  }

  getInProgressMeeting(
    page: number,
  ): Observable<{ data: CompleteSchedule[]; total: number }> {
    return this.http.get<{ data: CompleteSchedule[]; total: number }>(
      `${this.apiUrl}/user/inprogressmeeting?page=${page}`,
      httpOptions,
    );
  }
  getCompletedMeeting(
    page: number,
  ): Observable<{ data: CompleteSchedule[]; total: number }> {
    return this.http.get<{ data: CompleteSchedule[]; total: number }>(
      `${this.apiUrl}/user/completedmeeting?page=${page}`,
      httpOptions,
    );
  }

  getPayments(
    page: number,
    limit: number,
  ): Observable<{ data: PaymentData[]; total: number }> {
    return this.http.get<{ data: PaymentData[]; total: number }>(
      `${this.apiUrl}/payment/userhistory?page=${page}&limit=${limit}`,
      httpOptions,
    );
  }

  addReview(data: addReview, id: string) {
    return this.http.post(
      `${this.apiUrl}/review/addreview`,
      { data, id },
      httpOptions,
    );
  }

  getReviews(
    id: string,
    page: number,
  ): Observable<{ data: Review[]; total: number; average: number }> {
    return this.http.get<{ data: Review[]; total: number; average: number }>(
      `${this.apiUrl}/review/getreviews?id=${id}&page=${page}`,
      httpOptions,
    );
  }

  addNotificationToken(token: string) {
    return this.http.patch(
      `${this.apiUrl}/user/setnotification`,
      { token },
      httpOptions,
    );
  }
}
