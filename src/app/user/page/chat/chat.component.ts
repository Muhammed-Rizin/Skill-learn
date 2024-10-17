import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  Renderer2,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Observable } from 'rxjs';
import * as CryptoJS from 'crypto-js';

import { ChatService } from 'src/app/services/chat/chat.service';
import { UserService } from 'src/app/services/user/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ChatData, Message, userData } from '../../types/user.types';
import { professionalData } from 'src/app/professional/types/professional.types';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit, OnDestroy {
  secret = environment.crypto_secret;

  alreadyMessaged!: ChatData[];

  CHAT_ROOM!: string;
  message!: string;

  userData!: userData;
  toUserData!: professionalData;
  chatHistory!: ChatData;

  loading: boolean = true;

  page: number = 1;
  limit: number = 20;
  chatLoading: boolean = false;
  totalPages!: number;

  constructor(
    private _socketService: ChatService,
    private _userService: UserService,
    private _notificationService: NotificationService,
    private router: ActivatedRoute,
    private _router: Router,
    private renderer2: Renderer2,
  ) {}

  ngOnInit() {
    this.handleAlreadyChat();
    this.getUserData();

    setTimeout(() => {
      this._socketService.setupSocketConnection(this.userData?._id as string);

      this._socketService.subscribeToMessages((err, data) =>
        this.handleMessage(data),
      );
      this.router.params.subscribe((params) => {
        if (params['id']) {
          this.handleRoom(params['id']);
        }
      });
    }, 1000);
  }

  ngOnDestroy() {
    this._socketService.disconnect();
  }

  handleAlreadyChat() {
    this._userService.getChats().subscribe(
      (data) => {
        this.alreadyMessaged = this.sortData(data);
        this.loading = false;
      },
      (err) => {
        if (err.status == 500) {
          localStorage.setItem('server-error', 'server-error');
          this._router.navigate(['/server-error']);
        }
      },
    );
  }

  sortData(data: ChatData[]) {
    return data.sort((a, b) => {
      return (
        new Date(b?.messages[b.messages.length - 1]?.time).getTime() -
        new Date(a?.messages[a.messages.length - 1]?.time).getTime()
      );
    });
  }

  getUserData() {
    this._userService.getUserData().subscribe(
      (data) => {
        this.userData = data;
      },
      (err) => {
        if (err.status == 500) {
          localStorage.setItem('server-error', 'server-error');
          this._router.navigate(['/server-error']);
        }
      },
    );
  }

  handleRoom(roomId: string) {
    if (roomId !== this.CHAT_ROOM) {
      this.loading = true;
    }
    console.log(roomId);
    this.CHAT_ROOM = roomId;
    console.log(this.CHAT_ROOM, ' to', this.userData.email);

    this._socketService.join(this.CHAT_ROOM);

    const toUserId = this.CHAT_ROOM.replace(this.userData._id, '');
    this._userService.getProfessionalDataById(toUserId).subscribe(
      (data) => {
        this.toUserData = data;
      },
      (err) => {
        if (err.status == 500) {
          localStorage.setItem('server-error', 'server-error');
          this._router.navigate(['/server-error']);
        }
      },
    );
    this.page = 1;
    this.loadChatHistory();
    this.updateStatus(this.CHAT_ROOM);
  }

  loadChatHistory() {
    this.chatLoading = true;
    const previousScrollHeight =
      this.chatContainer?.nativeElement?.scrollHeight;

    this._userService
      .getChatHistory(this.CHAT_ROOM, this.page, this.limit)
      .subscribe(
        (data) => {
          const alreadyUser = this.chatHistory?.users.find(
            (value) => value == this.toUserData?._id,
          );
          if (alreadyUser) {
            this.chatHistory.messages = [
              ...data.chatData.messages,
              ...this.chatHistory.messages,
            ];

            setTimeout(() => {
              this.scrollPosition(
                this.chatContainer?.nativeElement?.scrollHeight -
                  previousScrollHeight,
              );
              this.chatLoading = false;
              this.loading = false;
            }, 100);
          } else {
            this.chatHistory = data.chatData;
            this.loading = false;
            this.totalPages = Math.ceil(data.total / this.limit);
            this.loading = false;

            setTimeout(() => {
              this.scrollToBottom();
              this.chatLoading = false;
            }, 100);
          }
        },
        (err) => {
          if (err.status == 500) {
            localStorage.setItem('server-error', 'server-error');
            this._router.navigate(['/server-error']);
          }
          this.chatLoading = false;
          this.loading = false;
          this.totalPages = 0;
          this.page = 0;
        },
      );
  }

  handleMessage(data: {
    sender: string;
    text: string;
    receiver: string;
    data: ChatData;
  }) {
    const newMessage = data.data?.messages[data.data?.messages?.length - 1];
    this.sendNotification(newMessage);

    this.chatHistory = data.data;
    this.updateStatus(this.CHAT_ROOM);

    setTimeout(() => {
      this.scrollToBottom();
      this.chatLoading = false;
    }, 100);

    this.handleAlreadyChat();

    this._userService.updateReadStatus(this.CHAT_ROOM).subscribe();
  }

  updateStatus(roomId: string) {
    this._userService.updateReadStatus(roomId).subscribe((data) => {
      this.alreadyMessaged.forEach((value) => {
        if (value.roomId == roomId) {
          value.userRead = true;
        }
      });
    });
    this._notificationService
      .updateNotification(this.userData._id, roomId)
      .subscribe();
  }

  getUserDetails(chat: ChatData) {
    const data =
      chat.messages[0]?.receiver?._id === this.userData._id
        ? chat.messages[0]?.sender
        : chat.messages[0]?.receiver;
    return data;
  }

  sendMessage() {
    const message = this.message;
    const userId = this.userData._id;
    const toUserID = this.toUserData._id;
    if (message.trim().length !== 0) {
      this._socketService.sendMessage(
        {
          message,
          roomName: this.CHAT_ROOM,
          from: userId as string,
          to: toUserID,
          type: 'User',
          receiverType: 'Professional',
        },
        (cb) => {},
      );
      this.message = '';
    }
  }

  sendNotification(newMessage: Message) {
    const notificationToken = newMessage.receiver.notificationToken;
    this._notificationService.pushNotification(
      newMessage.sender.firstName + ' ' + newMessage.sender.lastName,
      newMessage.text,
      notificationToken,
      newMessage.sender.image,
      this.CHAT_ROOM,
      this.toUserData._id,
      newMessage.sender._id,
    );
  }

  getRoomId(_id: string) {
    if (_id) {
      return `${_id}${this.userData._id}`;
    }
    return null;
  }

  @ViewChild('chatContainer') chatContainer!: ElementRef;
  ngAfterViewChecked(): void {}

  private scrollToBottom(): void {
    if (this.chatContainer) {
      this.chatContainer.nativeElement.scrollTop =
        this.chatContainer?.nativeElement?.scrollHeight;
    }
  }

  private scrollPosition(scrollHeight: number): void {
    if (this.chatContainer) {
      this.renderer2.setProperty(
        this.chatContainer.nativeElement,
        'scrollTop',
        this.chatContainer.nativeElement.scrollTop + scrollHeight,
      );
    }
  }

  onScroll() {
    if (this.page < this.totalPages) {
      this.page++;
      this.loadChatHistory();
    }
  }
}
