export interface UserInfo {
    avatar: string
    description: string
    lastTimeOnline: Date
    name: string
    folders?: string[]
    username: string
    uuid: string
    isOnline: boolean
  }

export interface UserUpdate {
    username?: string
    password?: string
    description?: string
    name?: string
  }
  