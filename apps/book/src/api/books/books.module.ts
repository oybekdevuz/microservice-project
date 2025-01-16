import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookEntity } from '../../../../../core';

@Module({
    imports: [TypeOrmModule.forFeature([BookEntity])],
    controllers: [BooksController],
    providers: [BooksService],
})
export class BooksModule { }
