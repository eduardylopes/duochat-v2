import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';

import { AuthService } from './auth.service';

import { LocalAuthGuard } from '../guards/local-auth.guard';

import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { LoginUserDto } from 'src/user/dto/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signUp')
  async singUp(@Body() userDto: CreateUserDto) {
    const tokens = await this.authService.singUp(userDto);

    if (!tokens) {
      throw new HttpException(
        'User under this username already exists',
        HttpStatus.BAD_REQUEST,
      );
    }

    return tokens;
  }

  @Post('/signIn')
  @UseGuards(LocalAuthGuard)
  async singIn(@Body() userDto: LoginUserDto) {
    const tokens = await this.authService.signIn(userDto);

    return tokens;
  }

  @Post('/refresh')
  async updateTokens(@Request() req: any) {
    const refreshToken = req.headers.authorization.replace('Bearer ', '');
    const accessToken = await this.authService.updateAccessToken(refreshToken);

    if (!accessToken) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    return { access: accessToken };
  }
}
