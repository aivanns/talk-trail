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

    this.socket = io(this.url, {
      extraHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    
    this.setupListeners();
  }

  private setupListeners(): void {
    if (!this.socket) return;

    this.socket.on('error', (error: Error) => {
      console.error('Ошибка сокета:', error);
    });

    this.socket.on('recieve-message', (message: SocketMessage) => {
      console.log('SocketService: Получено новое сообщение:', message);
      console.log('SocketService: Количество обработчиков:', this.messageHandlers.length);
      this.messageHandlers.forEach(handler => {
        console.log('SocketService: Вызываем обработчик');
        handler(message);
      });
    });

    this.socket.on('connect', () => {
      console.log('Подключено к серверу');
    });

    this.socket.on('disconnect', () => {
      console.log('Отключено от сервера');
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
