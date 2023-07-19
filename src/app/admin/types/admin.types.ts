export interface adminData {
    _id: string
    email: string
    password: string
    __v: number
    token : string
}

export interface adminLogin {
    email ?: string | null
    password ?: string | null
    type ?: string
}

export interface initialStateType {
    user : User | null | User[]
    loading : boolean
    loaded : boolean
    error : any
}

export interface User {
    _id: string
    email ?: string
    password ?: string
    firstName ?: string
    lastName ?: string
    education ?: string
    google ?: boolean
    blocked ?: boolean
    __v ?: number
    token  ?: string
    location ?: string
    birthday ?: Date
    bio ?: string
    address ?: string
    image ?: string
    emailverified ?: boolean
    approved ?: boolean
    rejected ?: boolean
}