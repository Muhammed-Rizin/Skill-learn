import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import * as CryptoJS from 'crypto-js';

import { ChatService } from 'src/app/services/chat/chat.service';
import { UserService } from 'src/app/services/user/user.service';
import { ActivatedRoute } from '@angular/router';
import { ChatData, userData } from '../../types/user.types';
import { professionalData } from 'src/app/professional/types/professional.types';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy{
  secret = "crypto-js"
  CHAT_ROOM !: string
  message!: string
  userData !: userData
  toUserId !: string
  toUserData !: professionalData
  chatHistory!: ChatData;
  loading : boolean = true
  chatHistoryLoading : boolean = true

  alreadyMessaged !: ChatData[]

  constructor(
    private socketService: ChatService, 
    private userSerivce : UserService, 
    private _notificationService : NotificationService,
    private router: ActivatedRoute) {}

  ngOnInit() {
    this.userSerivce.getChats().subscribe((data) => {
      this.alreadyMessaged = this.sortData(data)
      this.loading = false;
    })
    this.userSerivce.getUserData().subscribe((data) => this.userData = data)
    setTimeout(() => {
      this.socketService.setupSocketConnection(this.userData._id as string);
      this.router.params.subscribe((params) => {
        if(params['id']){
          this.CHAT_ROOM = this.decryptString(params['id'])
          this.socketService.join(this.CHAT_ROOM)
          const toUserEmail = this.CHAT_ROOM.replace(this.userData.email, '')
          this.userSerivce.getProfessionalDataByEmail(toUserEmail).subscribe((data) => this.toUserData = data)
          this.userSerivce.getChatHistory(this.CHAT_ROOM).subscribe((data) => {this.chatHistory = data, console.log(data)})
        }
      })
      this.socketService.subscribeToMessages((err, data) => {
        const newMessage = data.data?.messages[data.data?.messages?.length - 1]
        console.log(newMessage);
        const nofificationToken = newMessage.recever.notificationToken
        this._notificationService.pushNotification(
          newMessage.sender.firstName +' '+ newMessage.sender.lastName, 
          newMessage.text,
          nofificationToken,
          newMessage.sender.image
          )
        this.chatHistory = data.data
        this.userSerivce.getChats().subscribe((data) => {this.alreadyMessaged = this.sortData(data)})
      });
    }, 1000);
    
  }

  ngOnDestroy() {
    this.socketService.disconnect();
  }

  sortData(data : ChatData[]){
    return data.sort((a,b) => {
      return (
        new Date(b?.messages[b.messages.length - 1]?.time).getTime() - 
        new Date(a?.messages[a.messages.length - 1]?.time).getTime()
      )
    })
  }


  getUserDetails(chat : ChatData) {
    const data =  chat.messages[0]?.recever?._id === this.userData._id ? chat.messages[0]?.sender  : chat.messages[0]?.recever
    this.toUserId = data._id
    return data
  }

  sendMessage() {
    const message = this.message
    const userId = this.userData._id
    const toUserID = this.toUserData._id
    if(message.trim().length !== 0){
      this.socketService.sendMessage(
        {message,  roomName : this.CHAT_ROOM, from : userId as string, to : toUserID, type : 'User', receverType : 'Professional'},  
        cb => {
          console.log("ACKNOWLEDGEMENT ", cb);
        })
      this.message = ''
    }
  }

  getRoomId(email : string) {
    if (email) {
      if(email.length > this.userData.email?.toString().length ){
        return this.encryptString(`${this.userData.email}${email}`)
      }
      return this.encryptString(`${email}${this.userData.email}`)
    }
    return null
  }

  getChattedUserId(chat: any): string {
    const chattedUserIds = chat.users.filter((userId: string) => userId !== this.userData._id);
    return chattedUserIds[0];
  }

  encryptString(roomId : string) {
    return CryptoJS.AES.encrypt(roomId, this.secret).toString();
  }

  decryptString(roomId : string) {
    const bytes = CryptoJS.AES.decrypt(roomId, this.secret);
    return bytes.toString(CryptoJS.enc.Utf8);
  }
  
  @ViewChild('chatContainer') chatContainer!: ElementRef 
  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
  }

  isChatActive: boolean = true;
  toggleChatHistory() {
    this.isChatActive = !this.isChatActive;
  }

}
