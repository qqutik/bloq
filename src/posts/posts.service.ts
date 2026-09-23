import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto.js';
import { UpdatePostDto } from './dto/update-post.dto.js';
import { Post } from './entities/post.entity.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
  ) {}

  public async create(createPostDto: CreatePostDto, userId: number) {
    const post = this.postsRepository.create({
      ...createPostDto,
      user: { id: userId },
    });
    return this.postsRepository.save(post);
  }

  public async findAll() {
    return this.postsRepository.find({ relations: { user: true } });
  }

  public async findOne(id: number) {
    const post = await this.postsRepository.findOne({
      where: { id },
      relations: { user: true },
    });
    if (!post) {
      throw new NotFoundException(`Post #${id} not found`);
    }
    return post;
  }

  public async update(id: number, updatePostDto: UpdatePostDto) {
    const post = await this.findOne(id);
    Object.assign(post, updatePostDto);
    return this.postsRepository.save(post);
  }

  public async remove(id: number) {
    const post = await this.findOne(id);
    return this.postsRepository.remove(post);
  }
}
