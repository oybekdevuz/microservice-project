import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto, UpdateBookDto } from '@app/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookEntity, BookRepository } from '@app/core';

@Injectable()
export class BooksService {
    constructor(@InjectRepository(BookEntity) private readonly bookRepo: BookRepository) { }

    create(createBookDto: CreateBookDto) {
        return this.bookRepo.save(createBookDto);
    }

    async findAll() {
        const books = await this.bookRepo.find();
        return { books }
    }

    async findOne(id: string) {
        const book = await this.bookRepo.findOne({ where: { id } });
        if(!book) {
            throw new NotFoundException("Book not found")
        }
        return book;
    }
    
    async update(id: string, updateBookDto: UpdateBookDto) {
        
        const book = await this.bookRepo.preload({ ...updateBookDto, id });
        if (!book) {
            throw new NotFoundException("Book not found")    
        }
        return this.bookRepo.save(book);
    }

    async remove(id: string) {
        const book = await this.bookRepo.findOne({ where: { id } });
        if(!book) {
            throw new NotFoundException("Book not found")
        }
        await this.bookRepo.delete(id);

        return book;
    }
}
