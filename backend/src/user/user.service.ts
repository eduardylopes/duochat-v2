import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { Room } from 'src/room/entities/room.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  public async findAll() {
    const users = await this.userRepository.find();

    return users;
  }

  public async findOne(id: string) {
    const user = await this.userRepository.findOne(id, {
      relations: ['room'],
    });

    if (!user) {
      throw new NotFoundException(`There is no user under id ${id}`);
    }

    return user;
  }

  public async findOneByUsername(username: string) {
    const user = await this.userRepository.findOne({ username });

    return user;
  }

  public async create(createUserDto: CreateUserDto) {
    const user = this.userRepository.create({
      ...createUserDto,
    });

    const newUser = await this.userRepository.save(user);

    return newUser;
  }

  public async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.preload({
      id,
      ...updateUserDto,
    });

    if (!user) {
      throw new NotFoundException(`There is no user under id ${id}`);
    }

    return this.userRepository.save(user);
  }

  public async updateUserRoom(id: string, room: Room) {
    const user = await this.userRepository.preload({
      id,
      room,
    });

    if (!user) {
      throw new NotFoundException(`There is no user under id ${id}`);
    }

    const isBanned = user.bannedRooms?.find(
      (bannedRoom) => bannedRoom.id === room?.id,
    );

    if (isBanned) {
      throw new ForbiddenException(`You have been banned from this room`);
    }

    return this.userRepository.save(user);
  }

  public async remove(id: string) {
    const user = await this.findOne(id);

    return this.userRepository.remove(user);
  }
}
