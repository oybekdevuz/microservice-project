import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { BOOK_PACKAGE_NAME } from '../../../../libs/common/src';
import { join } from 'path';
import { BOOK_SERVICE } from './constants';

@Module({
    imports: [
        ClientsModule.register([
            {
                name: BOOK_SERVICE,
                transport: Transport.GRPC,
                options: {
                    url: '127.0.0.1:3002',
                    package: BOOK_PACKAGE_NAME,
                    protoPath: join(__dirname, '../book.proto')
                }
            }
        ])
    ],
    controllers: [BooksController],
    providers: [BooksService],
})
export class    BooksModule { }
