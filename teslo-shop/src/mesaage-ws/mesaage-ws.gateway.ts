import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { MesaageWsService } from './mesaage-ws.service';

@WebSocketGateway({ cors: true })
export class MesaageWsGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly mesaageWsService: MesaageWsService) {}
  handleConnection(client: Socket) {
    console.log('Cliente conectado', client.id);
  }
  handleDisconnect(client: Socket) {
    console.log('Cliente desconectado', client.id);
  }
}
