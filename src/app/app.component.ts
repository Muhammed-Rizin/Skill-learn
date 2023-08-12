import { Component, OnInit } from '@angular/core';
import { getMessaging, getToken, onMessage } from '@firebase/messaging';
import { environment } from 'src/environment/environment';
import { UserService } from './services/user/user.service';
import { ProfessionalService } from './services/professional/professional.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  message: any = null;

  constructor(
    private _userService : UserService,
    private _professionalService : ProfessionalService
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
      this.message = payload;
    });

    // change into in app message
  }
}
