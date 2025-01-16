import { NestFactory } from '@nestjs/core';
import { BookModule } from './book.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { BOOK_PACKAGE_NAME } from '../../../libs/common/src/types/book';
import { config } from '../../../config';

async function bootstrap() {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(
        BookModule,
        {
            transport: Transport.GRPC,
            options: {
                protoPath: join(__dirname, '../book.proto'),
                package: BOOK_PACKAGE_NAME,
                url: config.BOOK_URL,
            }
        }
    )
    await app.listen();
}
bootstrap();
