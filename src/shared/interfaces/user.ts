import { Folder } from "./folders";

export interface UserInfo {
    avatar: string
    description: string
    lastTimeOnline: Date
    name: string
    folders?: Folder[]
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
  