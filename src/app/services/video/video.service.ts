import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { sendMessageType } from 'src/app/professional/types/professional.types';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class VideoService {
  socket!: Socket;

  constructor() {}

  setupSocketConnection(userId: string) {
    this.socket = io(environment.apiUrl, { auth: { userId } });
  }

  join(roomName: string) {
    if (this.socket) {
      this.socket.emit('join', roomName);
    }
  }

  newUserJoined(room: string, to: string, from: string) {
    this.socket.emit('new-call', { room, to, from });
  }

  disconnect(roomId: string) {
    if (this.socket) {
      this.socket.emit('disconnect-user', roomId);
    }
  }

  sendMessage(message: sendMessageType, roomId: string) {
    this.socket.emit('send-message', { message, roomId });
  }

  receiveMessage = (cb: (err: any, data: sendMessageType) => void) => {
    this.socket.on('receive-message', (data) => {
      cb(null, data);
    });
  };

  memberJoined = (cb: (err: any, data: string) => void) => {
    this.socket.on('member-joined', (memberID: string) => {
      cb(null, memberID);
    });

    return true;
  };
}
