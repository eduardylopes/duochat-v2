import { Logger, Module } from '@nestjs/common';

import { ChatGateway } from './chat.gateway';

import { AuthModule } from 'src/auth/auth.module';
import { WsJwtStrategy } from 'src/common/strategies/ws-jwt.strategy';
import { RoomModule } from 'src/room/room.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [UserModule, AuthModule, RoomModule],
  providers: [ChatGateway, WsJwtStrategy, Logger],
})
export class ChatModule {}
