import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as CryptoJS from 'crypto-js';

import { ChatService } from 'src/app/services/chat/chat.service';
import { ProfessionalService } from 'src/app/services/professional/professional.service';
import { ChatData, userData } from 'src/app/user/types/user.types';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements  OnInit, OnDestroy{
  secret = "crypto-js"
  CHAT_ROOM !: string
  message!: string
  userData !: userData
  toUserId !: string
  chatHistory!: ChatData;
  loading : boolean = true
  chatHistoryLoading : boolean = true

  alreadyMessaged !: any

  constructor(
    private socketService: ChatService, 
    private userSerivce : ProfessionalService, 
    private router: ActivatedRoute) {}
    
  ngOnInit() {
    this.userSerivce.getChats().subscribe((data) =>  {this.alreadyMessaged = data, this.loading = false})
    this.userSerivce.getProfessionalData().subscribe((data) => {this.userData = data})
    setTimeout(() => {
      this.socketService.setupSocketConnection(this.userData._id as string);
      this.router.params.subscribe((params) => {
        if(params['id']){
          this.CHAT_ROOM = this.decryptString(params['id'])
          this.socketService.join(this.CHAT_ROOM)
          this.userSerivce.getChatHistory(this.CHAT_ROOM).subscribe((data) => {
            this.chatHistory = data,
            this.chatHistoryLoading = false
          })
        }
      })
      this.socketService.subscribeToMessages((err, data) => {
        const newMessage = data.data?.messages[data.data?.messages?.length - 1]
        console.log(newMessage);
        this.chatHistory?.messages?.push(newMessage)
      });
    }, 1000);

    
  }

  ngOnDestroy() {
    this.socketService.disconnect();
  }

  sendMessage() {
    const message = this.message
    const userId = this.userData._id
    const toUserID = this.toUserId
    console.log(toUserID)
    if(message.trim().length !== 0){
      this.socketService.sendMessage(
        {message,  roomName : this.CHAT_ROOM, from : userId as string, to : toUserID, type : 'Professional', receverType : 'User'},  
        cb => {
          console.log("ACKNOWLEDGEMENT ", cb);
        })
      this.message = ''
    }
  }

  getUserDetails(chat : ChatData) {
    const data =  chat.messages[0]?.recever?._id === this.userData._id ? chat.messages[0]?.sender  : chat.messages[0]?.recever
    this.toUserId = data._id
    return data
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
    if(this.chatContainer?.nativeElement){
      this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
    }
  }
}
