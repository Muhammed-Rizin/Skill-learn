import { Component, OnInit } from '@angular/core';
import { getMessaging, getToken, onMessage } from '@firebase/messaging';
import { environment } from 'src/environments/environment';
import { UserService } from './services/user/user.service';
import { ProfessionalService } from './services/professional/professional.service';
import { NotificationService } from './services/notification/notification.service';
import { data, msgType, notification } from './user/types/user.types';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  message: msgType | null = null;
  secret = environment.crypto_secret

  constructor(
    private _userService : UserService,
    private _professionalService : ProfessionalService,
    private _notification : NotificationService,
    private _router : Router,
  ) {}

  ngOnInit(): void {
    this.requestPermission()
    this.listen();


    this._notification.status.subscribe((msg) => {
      if(msg === null){
        this.showToast = false
      }else { 
        this.showToast = true
        this.message = msg
      }
    })
  }
  
  requestPermission() {
    const messaging = getMessaging();
    getToken(messaging, { vapidKey: environment.firebase.vapidKey }).then(
      (currentToken) => {
        if (currentToken) {
          if(localStorage.getItem('userJwt')){
            if(localStorage.getItem('notification') !== currentToken){
              this._userService.addNotificationToken(currentToken).subscribe(data => {})
            }
          }else if(localStorage.getItem('professional_token')){
            if(localStorage.getItem('notification') !== currentToken){
              this._professionalService.addNotificationToken(currentToken).subscribe(data => {})
            }
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
      const data : msgType= {
        notification : payload.notification as notification,
        data : payload.data as {roomId : string}
      }
      this._notification.showToast(data)
    });
  }

  accept() {
    this.showToast = false
  }
  reject() {
    this.showToast = false
  }


  showToast : boolean = false

  
  
  
}
