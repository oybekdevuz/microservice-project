import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { AddBookDto, CreateUserDto, UpdateUserDto } from '@app/common';
import { AddBookInputDto, InputDto } from './dto/input.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' }) 
  @ApiResponse({ status: 201, description: 'The user has been successfully created.' }) 
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  @ApiBody({ type: InputDto })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Post('book/add')
  @ApiOperation({ summary: 'Add a book to a user' }) 
  @ApiResponse({ status: 200, description: 'The book has been successfully added to the user.' }) 
  @ApiResponse({ status: 404, description: 'User or book not found.' }) 
  @ApiBody({ type: AddBookInputDto })
  addBookToUser(@Body() dto: AddBookDto) {
    return this.usersService.addBookToUser(dto);
  }

  @Post('book/remove')
  @ApiOperation({ summary: 'Remove a book from a user' }) 
  @ApiResponse({ status: 200, description: 'The book has been successfully removed from the user.' }) 
  @ApiResponse({ status: 404, description: 'User or book not found.' }) 
  removeBookfromUser(@Body() dto: AddBookDto) {
    return this.usersService.removeBookfromUser(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all users' }) 
  @ApiResponse({ status: 200, description: 'List of all users.' }) 
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a user by ID' }) 
  @ApiResponse({ status: 200, description: 'Details of the requested user.' }) 
  @ApiResponse({ status: 404, description: 'User not found.' }) 
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a user by ID' }) 
  @ApiResponse({ status: 200, description: 'The user has been successfully updated.' }) 
  @ApiResponse({ status: 404, description: 'User not found.' }) 
  @ApiBody({ type: InputDto })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user by ID' }) 
  @ApiResponse({ status: 200, description: 'The user has been successfully deleted.' }) 
  @ApiResponse({ status: 404, description: 'User not found.' }) 
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
