
import { bookUpdateQueue } from "../../authors/jobs/update-book-count.job";
import { CreateBookDto } from "../dto/create-book.dto";
import { UpdateBookDto } from "../dto/update-book.dto";
import { BookInterface } from "../interfaces/book.interface";
import { Book } from "../models/book.model";


export class BookRepository implements BookInterface{
    async getAllBooks(): Promise<Book[]> {
        return await Book.findAll({
            include: ['author'],
        });
    }
   
    async createBook(createBookDto: CreateBookDto): Promise<Book> {
        try {
        const book = await Book.create(createBookDto);
        if (book.authorId) {
            await bookUpdateQueue.add({ authorId: book.authorId });
        }
        return book;
        } catch (error) {
        throw new Error('Failed to create book');
        }
    }

    async getBookById(id: number): Promise<Book | null> {
        return await Book.findByPk(id);
    }

    async updateBook(id: number, dto: UpdateBookDto): Promise<Book> {
        const book = await this.getBookById(id);

        if (!book) {
            throw new Error('Book not found');
        }

        return await book.update(dto);
    }

    async deleteBook(id: number): Promise<Book> {
        const book = await this.getBookById(id);

        if (!book) {
            throw new Error('Book not found');
        }

        await book.destroy();
        return book;
    }
}