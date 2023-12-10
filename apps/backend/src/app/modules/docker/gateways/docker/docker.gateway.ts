import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

import { DockerEventDto } from '@containerized/shared';

@WebSocketGateway({ cors: { origin: '*' } })
export class DockerGateway {
  @WebSocketServer()
  private readonly serverSocket: Server;

  onEvent(dockerEvent: DockerEventDto) {
    this.serverSocket.emit('docker.events', dockerEvent);
  }
}