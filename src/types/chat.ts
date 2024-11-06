import { Message } from "../shared/interfaces/chats"

export type Chats = Chat[]

export interface Chat {
  uuid: string
  messages: Message[]
  userChats: UserChat[]
}

export interface UserChat {
  userUuid: string
  chatUuid: string
  createdAt: Date
  updatedAt: Date
  user: User
}

export interface User {
  avatar: string
  description: string
  lastTimeOnline: Date
  name: string
  username: string
  uuid: string
}

export interface CompanionInfo {
  avatar: string
  description: string
  lastTimeOnline: Date
  name: string
  username: string
  uuid: string
  isOnline: boolean
}

