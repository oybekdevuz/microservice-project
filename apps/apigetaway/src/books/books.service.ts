import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { BOOK_PACKAGE_NAME, BOOKS_SERVICE_NAME, BooksServiceClient, CreateBookDto, UpdateBookDto } from '@app/common';
import { ClientGrpc } from '@nestjs/microservices';


@Injectable()
export class BooksService implements OnModuleInit {

    private booksService: BooksServiceClient;

    constructor(@Inject(BOOK_PACKAGE_NAME) private client: ClientGrpc) { }

    onModuleInit() {
        this.booksService = this.client.getService<BooksServiceClient>(BOOKS_SERVICE_NAME);
    }
    create(createBookDto: CreateBookDto) {
        return this.booksService.createBook(createBookDto);
    }

    findAll() {
        return this.booksService.findAllBooks({});
    }

    findOne(id: string) {
        return this.booksService.findOneBook({ id });
    }

    update(id: string, updateBookDto: UpdateBookDto) {
        return this.booksService.updateBook({ ...updateBookDto, id });
    }

    remove(id: string) {
        return this.booksService.removeBook({ id });
    }
}
