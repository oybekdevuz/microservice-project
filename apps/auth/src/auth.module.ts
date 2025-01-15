import { Module } from '@nestjs/common';
import { UsersModule } from './api/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from '../../../config';

@Module({
  imports: [UsersModule,
    TypeOrmModule.forRoot({
        type: "postgres",
        url: config.DB_URL,
        entities: [`dist/apps/auth/core/entity/*.entity{.ts,.js}`],
        synchronize: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AuthModule {}
