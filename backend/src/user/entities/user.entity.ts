import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Message } from 'src/room/entities/message.entity';
import { Room } from 'src/room/entities/room.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  avatar: string;

  @Column({ name: 'is_admin' })
  isAdmin: boolean;

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

  @JoinTable()
  @ManyToOne(() => Room, (room: Room) => room.users)
  room: Room;

  @JoinTable()
  @ManyToMany(() => Room, (room: Room) => room.bannedUsers, { eager: true })
  bannedRooms: Array<Room>;

  @OneToMany(() => Message, (message: Message) => message.user)
  messages: Array<Message>;
}
