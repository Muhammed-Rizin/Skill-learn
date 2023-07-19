import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User, adminData, adminLogin } from 'src/app/admin/types/admin.types';

const httpOptions = {
  headers: new HttpHeaders({
    'content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root'
})

export class AdminService {
  apiUrl : string = 'http://localhost:5000'
  constructor(
    private http : HttpClient
  ) {}

  adminLogin(formData : adminLogin) : Observable<adminData> {
    return this.http.post<adminData>(`${this.apiUrl}/admin/login`,formData, httpOptions)
  }

  adminLogined() : boolean {
    return localStorage.getItem('admin_jwt') ? true : false
  }

  getUsers() : Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/admin/get_users`, httpOptions)
  }

  getProfessionals() : Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/admin/get_professionals`, httpOptions)
  }

  getRequestProfessionals() : Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/admin/professional_requests`, httpOptions)
  }

  blockUser(id : string) : Observable<User[]> {
    return this.http.patch<User[]>(`${this.apiUrl}/admin/blockUser`, {id : id}, httpOptions)
  }

  unblockUser(id : string) : Observable<User[]> {
    return this.http.patch<User[]>(`${this.apiUrl}/admin/unblockUser`, {id : id}, httpOptions)
  }

  approveProfessionals(id : string) : Observable<User[]>{
    return this.http.patch<User[]>(`${this.apiUrl}/admin/approveprofessionals`, {id : id}, httpOptions)
  }
  rejectProfessionals(id : string) : Observable<User[]> {
    return this.http.patch<User[]>(`${this.apiUrl}/admin/rejectprofessionals`, {id : id}, httpOptions)
  }

  blockProfessionals(id : string) : Observable<User[]> {
    return this.http.patch<User[]>(`${this.apiUrl}/admin/blockprofessionals`, {id : id}, httpOptions)
  }

  unblockProfessionals(id : string) : Observable<User[]> {
    return this.http.patch<User[]>(`${this.apiUrl}/admin/unblockprofessionals`, {id : id}, httpOptions)
  }
  
}
