import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, FindOneUserDto, UpdateUserDto, UsersServiceController, UsersServiceControllerMethods,  } from '@app/common';

@Controller()
@UsersServiceControllerMethods()
export class UsersController implements UsersServiceController {
    constructor(private readonly usersService: UsersService) { }

    createUser( createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }

    findAllUsers() {
        return this.usersService.findAll();
    }

    findOneUser( getOneUserDto:  FindOneUserDto) {
        return this.usersService.findOne(getOneUserDto.id);
    }

    updateUser( updateUserDto: UpdateUserDto) {
        return this.usersService.update(updateUserDto.id, updateUserDto);
    }

    removeUser( {id}: FindOneUserDto) {
        return this.usersService.remove(id);
    }
}
