import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class WebsocketGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    console.log('connected', client.id);
  }

  handleDisconnect(client: Socket) {
    console.log('disconnected', client.id);
  }

  // My custom events
  @SubscribeMessage('message')
  handleMessage(@ConnectedSocket() client: Socket, @MessageBody() data: any) {
    console.log('msg', data);

    // this.server.emit('mensajefromserver', `aqui te retorno: ${data}`);
    client.broadcast.emit('mensajefromserver', `aqui te retorno: ${data}`);
  }

  @SubscribeMessage('onNewUser')
  handleNewUser(@ConnectedSocket() client: Socket, @MessageBody() data: any) {
    // Connect to anywhere

    // Save on serv

    // Read ...

    client.broadcast.emit('mensajefromserver', `aqui te retorno: ${data}`);
  }
}
