import { Controller } from '@nestjs/common';
import { BooksService } from './books.service';
import { BOOKS_SERVICE_NAME, BooksServiceController, CreateBookDto, FindOneBookDto, UpdateBookDto } from '@app/common';
import { GrpcMethod } from '@nestjs/microservices';

@Controller()
export class BooksController implements BooksServiceController {
    constructor(private readonly booksService: BooksService) { }

    @GrpcMethod(BOOKS_SERVICE_NAME, 'CreateBook')
    createBook(createBookDto: CreateBookDto) {
        return this.booksService.create(createBookDto);
    }

    @GrpcMethod(BOOKS_SERVICE_NAME, 'findAllBooks')
    findAllBooks() {
        return this.booksService.findAll();
    }
    
    @GrpcMethod(BOOKS_SERVICE_NAME, 'findOneBook')
    findOneBook({id}: FindOneBookDto) {
        return this.booksService.findOne(id);
    }
    
    @GrpcMethod(BOOKS_SERVICE_NAME, 'updateBook')
    updateBook(updateBookDto: UpdateBookDto) {
        return this.booksService.update(updateBookDto.id, updateBookDto);
    }
    
    @GrpcMethod(BOOKS_SERVICE_NAME, 'removeBook')
    removeBook({id}: FindOneBookDto) {
        return this.booksService.remove(id);
    }
}
