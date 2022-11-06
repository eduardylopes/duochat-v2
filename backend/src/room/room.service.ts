import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { UserService } from 'src/user/user.service';

import { Message } from './entities/message.entity';
import { Room } from './entities/room.entity';

import { AddMessageDto } from 'src/chat/dto/add-message.dto';
import { BanUserDto } from 'src/chat/dto/ban-user.dto';
import { PageMetaDto } from 'src/common/dtos/page-meta.dto';
import { PageOptionsDto } from 'src/common/dtos/page-options.dto';
import { PageDto } from 'src/common/dtos/page.dto';
import { CreateRoomDto } from 'src/room/dto/create-room.dto';
import { UpdateRoomDto } from 'src/room/dto/update-room.dto';
import { RoomDto } from './dto/room.dto';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room) private readonly roomRepository: Repository<Room>,
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
    private readonly userService: UserService,
  ) {}

  public async findAll(
    pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<RoomDto>> {
    const queryBuilder = this.roomRepository.createQueryBuilder('room');

    queryBuilder
      .orderBy('room.createdAt', pageOptionsDto.order)
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
  }

  async findOne(id: string) {
    const room = await this.roomRepository.findOne(id);

    if (!room) {
      throw new NotFoundException(`There is no room under id ${id}`);
    }

    return room;
  }

  async findOneWithRelations(id: string) {
    const room = await this.roomRepository.findOne(id, {
      relations: ['messages', 'users', 'bannedUsers'],
    });

    if (!room) {
      throw new NotFoundException(`There is no room under id ${id}`);
    }

    return room;
  }

  async findOneByName(name: string) {
    const room = await this.roomRepository.findOne({ name });

    return room;
  }

  async create(createRoomDto: CreateRoomDto) {
    const roomAlreadyExists = await this.findOneByName(createRoomDto.name);

    if (roomAlreadyExists) {
      throw new BadRequestException('Room already exists');
    }

    const room = this.roomRepository.create(createRoomDto);
    return this.roomRepository.save(room);
  }

  async addMessage(addMessageDto: AddMessageDto) {
    const { roomId, userId, text } = addMessageDto;

    const room = await this.findOne(roomId);
    const user = await this.userService.findOne(userId);

    const message = await this.messageRepository.create({
      text,
      room,
      user,
    });

    return this.messageRepository.save(message);
  }

  async update(id: string, updateRoomDto: UpdateRoomDto) {
    const room = await this.roomRepository.preload({
      id,
      ...updateRoomDto,
    });

    if (!room) {
      throw new NotFoundException(`There is no room under id ${id}`);
    }

    return this.roomRepository.save(room);
  }

  async banUserFromRoom(banUserDto: BanUserDto) {
    const { userId, roomId } = banUserDto;

    const user = await this.userService.findOne(userId);
    const room = await this.findOne(roomId);

    await this.userService.updateUserRoom(userId, null);

    const bannedUsers = { ...room.bannedUsers, ...user };
    const updatedRoom = await this.roomRepository.preload({
      id: roomId,
      bannedUsers,
    });

    return this.roomRepository.save(updatedRoom);
  }

  async remove(id: string) {
    const room = await this.findOne(id);

    return this.roomRepository.remove(room);
  }
}
