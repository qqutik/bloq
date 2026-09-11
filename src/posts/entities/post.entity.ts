import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 255, unique: true, nullable: false })
  alias: string;

  @Column('varchar', { length: 255, nullable: false })
  title: string;

  @Column('text')
  text: string;

  @Column('varchar', { length: 255, nullable: false })
  author: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
