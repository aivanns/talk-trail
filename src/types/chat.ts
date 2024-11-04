export type Chats = Chat[]

export interface Chat {
  uuid: string
  messages: any[]
  userChats: UserChat[]
}

export interface UserChat {
  userUuid: string
  chatUuid: string
  createdAt: string
  updatedAt: string
  user: User
}

export interface User {
  avatar: any
  description: any
  lastTimeOnline: any
  name: string
  username: string
  uuid: string
}
