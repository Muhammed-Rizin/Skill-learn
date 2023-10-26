import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, from } from 'rxjs';
import { msgType, notification } from 'src/app/user/types/user.types';
import { environment } from 'src/environments/environment';

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

  pushNotification(title : string, body : string, to : string, image : string, roomId : string,  toUserId : string, fromUserId : string) {
    const data = {
      notification : {
        title : title,
        body : body,
        icon : image
      },
      data : {
        roomId : roomId,
        toUserId : toUserId,
        fromUserID : fromUserId
      },  
      to : to
    }
    
    const notification = {title, body , icon : image, call : false, roomId , to : toUserId, from : fromUserId}
    this.http.post(environment.notificationAPi,data, httpOptions).subscribe()
    this.http.post(`${environment.apiUrl}/notification/newNotification`,{notification}, httpOptions).subscribe()
  }

  pushCall(title : string , body : string, to : string, image : string, roomid : string, toUserId : string, fromUserId : string){
    const data = {
      notification : {
        title : title,
        body : body,
        icon : image
      },
      data :{
        call : true,
        roomId : roomid,
        toUserId : toUserId,
        fromUserId : fromUserId
      },
      to : to
    }

    const notification = {title, body , icon : image, call : true, roomId : roomid , to:  toUserId, from : fromUserId}
    this.http.post(environment.notificationAPi,data, httpOptions).subscribe()
    this.http.post(`${environment.apiUrl}/notification/newNotification`,{notification}, httpOptions).subscribe()
  }

  updateNotification(userId  :string, roomId: string): Observable<{message : string}>{
    return this.http.patch<{message : string}>(`${environment.apiUrl}/notification/updateStatus`,{userId, roomId}, httpOptions)
  }

  getNotification(): Observable<{notifications : notification[]}> {
    return this.http.get<{notifications : notification[]}>(`${environment.apiUrl}/notification/getNotification`, httpOptions)
  }
}
