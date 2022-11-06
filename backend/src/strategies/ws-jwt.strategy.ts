import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { ExtractJwt, Strategy } from 'passport-jwt';

import { WsException } from '@nestjs/websockets';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class WsJwtStrategy extends PassportStrategy(Strategy, 'wsjwt') {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromUrlQueryParameter('Authorization'),
      // jwtFromRequest: ExtractJwt.fromHeader('Authorization'),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_ACCESS_SECRET,
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    const { id } = payload;
    try {
      return this.userService.findOne(id);
    } catch (error) {
      throw new WsException('Unauthorized access');
    }
  }
}
