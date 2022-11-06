import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';

import { UpdateRoomDto } from './dto/update-room.dto';

import { RoomService } from './room.service';

import { PageOptionsDto } from 'src/common/dtos/page-options.dto';
import { PageDto } from 'src/common/dtos/page.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { CreateRoomRequestDto } from './dto/create-room-request-dto';
import { RoomDto } from './dto/room.dto';
import { OwnershipGuard } from './guards/ownership.guard';
import { RequestWithUser } from './interfaces/request-with-user.interface';

@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.roomService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getUsers(
    @Query() pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<RoomDto>> {
    return this.roomService.findAll(pageOptionsDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() createRoomDto: CreateRoomRequestDto,
    @Req() req: RequestWithUser,
  ) {
    const room = await this.roomService.create({
      ...createRoomDto,
      ownerId: req.user.id,
    });

    return room;
  }

  @UseGuards(JwtAuthGuard, OwnershipGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateRoomDto: UpdateRoomDto) {
    return this.roomService.update(id, updateRoomDto);
  }

  @UseGuards(JwtAuthGuard, OwnershipGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.roomService.remove(id);
  }
}
