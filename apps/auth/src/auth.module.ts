import { Module } from '@nestjs/common';
import { UsersModule } from './api/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from '../../../config';
import { UserEntity } from './core';

@Module({
  imports: [UsersModule,
    TypeOrmModule.forRoot({
        type: "postgres",
        url: config.DB_URL,
        entities: [UserEntity],
        synchronize: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AuthModule {}
