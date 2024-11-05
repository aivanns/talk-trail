export interface Messages {
  uuid: string
  messages: Message[]
}

export interface Message {
  uuid: string
  content: string
  createdAt: Date
  updatedAt: Date
  userUuid: string
  chatUuid: string
  user: User
}

export interface User {
  avatar: any
  name: string
  uuid: string
}

export interface SocketMessage {
    uuid: string
    content: string
    createdAt: string
    user: User
    chat: Chat
  }
  
  export interface Chat {
    uuid: string
  }