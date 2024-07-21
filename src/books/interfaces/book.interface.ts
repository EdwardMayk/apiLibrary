import { CreateBookDto } from "../dto/create-book.dto";
import { UpdateBookDto } from "../dto/update-book.dto";
import { Book } from "../models/book.model";


export interface BookInterface {
    getAllBooks(): Promise<Book[]>;
    getBookById(id: number): Promise<Book | null>;
    createBook(createBookDto: CreateBookDto): Promise<Book>;
    updateBook(id: number, updateBookDto: UpdateBookDto): Promise<Book>;
    deleteBook(id: number): Promise<Book>;
}