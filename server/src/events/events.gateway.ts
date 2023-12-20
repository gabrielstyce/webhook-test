import { Logger } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { config } from '../config';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventsGateway {
  private readonly logger = new Logger(EventsGateway.name);

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('link')
  async link(@MessageBody() linkId: string, @ConnectedSocket() socket: Socket): Promise<{
    linked: boolean,
    requestURI: string
  }> {
    this.logger.log(`Solicitação de link: ${linkId}`);
    await socket.join(linkId);
    return Promise.resolve({
      linked: true,
      requestURI: `${config.HOST}/${linkId}`
    });
  }
}

// List all rooms
//   this.server.fetchSockets().then(e => { this.logger.log(e); });