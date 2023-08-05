import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import * as CryptoJS from 'crypto-js';

import { ChatService } from 'src/app/services/chat/chat.service';
import { UserService } from 'src/app/services/user/user.service';
import { ActivatedRoute } from '@angular/router';
import { ChatData } from '../../types/user.types';
import { professionalData } from 'src/app/professional/types/professional.types';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy{
  secret = "crypto-js"
  CHAT_ROOM !: string
  message!: string
  userId !: string | Observable<String>
  userEmail !: string
  toUserId !: string
  chatHistory!: ChatData;

  alreadyMessaged !: any

  constructor(
    private socketService: ChatService, 
    private userSerivce : UserService, 
    private router: ActivatedRoute) {}
  
  ngOnInit() {
    this.userSerivce.getChats().subscribe((data) =>  {this.alreadyMessaged = data, console.log(this.alreadyMessaged)})
    this.userSerivce.getUserData().subscribe((data) => {this.userId = data._id, this.userEmail = data.email})
    setTimeout(() => {
      this.socketService.setupSocketConnection(this.userId as string);
      this.router.params.subscribe((params) => {
        if(params['id']){
          this.CHAT_ROOM = this.decryptString(params['id'])
          this.socketService.join(this.CHAT_ROOM)
          this.userSerivce.getChatHistory(this.CHAT_ROOM).subscribe((data) => {
            this.chatHistory = data
          })
        }
      })
      this.socketService.subscribeToMessages((err, data) => {
        this.chatHistory?.messages?.push(data.data?.messages[data.data?.messages?.length - 1])
      });
    }, 1000);
    
  }

  ngOnDestroy() {
    this.socketService.disconnect();
  }


  getUserDetails(chat : ChatData) {
    return chat.messages[0]?.recever?._id === this.userId ? chat.messages[0]?.sender  : chat.messages[0]?.recever
  }

  sendMessage() {
    const message = this.message
    const userId = this.userId
    const toUserID = this.toUserId
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
    this.toUserId = email
    console.log(email, this.toUserId)
    if (email) {
      if(email.length > this.userEmail?.toString().length ){
        return this.encryptString(`${this.userEmail}${email}`)
      }
      return this.encryptString(`${email}${this.userEmail}`)
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
