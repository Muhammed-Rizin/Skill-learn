import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Socket } from 'socket.io-client';
import * as CryptoJS from 'crypto-js';

import { VideoService } from 'src/app/services/video/video.service';
import { professionalData } from 'src/app/professional/types/professional.types';
import { sendMessageType, userData } from '../../types/user.types';
import { UserService } from 'src/app/services/user/user.service';
import { environment } from 'src/environments/environment';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css'],
})
export class VideoComponent implements OnInit, OnDestroy {
  constructor(
    private videoService: VideoService,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private _notificationService: NotificationService,
  ) {}

  localStream!: MediaStream;
  remoteStream!: MediaStream;
  peerConnection!: RTCPeerConnection;
  socket!: Socket;
  secret = environment.crypto_secret;
  roomId!: string;
  toUserData!: professionalData;
  userData!: userData;

  servers = {
    iceServers: [
      {
        urls: [
          'stun:stun1.l.google.com:19302',
          'stun:stun2.l.google.com:19302',
          'stun:stun3.l.google.com:19302',
          'stun:stun4.l.google.com:19302',
        ],
      },
    ],
  };

  ngOnDestroy(): void {
    this.leaveChannel();
  }

  @ViewChild('video1') localVideo!: ElementRef;
  @ViewChild('video2') remoteVideo!: ElementRef;
  @ViewChild('audio') audio!: ElementRef;
  @ViewChild('video') video!: ElementRef;
  @ViewChild('leave') leave!: ElementRef;

  async ngOnInit() {
    this.userService.getUserData().subscribe(
      (data) => {
        this.userData = data;
      },
      (err) => {
        if (err.status == 500) {
          localStorage.setItem('server-error', 'server-error');
          this.router.navigate(['/server-error']);
        }
      },
    );
    setTimeout(() => {
      this.videoService.setupSocketConnection(this.userData._id);
      this.route.params.subscribe((params) => {
        if (params['id']) {
          this.roomId = params['id'];
          this.videoService.join(this.roomId);
          const toUserId = this.roomId.replace(this.userData._id, '');
          this.userService.getProfessionalDataById(toUserId).subscribe(
            (data) => {
              this.videoService.newUserJoined(
                this.roomId,
                data.email,
                this.userData.email,
              );
              this._notificationService.updateNotification(
                this.userData._id,
                this.roomId,
              );
              this.toUserData = data;
            },
            (err) => {
              if (err.status == 500) {
                localStorage.setItem('server-error', 'server-error');
                this.router.navigate(['/server-error']);
              }
            },
          );
        }
      });
      this.videoService.socket.on('user-disconnected', () => {
        this.handleUserLeft();
      });
      this.init();
    }, 1000);
  }

  async init() {
    this.videoService.memberJoined((err, memberId) => {
      this.createOffer();
    });

    this.videoService.receiveMessage((err, data) => {
      this.handleMessage(data);
    });

    this.localStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    this.localVideo.nativeElement.srcObject = this.localStream;
  }

  handleMessage(message: sendMessageType) {
    if (message.offer !== undefined) {
      this.createAnswer(message.offer);
    }

    if (message.answer !== undefined) {
      this.addAnswer(message.answer);
    }

    if (message.candidate !== undefined) {
      if (this.peerConnection) {
        this.peerConnection.addIceCandidate(message.candidate);
      }
    }
  }
  async createPeerConnection() {
    this.peerConnection = new RTCPeerConnection(this.servers);

    if (!this.localStream) {
      this.localStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      this.localVideo.nativeElement.srcObject = this.localStream;
    }

    this.localStream.getTracks().forEach((track) => {
      this.peerConnection.addTrack(track, this.localStream);
    });

    this.peerConnection.ontrack = (event) => {
      if (!this.remoteStream) {
        this.remoteStream = new MediaStream();
      }
      event.streams[0].getTracks().forEach((track) => {
        this.remoteStream.addTrack(track);
      });
      this.remoteVideo.nativeElement.srcObject = this.remoteStream;
      this.remoteVideo.nativeElement.style.display = 'block';
      this.localVideo.nativeElement.classList.add('smallFrame');
    };
    this.peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        this.videoService.sendMessage(
          { type: 'candidate', candidate: event.candidate },
          this.roomId,
        );
      }
    };
  }
  async createOffer() {
    await this.createPeerConnection();

    const offer = await this.peerConnection.createOffer();
    await this.peerConnection.setLocalDescription(offer);

    this.videoService.sendMessage({ type: 'offer', offer: offer }, this.roomId);
  }

  async createAnswer(offer: RTCSessionDescriptionInit) {
    await this.createPeerConnection();

    await this.peerConnection.setRemoteDescription(offer);

    const answer = await this.peerConnection.createAnswer();
    await this.peerConnection.setLocalDescription(answer);

    this.videoService.sendMessage(
      { type: 'answer', answer: answer },
      this.roomId,
    );
  }

  async addAnswer(answer: RTCSessionDescriptionInit) {
    if (!this.peerConnection.currentRemoteDescription) {
      this.peerConnection.setRemoteDescription(answer);
    }
  }

  toggleCamera = async () => {
    const videoTrack = this.localStream
      .getTracks()
      .find((track) => track.kind === 'video') as MediaStreamTrack;

    if (videoTrack.enabled) {
      videoTrack.enabled = false;
      this.video.nativeElement.style.backgroundColor = 'rgb(255, 80, 80)';
    } else {
      videoTrack.enabled = true;
      this.video.nativeElement.style.backgroundColor = 'rgb(72, 170, 255)';
    }
  };

  toggleAudio = async () => {
    const audioTrack = this.localStream
      .getTracks()
      .find((track) => track.kind === 'audio') as MediaStreamTrack;

    if (audioTrack.enabled) {
      audioTrack.enabled = false;
      this.audio.nativeElement.style.backgroundColor = 'rgb(255, 80, 80)';
    } else {
      audioTrack.enabled = true;
      this.audio.nativeElement.style.backgroundColor = 'rgb(72, 170, 255)';
    }
  };

  handleUserLeft = async () => {
    this.remoteVideo.nativeElement.style.display = 'none';
    this.localVideo.nativeElement.classList.remove('smallFrame');

    this.router.navigate(['/chat']);
  };

  async leaveChannel() {
    try {
      if (this.localStream) {
        this.localStream.getTracks().forEach((track) => track.stop());
      }

      if (this.remoteStream) {
        this.remoteStream.getTracks().forEach((track) => track.stop());
      }

      this.videoService.disconnect(this.roomId);
      this.handleUserLeft();
    } catch (error) {
      console.error('Error leaving channel:', error);
    }
  }
}
