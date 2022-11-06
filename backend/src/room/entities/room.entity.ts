import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { User } from 'src/user/entities/user.entity';
import { Message } from './message.entity';

@Entity()
export class Room {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 20 })
  name: string;

  @Column({ length: 60 })
  description: string;

  @Column({ select: false })
  password: string;

  @Column({ name: 'is_private' })
  isPrivate: boolean;

  @Column('uuid', { name: 'owner_id' })
  ownerId: string;

  @CreateDateColumn({
    type: 'timestamp without time zone',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'created_at',
  })
  createdAt: string;

  @UpdateDateColumn({
    type: 'timestamp without time zone',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'updated_at',
  })
  updatedAt: string;

  @OneToMany(() => User, (user: User) => user.room)
  users: Array<User>;

  @ManyToMany(() => User, (user: User) => user.bannedRooms)
  bannedUsers: Array<User>;

  @OneToMany(() => Message, (message: Message) => message.room)
  messages: Array<Message>;
}
