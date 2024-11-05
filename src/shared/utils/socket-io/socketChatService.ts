import { io, Socket } from 'socket.io-client';
import { SocketMessage } from '../../interfaces/chats';

export class SocketChatService {
  private socket: Socket | null = null;
  private messageHandlers: ((message: SocketMessage) => void)[] = [];
  private url: string;
  
  constructor(url: string) {
    this.url = url;
  }

  public connect(token: string | undefined) {
    if (!token) return;

    if (this.socket) {
      this.socket.disconnect();
    }

    this.socket = io(this.url, {
      extraHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    
    this.setupListeners();
  }

  private setupListeners(): void {
    if (!this.socket) return;

    this.socket.on('recieve-message', (message: SocketMessage) => {
      this.messageHandlers.forEach(handler => {
        try {
          handler(message);
        } catch (error) {
          console.error('Ошибка в обработчике сообщения:', error);
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
  
  public disconnect(): void {
    this.messageHandlers = [];
    this.socket?.disconnect();
    this.socket = null;
  }
}
