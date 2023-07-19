import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { professionalData, professionalType } from 'src/app/professional/types/professional.types';

const httpOptions = {
  headers: new HttpHeaders({
    'content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root'
})
export class ProfessionalService {

  apiUrl : string = 'http://localhost:5000'
  constructor(private http : HttpClient) { }

  professionalRegister(data : professionalType) : Observable<professionalData>{
    return this.http.post<professionalData>(`${this.apiUrl}/professional/register`,data, httpOptions)
  }
  professionalLogin(data : professionalType) : Observable<professionalData>{
    console.log(data, 'pro services')
    return this.http.post<professionalData>(`${this.apiUrl}/professional/login`,data, httpOptions)
  }
}
