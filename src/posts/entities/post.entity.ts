import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import type { User } from '../../users/entities/user.entity.js';
import { PostStatus } from '../enums/post-status.enum.js';

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: PostStatus, default: PostStatus.DRAFT })
  status: PostStatus;

  @Column('varchar', { length: 255, unique: true, nullable: false })
  alias: string;

  @Column('varchar', { length: 255, nullable: false })
  title: string;

  @Column('text')
  text: string;

  @ManyToOne('User', (user: User) => user.posts)
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
