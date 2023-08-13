import { Component, OnInit } from '@angular/core';
import { getMessaging, getToken, onMessage } from '@firebase/messaging';
import { environment } from 'src/environment/environment';
import { UserService } from './services/user/user.service';
import { ProfessionalService } from './services/professional/professional.service';
import { NotificationService } from './services/notification/notification.service';
import { msgType } from './user/types/user.types';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  message: msgType | null = null;

  constructor(
    private _userService : UserService,
    private _professionalService : ProfessionalService,
    private _notifcation : NotificationService
  ) {}

  ngOnInit(): void {
    if(localStorage.getItem('userjwt')){
      console.log('hi')
      this.userRequestPermission();
    }
    if(localStorage.getItem('professional_token')){
      this.professionalRequestPermission();
    }
    this.listen();


    this._notifcation.status.subscribe((msg) => {
      if(msg === null){
        this.showToast = false
      }else { 
        this.showToast = true
        this.message = msg
      }
    })
  }
  
  userRequestPermission() {
    const messaging = getMessaging();
    getToken(messaging, { vapidKey: environment.firebase.vapidKey }).then(
      (currentToken) => {
        if (currentToken) {
          if(localStorage.getItem('notification') !== currentToken){
            this._userService.addNotificationToken(currentToken).subscribe(data => {})
          }
          localStorage.setItem('notification', currentToken)
        } else {
          console.log('No registration token available. Request permission to generate one.');
        }
      }
    ).catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
    });
  }

  professionalRequestPermission() {
    const messaging = getMessaging();
    getToken(messaging, { vapidKey: environment.firebase.vapidKey }).then(
      (currentToken) => {
        console.log(currentToken)
        if (currentToken) {
          if(localStorage.getItem('notification') !== currentToken){
            this._professionalService.addNotificationToken(currentToken).subscribe(data => {})
          }
          localStorage.setItem('notification', currentToken)
        } else {
          console.log('No registration token available. Request permission to generate one.');
        }
      }
    ).catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
    });
  }

  listen() {
    const messaging = getMessaging();
    onMessage(messaging, (payload) => {
      console.log('Message received. ', payload);
      this._notifcation.showToast(payload.notification as msgType)
    });
  }


  showToast : boolean = false

}
