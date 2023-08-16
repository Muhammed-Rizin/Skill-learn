import { CompleteSchedule, CompleteTask, Task, professionalData } from "src/app/professional/types/professional.types"


export interface initialStateType {
    user: userData | professionalData | userData[] | professionalData[] | loginUser | registerUserType | null
    loading: boolean,
    loaded: boolean,
    error: any
    total?: number
}

export interface taskInitialState {
    tasks: CompleteTask[] | null
    loading: boolean
    loaded: boolean
    error: any
    total: number
}

export interface ScheduleInitialState {
    meeting: CompleteSchedule[] | null
    loading: boolean
    loaded: boolean
    error: any
    total: number
}

export interface newPassword {
    user : registerUserType | null
    loading : boolean
    loaded : boolean
    error : any
    message : any
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
    token: string
    location: string
    bio: string
    address: string
    image: string
    emailVerified: boolean
    emailToken: string
    notificationToken: string
}

export interface loginUser {
    email: string | null
    password: string | null
}

export interface registerUserType {
    email: string | null
    password: string | null
    firstName: String | null
    lastName: String | null
    education: String | null
}

export interface ChatData {
    _id: string
    roomId: string
    __v: number
    messages: Message[]
    users: string[]
    userRead: boolean
    professionalRead: boolean
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

export interface PaymentData {
    from: userData,
    to: professionalData
    paymentId: string
    amount: number
    createdAt: Date
}


export interface addReview {
    title: string
    description: string
    rating: number
}

export interface Review {
    title: string,
    description: string
    rating: number
    _id: string
    user: userData
    professional: string
    createdAt: string
}

export interface msgType {
    notification : notification,
    data : data | any
}

export interface data {
    roomId : string
}

export interface notification {
    icon: string,
    body: string,
    title: string
}
export type sendMessageType = {
    type: string, candidate?: RTCIceCandidate, answer?: RTCSessionDescriptionInit, offer?: RTCSessionDescriptionInit
}