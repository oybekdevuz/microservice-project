import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from '../../../config';
import { BookEntity, UserEntity } from '@app/core';
import { BooksModule } from './api/books/books.module';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: "postgres",
            url: config.DB_URL,
            entities: [BookEntity, UserEntity],
            synchronize: true,
        }),
        BooksModule,
    ],
    controllers: [],
    providers: [],
})
export class BookModule { }
