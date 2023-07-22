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

  getTotalUsers() : Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/admin/get_totalusers`, httpOptions)
  }

  getTotalProfessionals() : Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/admin/get_totalprofessionals`, httpOptions)
  }

  getTotalRequestProfessionals() : Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/admin/totalprofessional_requests`, httpOptions)
  }

  getUsers(page : number, limit : number) : Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/admin/get_users?page=${page}&limit=${limit}`, httpOptions)
  }

  getProfessionals(page : number, limit : number) : Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/admin/get_professionals?page=${page}&limit=${limit}`, httpOptions)
  }

  getRequestProfessionals(page : number, limit : number) : Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/admin/professional_requests?page=${page}&limit=${limit}`, httpOptions)
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
