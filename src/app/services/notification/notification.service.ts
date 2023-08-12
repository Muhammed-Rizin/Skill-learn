import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const httpOptions = {
  headers : new HttpHeaders({
    'Authorization': "key=AAAAAf8L1ds:APA91bFammQuCkC0HssuSEUd2Fhf74BDT5YXfQElUbjSfF7FX0QCXHCtW-FLhRQ992w0iDrWg6N4BZwqI1UBO116RChBNQcgQPG2UDT2lWUryFd3E6G2YlVfLHxRULq7YxqDjd-egihZ",
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
