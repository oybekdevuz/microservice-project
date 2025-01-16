import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AUTH_PACKAGE_NAME } from '../../../libs/common/src';
import { config } from '../../../config';
import { GlobalExceptionFilter } from '../../../libs/common/src/exeptions/global-exeption';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions> (
    AuthModule,
    {transport: Transport.GRPC,
        options: {
            protoPath: join(__dirname, '../auth.proto'),
            package: AUTH_PACKAGE_NAME,
            // url: config.AUTH_URL,
        }
    }
  )
  app.useGlobalFilters(new GlobalExceptionFilter());
  await app.listen();
}
bootstrap();
