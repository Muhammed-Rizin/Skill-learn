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
    location ?: string
    birthday ?: Date
    bio ?: string
    address ?: string
    image ?: string
    emailverified ?: boolean
}
  