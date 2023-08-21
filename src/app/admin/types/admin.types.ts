export interface adminData {
    _id: string
    email: string
    password: string
    __v: number
    token : string
}


export interface initialStateType {
    user : User | User[] | adminLogin | Professional[] | null | string
    loading : boolean
    loaded : boolean
    error : any
}

export interface adminLogin {
    email : string
    password : string
}


export interface User {
    _id: string
    email : string
    password : string
    firstName : string
    lastName : string
    education : string
    google : boolean
    blocked : boolean
    __v : number
    token  : string
    location : string
    birthday : Date
    bio : string
    address : string
    image : string
    emailVerified : boolean
    approved : boolean
    rejected : boolean
}

export interface Professional {
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
    experience: string
    payment: number
    skills: string[]
    field: string
    work: string
    qualification: string
    about: string
    emailToken: string
    notificationToken: string
    approved : boolean
    rejected : boolean
}