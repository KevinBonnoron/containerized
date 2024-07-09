import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import type { Server } from 'socket.io';

import type { DockerEventDto } from '@containerized/shared';

@WebSocketGateway({ cors: { origin: '*' } })
export class DockerGateway {
  @WebSocketServer()
  private readonly serverSocket: Server;

  onEvent(dockerEvent: DockerEventDto) {
    this.serverSocket.emit('docker.events', dockerEvent);
  }
}
