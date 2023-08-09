import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  socket !: Socket;
  
  constructor() { }

  setupSocketConnection(userId: string) {
    this.socket = io(environment.apiUrl, { auth: { userId } });
  }

  join(roomName: string) {
    if(this.socket){
      this.socket.emit('join', roomName)
    }
  }

  newUserJoined(room : string, to : string, from : string){
    console.log(room, to, from)
    this.socket.emit('new-call', {room, to, from})
  }

  disconnect(roomId : string) {
    if (this.socket) {
      this.socket.emit('disconnect-user', roomId)

    }
  }

  sendmessage(message : any, roomId : string){
    console.log(message)
    this.socket.emit('send-message', {message, roomId})
  }


  receiveMessage = (cb : (err : any, data : any) => void) => {
    this.socket.on('receive-message', (data) => {
      cb(null, data)
    })
  }

  memberJoined = (cb: (err: any, data: string) => void) => {
    this.socket.on('member-joined', (memberID : string) => {
      cb(null, memberID)
    })

    return true
  }
}
