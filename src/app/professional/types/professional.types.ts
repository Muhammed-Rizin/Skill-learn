import { userData } from 'src/app/user/types/user.types';

export interface professionalType {
  email: string | null;
  password: string | null;
  firstName: String | null;
  lastName: String | null;
  education: String | null;
}

export interface State {
  user: professionalData | professionalType | null;
  loading: boolean;
  loaded: boolean;
  error: any;
  message: any;
  total: number;
}

export interface taskInitialState {
  tasks: CompleteTask[] | null;
  loading: boolean;
  loaded: boolean;
  error: any;
  total: number;
}

export interface ScheduleInitialState {
  meeting: CompleteSchedule[] | null;
  loading: boolean;
  loaded: boolean;
  error: any;
  total: number;
}

export interface professionalData {
  _id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  education: string;
  google: boolean;
  blocked: boolean;
  __v: number;
  token: string;
  location: string;
  bio: string;
  address: string;
  image: string;
  emailVerified: boolean;
  experience: string;
  payment: number;
  skills: string[];
  field: string;
  work: string;
  qualification: string;
  about: string;
  emailToken: string;
  notificationToken: string;
  averageRating?: null | number;
}

export interface Task {
  user: String;
  task: string;
  description: string;
  endTime: Date;
}

export interface CompleteTask {
  _id: string;
  from: professionalData;
  to: userData;
  task: string;
  description: string;
  endTime: string;
  completed: boolean;
}

export interface Schedule {
  user: String;
  topic: string;
  description: string;
  time: Date;
}

export interface CompleteSchedule {
  _id: string;
  from: professionalData;
  to: userData;
  time: string;
  topic: string;
  description: string;
  completed: boolean;
}

export type sendMessageType = {
  type: string;
  candidate?: RTCIceCandidate;
  answer?: RTCSessionDescriptionInit;
  offer?: RTCSessionDescriptionInit;
};
