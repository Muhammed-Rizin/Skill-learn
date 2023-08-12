import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';

const httpOptions = {
  headers : new HttpHeaders({
    'Authorization': environment.Authorization,
    'Content-Type': 'application/json'
  })
};
@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(
    private http : HttpClient
  ) { }

  

  pushNotification(title : string, body : string, to : string) {
    console.log('notification on process')
    const data = {
      notification : {
        title : title,
        body : body
      },
      to : to
    }
      console.log(data)
    this.http.post('https://fcm.googleapis.com/fcm/send',data, httpOptions).subscribe()
  }
}
