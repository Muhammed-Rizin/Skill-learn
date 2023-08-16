import { ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import * as CryptoJS from 'crypto-js';

import { ChatService } from 'src/app/services/chat/chat.service';
import { UserService } from 'src/app/services/user/user.service';
import { ActivatedRoute, Router } from '@angular/router';
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
    private router: ActivatedRoute,
    private _router : Router
  ) {}

  ngOnInit() {
    this.userSerivce.getChats().subscribe(
      (data) => {
        this.alreadyMessaged = this.sortData(data)
        this.loading = false;
      },
      (err) => {
        if(err.status == 500) {
          localStorage.setItem('server-error' , 'server-error')
          this._router.navigate(['/server-error'])
        }
      })

    this.userSerivce.getUserData().subscribe(
      (data) =>{
        this.userData = data
      },
      (err) => {
        if(err.status == 500) {
          localStorage.setItem('server-error' , 'server-error')
          this._router.navigate(['/server-error'])
        }
      }
    )
    
    setTimeout(() => {
      this.socketService.setupSocketConnection(this.userData._id as string);
      
      this.socketService.subscribeToMessages((err, data) => this.handleMessage(data));

      this.router.params.subscribe((params) => {
        if(params['id']){
          this.handleRoom(params['id'])
        }
      })
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

  handleRoom(roomId : string) {
    this.CHAT_ROOM = this.decryptString(roomId)

    this.socketService.join(this.CHAT_ROOM)

    const toUserEmail = this.CHAT_ROOM.replace(this.userData.email, '')
    this.userSerivce.getProfessionalDataByEmail(toUserEmail).subscribe(
      (data) => {
        this.toUserData = data
      },
      (err) => {
        if(err.status == 500) {
          localStorage.setItem('server-error' , 'server-error')
          this._router.navigate(['/server-error'])
        }
      }
    )

    this.userSerivce.getChatHistory(this.CHAT_ROOM).subscribe(
      (data) => {
        this.chatHistory = data
      },
      (err) => {
        if(err.status == 500) {
          localStorage.setItem('server-error' , 'server-error')
          this._router.navigate(['/server-error'])
        }
      }
    )
    this.updateStatus(this.CHAT_ROOM)
  }

  handleMessage(data : { sender: string, text: string, recever: string, data: ChatData }) {
    const newMessage = data.data?.messages[data.data?.messages?.length - 1]
    const nofificationToken = newMessage.recever.notificationToken
    this._notificationService.pushNotification(
      newMessage.sender.firstName +' '+ newMessage.sender.lastName, 
      newMessage.text,
      nofificationToken,
      newMessage.sender.image
      )
    this.chatHistory = data.data
    this.userSerivce.getChats().subscribe(
      (data) => {
        this.alreadyMessaged = this.sortData(data)
      },
      (err) => {
        if(err.status == 500) {
          localStorage.setItem('server-error' , 'server-error')
          this._router.navigate(['/server-error'])
        }
      }
    )
    this.userSerivce.updateReadStatus(this.CHAT_ROOM).subscribe()
  }

  updateStatus(roomId : string) {
    this.userSerivce.updateReadStatus(roomId).subscribe((data) => {
      this.alreadyMessaged.forEach((value) =>{
        if(value.roomId == roomId){
          value.userRead = true
        }
      })
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
    if(this.chatContainer) {
      this.chatContainer.nativeElement.scrollTop = this.chatContainer?.nativeElement?.scrollHeight;
    }
  }
}
