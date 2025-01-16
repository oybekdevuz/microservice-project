import { Injectable, NotFoundException } from '@nestjs/common';
import { AddBookDto, CreateUserDto, FindOneUserDto, UpdateUserDto, User } from '@app/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { BookEntity, BookRepository, UserEntity, UserRepository } from '@app/core';
import { GrpcException } from '../../../../../libs/common/src/exeptions/custom-error';
import { status } from '@grpc/grpc-js';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity) private readonly userRepo: UserRepository,
        @InjectRepository(BookEntity) private readonly bookRepo: BookRepository,
    ) { }
    async create(createUserDto: CreateUserDto) {
        const hashed_pass = await bcrypt.hash(createUserDto.password, 10);
        createUserDto.password = hashed_pass;
        return this.userRepo.save(createUserDto);
    }

    async addBookToUser(dto: AddBookDto) {
        const user = await this.userRepo.findOne({ where: { id: dto.userId }, relations: { books: true } });
        const book = await this.bookRepo.findOne({ where: { id: dto.bookId } });
        if (!user) {
            throw new NotFoundException('User not found')
        }
        if (!book) {
            throw new NotFoundException('Book not found')
        }
        user.books.push(book)

        await this.userRepo.save(user)
        return user;
    }
    async removeBookFromUser(dto: AddBookDto) {
        const user = await this.userRepo.findOne({ where: { id: dto.userId }, relations: { books: true } });
        const book = await this.bookRepo.findOne({ where: { id: dto.bookId } });
        if (!user) {
            throw new NotFoundException('User not found')
        }
        if (!book) {
            throw new NotFoundException('Book not found')
        }
        const bookIndex = user.books.findIndex((e) => e.id === book.id);
        if (bookIndex !== -1) {
            user.books.splice(bookIndex)[0];
            await this.userRepo.save(user);
        }

        return user;
    }

    async findAll() {
        const users = await this.userRepo.find({relations: { books: true } });
        return { users }
    }

    async findOne(id: string) {
        const user = await this.userRepo.findOne({ where: { id }, relations: { books: true } });
        if (!user) {
            throw new RpcException({
                status: 404,
                message: 'User not found',
            });
        }
        return user
    }

    async update(id: string, updateUserDto: UpdateUserDto) {
        if (updateUserDto.password) {
            const hashed_pass = await bcrypt.hash(updateUserDto.password, 10);
            updateUserDto.password = hashed_pass;
        }
        const user = await this.userRepo.preload({ ...updateUserDto, id });
        if (!user) {
            throw new GrpcException('User not found', status.NOT_FOUND);
        }
        return this.userRepo.save(user);
    }

    async remove(id: string) {
        const user = await this.userRepo.findOne({ where: { id } });
        if (!user) {
            throw new NotFoundException("User not found")
        }
        await this.userRepo.delete(id);
        return user
    }
}
