import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { msgType } from 'src/app/user/types/user.types';
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
  ) {}

  status : BehaviorSubject<msgType | null> = new BehaviorSubject<msgType | null>(null)
  

  showToast(message : msgType) {
    this.status.next(message)

    if(!message.data){
      window.setTimeout(() => {
        this.status.next(null)
      }, 3000)
    }
  }

  pushNotification(title : string, body : string, to : string, image : string) {
    const data = {
      notification : {
        title : title,
        body : body,
        icon : image
      },
      to : to
    }
    this.http.post('https://fcm.googleapis.com/fcm/send',data, httpOptions).subscribe()
  }

  pushCall(title : string , body : string, to : string, image : string, roomid : string){
    const data = {
      notification : {
        title : title,
        body : body,
        icon : image
      },
      data :{
        roomId : roomid
      },
      to : to
    }
    this.http.post('https://fcm.googleapis.com/fcm/send',data, httpOptions).subscribe()
  }
}
