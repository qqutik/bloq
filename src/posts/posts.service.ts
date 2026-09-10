import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto.js';
import { UpdatePostDto } from './dto/update-post.dto.js';
import { Post } from './entities/post.entity.js';

@Injectable()
export class PostsService {
  private posts: Post[] = [
    {
      id: 1,
      author: 'udot',
      title: 'Перший пост',
      text: 'Привіт, світ',
      alias: 'first-post',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 2,
      author: 'jack',
      title: 'Другий пост',
      text: 'Ще один текст',
      alias: 'second-post',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  private nextPostId: number = 3;

  create(createPostDto: CreatePostDto) {
    const newPost: Post = {
      id: this.nextPostId,
      author: createPostDto.author,
      title: createPostDto.title,
      text: createPostDto.text,
      alias: createPostDto.alias,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.posts.push(newPost);
    this.nextPostId++;

    return newPost;
  }

  findAll() {
    return this.posts;
  }

  findOne(id: number) {
    const post = this.posts.find((post) => post.id === id);
    if (!post) {
      throw new NotFoundException(`Post #${id} not found`);
    }
    return post;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    const post = this.findOne(id);
    Object.assign(post, updatePostDto);
    return post;
  }

  remove(id: number) {
    const post = this.findOne(id);
    const index = this.posts.indexOf(post);
    this.posts.splice(index, 1);
    return post;
  }
}
