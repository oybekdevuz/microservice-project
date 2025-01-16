import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { AddBookDto, CreateUserDto, UpdateUserDto, USERS_SERVICE_NAME, UsersServiceClient } from '@app/common';
import { AUTH_SERVICE } from './constants';
import { ClientGrpc } from '@nestjs/microservices';

@Injectable()
export class UsersService implements OnModuleInit {
    private usersService: UsersServiceClient;

    constructor(@Inject(AUTH_SERVICE) private client: ClientGrpc) { }

    onModuleInit() {
        this.usersService = this.client.getService<UsersServiceClient>(USERS_SERVICE_NAME);
    }

    create(createUserDto: CreateUserDto) {
        return this.usersService.createUser(createUserDto);
    }

    async addBookToUser(dto: AddBookDto) {
        return this.usersService.addBookToUser(dto)
    }
    async removeBookfromUser(dto: AddBookDto) {
        return this.usersService.removeBookFromUser(dto)
    }

    findAll() {
        return this.usersService.findAllUsers({});
    }

    findOne(id: string) {
        return this.usersService.findOneUser({ id });
    }

    update(id: string, updateUserDto: UpdateUserDto) {
        updateUserDto.id = id;
        return this.usersService.updateUser(updateUserDto);
    }

    remove(id: string) {
        return this.usersService.removeUser({ id });
    }
}
