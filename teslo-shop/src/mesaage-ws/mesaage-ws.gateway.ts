import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MesaageWsService } from './mesaage-ws.service';
import { NewMessageDto } from './dtos/new-message.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayLoad } from 'src/auth/interfaces';

@WebSocketGateway({ cors: true })
export class MesaageWsGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() wss: Server;
  constructor(
    private readonly mesaageWsService: MesaageWsService,
    private readonly jwtService: JwtService,
  ) {}

  async handleConnection(client: Socket) {
    const token = client.handshake.headers.authentication as string;
    let payload: JwtPayLoad;
    try {
      payload = this.jwtService.verify(token);
      await this.mesaageWsService.registerClient(client, payload.id);
    } catch (error) {
      client.disconnect();
      return;
    }

    // console.log({ payload });
    // console.log('Cliente conectado', client.id);
    this.wss.emit(
      'clients-updated',
      this.mesaageWsService.getConnectedClients(),
    );
  }

  handleDisconnect(client: Socket) {
    // console.log('Cliente desconectado', client.id);
    this.mesaageWsService.removeClient(client.id);
    this.wss.emit(
      'clients-updated',
      this.mesaageWsService.getConnectedClients(),
    );
  }

  @SubscribeMessage('message-from-client')
  handleMessageFromClient(client: Socket, payload: NewMessageDto) {
    console.log(payload);

    //? emit only to the emisor
    // client.emit('message-from-server', {
    // fullName: this.mesaageWsService.getUserFullName(client.id),
    // message: payload.message,
    // )};

    //? for multiple clients except the emisor
    // client.broadcast.emit('message-from-server', {
    //   fullName: this.mesaageWsService.getUserFullName(client.id),
    //   message: payload.message,
    // });

    //? for all clients
    this.wss.emit('message-from-server', {
      fullName: this.mesaageWsService.getUserFullName(client.id),
      message: payload.message,
    });
  }
}
