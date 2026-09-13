import { Module } from '@nestjs/common';
import { createObserveModule } from '@nestjs/observe';
import { PostsModule } from './posts/posts.module.js';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { PostsService } from './posts/posts.service.js';
import { Post } from './posts/entities/post.entity.js';
import { PostsController } from './posts/posts.controller.js';
import { UsersModule } from './users/users.module.js';
import { User } from './users/entities/user.entity.js';
import { UsersController } from './users/users.controller.js';
import { UsersService } from './users/users.service.js';

export const { ObserveModule, ObserveInstrument } = createObserveModule();

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.get<string>('DB_HOST'),
        port: Number(config.get('DB_PORT')),
        username: config.get<string>('DB_USER'),
        password: config.get<string>('DB_PASSWORD'),
        database: config.get<string>('DB_NAME'),
        autoLoadEntities: true,
        synchronize: false,
        namingStrategy: new SnakeNamingStrategy(),
      }),
    }),

    // Distributed tracing, auto-correlated logs, request/job metrics, error
    // telemetry, alarms, and more — out of the box. Sign up at https://observe.nestjs.com
    ObserveModule.forRoot({
      appKey: 'YOUR_APP_KEY',
      appSecret: 'YOUR_APP_SECRET',
      serviceId: 'bloq',
    }),
    PostsModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
@Module({
  imports: [TypeOrmModule.forFeature([Post,User])],
  controllers: [PostsController,UsersController],
  providers: [PostsService,UsersService],
})
export class AppModule {}
