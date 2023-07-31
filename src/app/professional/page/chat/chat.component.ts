import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ChatService } from 'src/app/services/chat/chat.service';
import { ProfessionalService } from 'src/app/services/professional/professional.service';
import { ChatData } from 'src/app/user/types/user.types';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements  OnInit, OnDestroy{
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
    private userSerivce : ProfessionalService, 
    private router: ActivatedRoute) {}
  
  ngOnInit() {
    this.userSerivce.getChats().subscribe((data) =>  {this.alreadyMessaged = data})
    this.userSerivce.getProfessionalData().subscribe((data) => {this.userId = data._id, this.userEmail = data.email})
    setTimeout(() => {
      this.socketService.setupSocketConnection(this.userId as string);
      this.router.params.subscribe((params) => {
        if(params['id']){
          this.CHAT_ROOM = params['id']
          this.socketService.join(this.CHAT_ROOM)
          this.userSerivce.getChatHistory(this.CHAT_ROOM).subscribe((data) => {this.chatHistory = data})
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

  sendMessage() {
    const message = this.message
    const userId = this.userId
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

  getChattedUserName(chat: any): string {
    const sender = chat.messages[0]?.sender?._id;
    const recever = chat.messages[0]?.recever?._id;

    const chattedUserId = sender === this.userId ? recever : sender;
    const chattedUser = sender === chattedUserId
      ? chat.messages[0]?.sender?.firstName
      : chat.messages[0]?.recever?.firstName;

    return chattedUser || 'Unknown';
  }

  getChattedUserEmail(chat: any): string {
    const sender = chat.messages[0]?.sender?._id;
    const recever = chat.messages[0]?.recever?._id;

    const chattedUserId = sender === this.userId ? recever : sender;
    const chattedUser = sender === chattedUserId
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
}
