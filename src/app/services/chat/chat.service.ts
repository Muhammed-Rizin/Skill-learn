import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { ChatData } from 'src/app/user/types/user.types';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  socket !: Socket;

  constructor() { }

  setupSocketConnection(userId: string) {
    this.socket = io(environment.apiUrl, { auth: { userId } });
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }

  subscribeToMessages = (cb: (err: any, data: { sender: string, text: string, recever: string, data: ChatData }) => void) => {
    this.socket.on('message', (msg: { sender: string, text: string, recever: string, data: ChatData }) => {
      cb(null, msg);
    });
    return true;
  };

  join(roomName: string) {
    if(this.socket){
      this.socket.emit('join', roomName)
    }
  }

  sendMessage =
    ({ message, roomName, from, to, type, receverType }:
      { message: string, roomName: string, from: string, to: string, type: string, receverType: string }, cb: (cb: string) => void) => {
      if (this.socket) this.socket.emit('message', { message, roomName, from, to, type, receverType }, cb);
    }
}
