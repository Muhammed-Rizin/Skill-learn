import { Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';

import { ChatService } from 'src/app/services/chat/chat.service';
import { ProfessionalService } from 'src/app/services/professional/professional.service';
import { ChatData, userData } from 'src/app/user/types/user.types';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { professionalData } from '../../types/professional.types';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements  OnInit, OnDestroy{
  secret = "crypto-js"
  
  alreadyMessaged !: ChatData[]

  CHAT_ROOM !: string
  message!: string

  toUserId !: string
  
  professionalData !: professionalData
  toUserData !: userData
  chatHistory!: ChatData;

  loading : boolean = true
  chatHistoryLoading : boolean = true


  page : number = 1
  limit : number = 20
  chatLoading : boolean = false
  totalPages !: number;

  @ViewChild('chatContainer') chatContainer!: ElementRef 

  constructor(
    private _socketService: ChatService, 
    private _professionalService : ProfessionalService, 
    private _notificationService : NotificationService,
    private _route: ActivatedRoute,
    private _router : Router,
    private _renderer2 : Renderer2
  ) {}
    
  ngOnInit() {
    this.handleAlreadyChat()
    this.getProfessionalData()

    setTimeout(() => {
      this._socketService.setupSocketConnection(this.professionalData._id as string);

      this._route.params.subscribe((params) => {
        if(params['id']){
          this.handleRoom(params['id'])
        }
      })

      this.handleMessage()
    }, 1000);

    
  }
  ngOnDestroy() {
    this._socketService.disconnect();
  }

  getProfessionalData() {
    this._professionalService.getProfessionalData().subscribe(
      (data) => {
        this.professionalData = data
      },
      (err) => {
        if(err.status == 500) {
          localStorage.setItem('server-error' , 'server-error')
          this._router.navigate(['/professional/server-error'])
        }
      }
    )
  }

  handleAlreadyChat(){
    this._professionalService.getChats().subscribe(
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
  }

  sortData(data : ChatData[]){
    return data.sort((a,b) => {
      return (
        new Date(b?.messages[b.messages.length - 1]?.time).getTime() - 
        new Date(a?.messages[a.messages.length - 1]?.time).getTime()
      )
    })
  }

  handleRoom(roomId : string){
    if(this.decryptString(roomId) !== this.CHAT_ROOM){
      this.loading = true
    }
    this.CHAT_ROOM = this.decryptString(roomId)
    this._socketService.join(this.CHAT_ROOM)
    const toUserEmail = this.CHAT_ROOM.replace(this.professionalData.email, '')
    this._professionalService.getUserDataByEmail(toUserEmail).subscribe(
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
    this.page = 1
    this.loadChatHistory()
    this.updateStatus(this.CHAT_ROOM)
  }

  loadChatHistory() {
    this.chatLoading = true

    const previousScrollHeight = this.chatContainer?.nativeElement?.scrollHeight;

    this._professionalService.getChatHistory(this.CHAT_ROOM, this.page, this.limit).subscribe(
      (data) => {
        const alreadyUser = this.chatHistory?.users.find((value) => value == this.toUserData._id)
        if(alreadyUser){
          this.chatHistory.messages = [...data.chatData.messages, ...this.chatHistory.messages]

          setTimeout(() => {
            this.scrollPosition(this.chatContainer?.nativeElement?.scrollHeight - previousScrollHeight)
            this.chatLoading = false
            this.loading = false
          },100)
        }else {
          this.chatHistory = data.chatData

          this.loading = false
          this.totalPages =  Math.ceil(data.total / this.limit)
          
          setTimeout(() => {
            this.scrollToBottom()
            this.chatLoading = false
          },100)
        }
      },
      (err) => {
        if(err.status == 500) {
          localStorage.setItem('server-error' , 'server-error')
          this._router.navigate(['/professional/server-error'])
        }
        this.chatLoading = false
        this.loading = false
      }
    )
  }

  updateStatus(roomId : string) {
    this._professionalService.updateReadStatus(roomId).subscribe((data) => {
      this.alreadyMessaged.forEach((value) =>{
        if(value.roomId == roomId){
          value.userRead = true
        }
      })
    })
  }

  handleMessage() {
    this._socketService.subscribeToMessages((err, data) => {
      this.sendNotification(data)
      
      this.chatHistory = data.data
      setTimeout(() => {
        this.scrollToBottom()
        this.chatLoading = false
      },100)
      
      this.handleAlreadyChat()

      this._professionalService.updateReadStatus(this.CHAT_ROOM).subscribe()

    });
  }

  sendNotification(data : { sender: string, text: string, recever: string, data: ChatData }){
    const newMessage = data.data?.messages[data.data?.messages?.length - 1]
    const nofificationToken = newMessage.recever.notificationToken
    this._notificationService.pushNotification(
      newMessage.sender.firstName +' '+ newMessage.sender.lastName, 
      newMessage.text,
      nofificationToken,
      newMessage.sender.image
    )
  }



  sendMessage() {
    const message = this.message
    const userId = this.professionalData._id
    const toUserID = this.toUserId
    if(message.trim().length !== 0){
      this._socketService.sendMessage(
        {message,  roomName : this.CHAT_ROOM, from : userId as string, to : toUserID, type : 'Professional', receverType : 'User'},  
        cb => {
          console.log("ACKNOWLEDGEMENT ", cb);
        })
      this.message = ''
    }
  }

  getUserDetails(chat : ChatData) {
    const data =  chat.messages[0]?.recever?._id === this.professionalData._id ? chat.messages[0]?.sender  : chat.messages[0]?.recever
    this.toUserId = data?._id
    return data
  }

  getRoomId(email : string) {
    if (email) {
      if(email.length > this.professionalData.email?.toString().length ){
        return this.encryptString(`${this.professionalData.email}${email}`)
      }
      return this.encryptString(`${email}${this.professionalData.email}`)
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
  


  private scrollToBottom(): void {
    if(this.chatContainer?.nativeElement){
      this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
    }
  }
  private scrollPosition(scrollHeight : number) : void {
    if(this.chatContainer) {
      this._renderer2.setProperty(this.chatContainer.nativeElement, 'scrollTop', this.chatContainer.nativeElement.scrollTop + scrollHeight);
    }
  }

  moreChat(){
    if (this.page < this.totalPages) {
      this.page++;
      this.loadChatHistory();
    }
  }
}
