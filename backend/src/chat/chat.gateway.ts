import {
  ForbiddenException,
  Logger,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';

import { AuthService } from 'src/auth/auth.service';
import { WsAuthGuard } from 'src/auth/guards/ws-auth.guard';
import { RoomService } from 'src/room/room.service';
import { UserService } from 'src/user/user.service';

import { AddMessageDto } from './dto/add-message.dto';
import { BanUserDto } from './dto/ban-user.dto';
import { JoinRoomDto } from './dto/join-room.dto';
import { KickUserDto } from './dto/kick-user.dto';
import { LeaveRoomDto } from './dto/leave-room.dto';

@UsePipes(new ValidationPipe())
@UseGuards(WsAuthGuard)
@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  connectedUsers: Map<string, string> = new Map();

  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly roomService: RoomService,
    private readonly logger: Logger,
  ) {
    this.logger = new Logger(ChatGateway.name);
  }

  async handleConnection(client: Socket): Promise<void> {
    const token = client.handshake.query.Authorization;
    const payload = this.authService.verifyAccessToken(token as string);
    const user = await this.userService.findOne(payload.id);

    this.logger.log(`User ${client.id} connected`);

    if (!user) {
      client.disconnect(true);
      this.logger.log(`User ${client.id} not authorized`);
      return;
    }
    this.connectedUsers.set(client.id, user.id);

    if (user.room) {
      return this.onRoomJoin(client, { roomId: user.room.id });
    }
  }

  async handleDisconnect(client: Socket) {
    this.connectedUsers.delete(client.id);
  }

  @SubscribeMessage('message')
  async onMessage(client: Socket, addMessageDto: AddMessageDto) {
    const userId = this.connectedUsers.get(client.id);
    const user = await this.userService.findOne(userId);

    if (!user.room) {
      return;
    }

    addMessageDto.userId = userId;
    addMessageDto.roomId = user.room.id;

    await this.roomService.addMessage(addMessageDto);

    client.to(user.room.id).emit('message', addMessageDto.text);
  }

  @SubscribeMessage('join')
  async onRoomJoin(client: Socket, joinRoomDto: JoinRoomDto) {
    const { roomId } = joinRoomDto;
    const limit = 10;

    const room = await this.roomService.findOneWithRelations(roomId);

    if (!room) return;

    const userId = this.connectedUsers.get(client.id);
    const messages = room.messages.slice(limit * -1);

    await this.userService.updateUserRoom(userId, room);

    client.join(roomId);

    client.emit('message', messages);
  }

  @SubscribeMessage('leave')
  async onRoomLeave(client: Socket, leaveRoomDto: LeaveRoomDto) {
    const { roomId } = leaveRoomDto;
    const userId = this.connectedUsers.get(client.id);

    await this.userService.updateUserRoom(userId, null);

    client.leave(roomId);
  }

  @SubscribeMessage('user-kick')
  async onUserKick(client: Socket, kickUserDto: KickUserDto) {
    const { roomId, reason } = kickUserDto;

    const userId = this.connectedUsers.get(client.id);
    const room = await this.roomService.findOneWithRelations(roomId);

    if (userId !== room.ownerId) {
      throw new ForbiddenException(`You are not the owner of the room!`);
    }

    await this.userService.updateUserRoom(kickUserDto.userId, null);

    const kickedClient = this.getClientByUserId(kickUserDto.userId);

    if (!kickedClient) return;

    client.to(kickedClient.id).emit('kicked', reason);
    kickedClient.leave(roomId);
  }

  @SubscribeMessage('user-ban')
  async onUserBan(client: Socket, banUserDto: BanUserDto) {
    const { roomId, reason } = banUserDto;

    const userId = this.connectedUsers.get(client.id);
    const room = await this.roomService.findOneWithRelations(roomId);

    if (userId !== room.ownerId) {
      throw new ForbiddenException(`You are not the owner of the room!`);
    }

    if (userId === banUserDto.userId) {
      throw new ForbiddenException(`You can't ban yourself`);
    }

    await this.roomService.banUserFromRoom(banUserDto);

    const bannedClient = this.getClientByUserId(banUserDto.userId);

    if (!bannedClient) return;

    client.to(bannedClient.id).emit('banned', reason);
    bannedClient.leave(roomId);
  }

  private getClientByUserId(userId: string): Socket | null {
    for (const [key, value] of this.connectedUsers.entries()) {
      if (value === userId) {
        const kickedClient = this.server.sockets.sockets.get(key);

        return kickedClient;
      }
    }

    return null;
  }
}
