import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookEntity, UserEntity } from '@app/core';

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity, BookEntity])],
    controllers: [UsersController],
    providers: [UsersService],
})
export class UsersModule { }
