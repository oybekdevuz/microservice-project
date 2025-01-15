import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto, FindOneUserDto, UpdateUserDto, User } from '@app/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { UserEntity, UserRepository } from '../../../core';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(UserEntity) private readonly userRepo: UserRepository) { }
    async create(createUserDto: CreateUserDto) {
        const hashed_pass = await bcrypt.hash(createUserDto.password, 10);
        createUserDto.password = hashed_pass;
        return this.userRepo.save(createUserDto);
    }

    async findAll() {
        const users = await this.userRepo.find();
        return { users }
    }

    async findOne(id: string) {
        const user = await this.userRepo.findOne({ where: { id } }); 
        if(!user) {
            throw new NotFoundException("User not found")
        }
        return user
    }

    async update(id: string, updateUserDto: UpdateUserDto) {
        const user = await this.userRepo.findOne({ where: { id } }); 
        if(!user) {
            throw new NotFoundException("User not found")
        }
        await this.userRepo.update({ id }, updateUserDto);
        return user;
    }

    async remove(id: string) {
        const user = await this.userRepo.findOne({ where: { id } }); 
        if(!user) {
            throw new NotFoundException("User not found")
        }
        await this.userRepo.delete(id);
        return user
    }
}
