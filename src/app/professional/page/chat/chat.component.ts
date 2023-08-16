import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import * as CryptoJS from 'crypto-js';

import { ChatService } from 'src/app/services/chat/chat.service';
import { ProfessionalService } from 'src/app/services/professional/professional.service';
import { ChatData, userData } from 'src/app/user/types/user.types';
import { NotificationService } from 'src/app/services/notification/notification.service';

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

  alreadyMessaged !: ChatData[]

  constructor(
    private socketService: ChatService, 
    private userSerivce : ProfessionalService, 
    private _notificationService : NotificationService,
    private _route: ActivatedRoute,
    private _router : Router) {}
    
  ngOnInit() {
    this.userSerivce.getChats().subscribe(
      (data) =>  {
      this.alreadyMessaged = this.sortData(data)
      this.loading = false;
      },
      (err) => {
        if(err.status == 500) {
          localStorage.setItem('server-error' , 'server-error')
          this._router.navigate(['/professional/server-error'])
        }
      }
    )
    this.userSerivce.getProfessionalData().subscribe(
      (data) => {
        this.userData = data
      },
      (err) => {
        if(err.status == 500) {
          localStorage.setItem('server-error' , 'server-error')
          this._router.navigate(['/professional/server-error'])
        }
      }
    )
    setTimeout(() => {
      this.socketService.setupSocketConnection(this.userData._id as string);
      this._route.params.subscribe((params) => {
        if(params['id']){
          this.CHAT_ROOM = this.decryptString(params['id'])
          this.socketService.join(this.CHAT_ROOM)
          this.userSerivce.getChatHistory(this.CHAT_ROOM).subscribe(
            (data) => {
              this.chatHistory = data,this.chatHistoryLoading = false
            },
            (err) => {
              if(err.status == 500) {
                localStorage.setItem('server-error' , 'server-error')
                this._router.navigate(['/professional/server-error'])
              }
            }
          )
          this.userSerivce.updateReadStatus(this.CHAT_ROOM).subscribe()
        }
      })
      this.socketService.subscribeToMessages((err, data) => {
        const newMessage = data.data?.messages[data.data?.messages?.length - 1]
        const nofificationToken = newMessage.recever.notificationToken
        this._notificationService.pushNotification(
          newMessage.sender.firstName +' '+ newMessage.sender.lastName, 
          newMessage.text,
          nofificationToken,
          newMessage.sender.image
          )
        this.chatHistory?.messages?.push(newMessage)
        this.userSerivce.getChats().subscribe(
          (data) => {
            this.alreadyMessaged = this.sortData(data)
          },
          (err) => {
            if(err.status == 500) {
              localStorage.setItem('server-error' , 'server-error')
              this._router.navigate(['/professional/server-error'])
            }
          }
        )
        this.userSerivce.updateReadStatus(this.CHAT_ROOM).subscribe()
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

  sendMessage() {
    const message = this.message
    const userId = this.userData._id
    const toUserID = this.toUserId
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
