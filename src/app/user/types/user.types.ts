import { CompleteSchedule, CompleteTask, Task, professionalData } from "src/app/professional/types/professional.types"


export interface initialStateType {
    user : userData | professionalData | null | userData[] | professionalData[]
    loading : boolean,
    loaded : boolean,
    error : any
}



export interface userData {
    _id: string
    email: string
    password: string
    firstName: string
    lastName: string
    education: string
    google: boolean
    blocked: boolean
    __v: number
    token : string
    location : string
    bio : string
    address : string
    image : string
    emailVerified : boolean
    emailToken : string
}
  

export interface ChatData {
  _id: string
  roomId: string
  __v: number
  messages: Message[]
  users: string[]
}
  
export interface Message {
  text: string
  sender: userData | professionalData
  senderType: string
  recever: userData | professionalData
  recevertype: string
  time: string
  _id: string
}
  

export interface Payment {
    from: string | userData
    to: string | professionalData
    paymentId: string
    amount: number
    createdAt?: Date
}













export interface loginUser {
    email ?: string | null
    password ?: string | null
    type ?: string
}

export interface loginState {
    user : loginUser | null
    loading : boolean
    loaded : boolean
    error : any
}  

export interface registerUserType {
    email ?: string | null
    password ?: string | null
    firstName ?: String | null
    lastName ?: String | null
    education ?: String | null
    type ?: String | null
}

export interface registerState {
    user : registerUserType | null
    loading : boolean
    loaded : boolean
    error : any
    message ?: any
}


export interface taskInitialState {
    tasks : CompleteTask[] | null
    loading : boolean
    loaded : boolean
    error : any
}

export interface ScheduleInitialState {
    meeting : CompleteSchedule[] | null
    loading : boolean
    loaded : boolean
    error : any
}