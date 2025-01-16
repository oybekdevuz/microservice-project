import { Repository } from "typeorm";
import { BookEntity } from "../entity";

export type BookRepository = Repository<BookEntity>;