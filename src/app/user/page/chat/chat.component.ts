import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import * as CryptoJS from 'crypto-js';

import { ChatService } from 'src/app/services/chat/chat.service';
import { UserService } from 'src/app/services/user/user.service';
import { ActivatedRoute } from '@angular/router';
import { ChatData } from '../../types/user.types';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy{
  secret = "crypto-js is powerfull"
  CHAT_ROOM !: string
  message!: string
  userId !: string | Observable<String>
  userEmail !: string
  toUserId !: string
  chatHistory!: ChatData;

  // Removable
  toFrom = this.formBuilder.group({
    to: "",
  });

  alreadyMessaged !: any

  constructor(
    private socketService: ChatService, private userSerivce : UserService, 
    private formBuilder: FormBuilder, private router: ActivatedRoute) {}

  // submitUser(){
  //   const token = this.toFrom.get("to")?.value;
  //   if (token) {
  //     token.length > this.userEmail.toString().length ? this.CHAT_ROOM = `${this.userEmail}${token}` 
  //     : this.CHAT_ROOM = `${token}${this.userEmail}`
  //     this.userSerivce.getUserDataByEmail(token).subscribe((data) => this.toUserId = data._id)
  //   }
  //   this.socketService.join(this.CHAT_ROOM)
  // }
  
  ngOnInit() {
    this.userSerivce.getChats().subscribe((data) =>  {this.alreadyMessaged = data})
    this.userSerivce.getUserData().subscribe((data) => {this.userId = data._id, this.userEmail = data.email})
    setTimeout(() => {
      this.socketService.setupSocketConnection(this.userId as string);
      this.router.params.subscribe((params) => {
        console.log(params['id'])
        if(params['id']){
          this.CHAT_ROOM = params['id']
          this.socketService.join(this.CHAT_ROOM)
          this.userSerivce.getChatHistory(this.CHAT_ROOM).subscribe((data) => {this.chatHistory = data, console.log(this.chatHistory)})
        }
      })
      this.socketService.subscribeToMessages((err, data) => {
        console.log(this.chatHistory)
        this.chatHistory?.messages?.push(data.data?.messages[data.data?.messages?.length - 1])
        console.log(this.chatHistory)
      });
    }, 1000);

    
  }

  

  ngOnDestroy() {
    this.socketService.disconnect();
  }

  sendMessage() {
    const message = this.message
    const userId = this.userId
    const toUserID = this.toUserId
    console.log(toUserID, userId, message, this.CHAT_ROOM)
    if(message.trim().length !== 0){
      this.socketService.sendMessage(
        {message,  roomName : this.CHAT_ROOM, from : userId as string, to : toUserID, type : 'User', receverType : 'Professional'},  cb => {
        console.log("ACKNOWLEDGEMENT ", cb);
      })
      this.message = ''
    }
  }

  getChattedUserName(chat: any): string {
    const sender = chat.messages[0]?.sender?._id;
    const recever = chat.messages[0]?.recever?._id;

    const chattedUserId = sender === this.alreadyMessaged ? recever : sender;
    const chattedUser = chat.messages[0]?.sender?._id !== chattedUserId
      ? chat.messages[0]?.sender?.firstName
      : chat.messages[0]?.recever?.firstName;

    return chattedUser || 'Unknown';
  }

  getChattedUserEmail(chat: any): string {
    const sender = chat.messages[0]?.sender?._id;
    const recever = chat.messages[0]?.recever?._id;

    const chattedUserId = sender === this.alreadyMessaged ? recever : sender;
    const chattedUser = chat.messages[0]?.sender?._id !== chattedUserId
      ? chat.messages[0]?.sender?.email
      : chat.messages[0]?.recever?.email;
      this.toUserId = this.getChattedUserId(chat)
    return chattedUser || 'Unknown';
  }

  getRoomId(email : string) {
    if (email) {
      if(email.length > this.userEmail?.toString().length ){
        return `${this.userEmail}${email}`
      }
      return `${email}${this.userEmail}`

      // return email.length > this.userEmail.toString().length ?`${this.userEmail}${email}`: `${email}${this.userEmail}`
      // this.userSerivce.getUserDataByEmail(email).subscribe((data) => this.toUserId = data._id)
    }
    return null
  }

  getChattedUserId(chat: any): string {
    const chattedUserIds = chat.users.filter((userId: string) => userId !== this.userId);
    return chattedUserIds[0];
  }

  encryptString(roomId : string) {
    return CryptoJS.AES.encrypt(roomId, this.secret).toString();
  }

  decryptString(roomId : string) {
    const bytes = CryptoJS.AES.decrypt(roomId, this.secret);
    return bytes.toString(CryptoJS.enc.Utf8);
  }
  
}
