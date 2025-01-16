import { Module } from '@nestjs/common';
import { UsersModule } from './api/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from '../../../config';
import { BookEntity, UserEntity } from '@app/core';

@Module({
  imports: [
    TypeOrmModule.forRoot({
        type: "postgres",
        url: config.DB_URL,
        entities: [UserEntity, BookEntity],
        synchronize: true,
    }),
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AuthModule {}
