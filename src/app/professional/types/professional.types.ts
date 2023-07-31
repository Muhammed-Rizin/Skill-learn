export interface professionalType {
    email ?: string | null
    password ?: string | null
    firstName ?: String | null
    lastName ?: String | null
    education ?: String | null
    type ?: String | null
}

export interface State {
    user : professionalType | null
    loading : boolean
    loaded : boolean
    error : any,
    message ?: any
}

export interface professionalData {
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
    emailVerified ?: boolean
    experience ?: string
    payment ?: number
    skills ?: string[]
    field?: string
    work?: string
    qualification?: string
    about?:string
}
  