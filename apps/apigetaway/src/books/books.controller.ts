import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { BooksService } from './books.service';
import { CreateBookDto, UpdateBookDto } from '@app/common';
import { InputDto } from './dto/input.dto';

@ApiTags('Books')
@Controller('books')
export class BooksController {
    constructor(private readonly booksService: BooksService) { }

    @Post()
    @ApiOperation({ summary: 'Create a new book' })
    @ApiResponse({ status: 201, description: 'The book has been successfully created.' })
    @ApiResponse({ status: 400, description: 'Invalid input.' })
    @ApiBody({ type: InputDto })
    create(@Body() createBookDto: CreateBookDto) {
        return this.booksService.create(createBookDto);
    }

    @Get()
    @ApiOperation({ summary: 'Retrieve all books' })
    @ApiResponse({ status: 200, description: 'List of all books.' })
    findAll() {
        return this.booksService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Retrieve a book by ID' })
    @ApiResponse({ status: 200, description: 'Details of the requested book.' })
    @ApiResponse({ status: 404, description: 'Book not found.' })
    findOne(@Param('id') id: string) {
        return this.booksService.findOne(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update a book by ID' })
    @ApiResponse({ status: 200, description: 'The book has been successfully updated.' })
    @ApiResponse({ status: 404, description: 'Book not found.' })
    @ApiBody({ type: InputDto })
    update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
        return this.booksService.update(id, updateBookDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a book by ID' })
    @ApiResponse({ status: 200, description: 'The book has been successfully deleted.' })
    @ApiResponse({ status: 404, description: 'Book not found.' })
    remove(@Param('id') id: string) {
        return this.booksService.remove(id);
    }
}
