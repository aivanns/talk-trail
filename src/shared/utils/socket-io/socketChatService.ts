import { io, Socket } from 'socket.io-client';
import { SocketMessage } from '../../interfaces/chats';

export class SocketChatService {
  private socket: Socket | null = null;
  private messageHandlers: ((message: SocketMessage) => void)[] = [];
  private chatCreatedHandlers: ((chatUuid: string) => void)[] = [];
  private url: string;
  
  constructor(url: string) {
    this.url = url;
  }

  public connect(token: string | undefined) {
    if (!token) return;

    if (!this.socket || !this.socket.connected) {
      console.log('Подключение сокета');
      this.socket = io(this.url, {
          extraHeaders: {
              Authorization: `Bearer ${token}`
          },
          reconnection: true,
          reconnectionAttempts: 5,
          reconnectionDelay: 1000
      });
      
      this.setupListeners();
    }
  }

  private setupListeners(): void {
    if (!this.socket) return;

    this.socket.on('on-message-received', (message: SocketMessage) => {
      console.log('Получено сообщение в сокете:', {
        messageUuid: message.uuid,
        chatUuid: message.chat.uuid,
        content: message.content,
        user: message.user
      });
      this.messageHandlers.forEach(handler => {
        try {
          handler(message);
        } catch (error) {
          console.error('Ошибка в обработчике сообщения:', error);
        }
      });
    });

    this.socket.on('connect', () => {
      console.log('Сокет подключен');
    });

    this.socket.on('disconnect', () => {
      console.log('Сокет отключен');
    });

    this.socket.on('error', (error: any) => {
      console.error('Ошибка сокета:', error);
    });

    this.socket.on('on-chat-created', (chatUuid: string) => {
      console.log('Создан чат:', chatUuid);
      this.chatCreatedHandlers.forEach(handler => {
        try {
          handler(chatUuid);
        } catch (error) {
          console.error('Ошибка в обработчике создания чата:', error);
        }
      });
    });
  }

  public sendMessage(message: { chatUuid: string; content: string }): void {
    this.socket?.emit('send-message', message);
  }

  public onMessage(handler: (message: SocketMessage) => void): void {
    this.messageHandlers.push(handler);
  }

  public offMessage(handler: (message: SocketMessage) => void): void {
    this.messageHandlers = this.messageHandlers.filter(h => h !== handler);
  }

  public onChatCreated(handler: (chatUuid: string) => void): void {
    this.chatCreatedHandlers.push(handler);
  }

  public offChatCreated(handler: (chatUuid: string) => void): void {
    this.chatCreatedHandlers = this.chatCreatedHandlers.filter(h => h !== handler);
  }

  public disconnect(): void {
    console.log('Отключение сокета');
    this.messageHandlers = [];
    this.chatCreatedHandlers = [];
    if (this.socket) {
        this.socket.disconnect();
        this.socket = null;
    }
  }
}
