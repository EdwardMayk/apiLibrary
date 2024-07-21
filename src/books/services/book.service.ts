import { CreateBookDto } from '../dto/create-book.dto';
import { UpdateBookDto } from '../dto/update-book.dto';
import { BookInterface } from '../interfaces/book.interface';
import { Book } from '../models/book.model';
import { BookRepository } from '../repositories/book.repository';
import * as XLSX from 'xlsx';
import * as path from 'path';

export class BookService implements BookInterface {

  private readonly bookRepository: BookRepository;

  constructor() {
    this.bookRepository = new BookRepository();
  }

  async getAllBooks(): Promise<Book[]> {
    return await this.bookRepository.getAllBooks();
  }

  async getBookById(id: number) {
    return await this.bookRepository.getBookById(id);
  }

  async createBook(createBookDto: CreateBookDto) {
    return await this.bookRepository.createBook(createBookDto);
  }

  async updateBook(id: number, updateBookDto: UpdateBookDto): Promise<Book> {
    return await this.bookRepository.updateBook(id, updateBookDto);
  }

  async deleteBook(id: number): Promise<Book> {
    return await this.bookRepository.deleteBook(id);
  }

  async exportBooksToXlsx(): Promise<string> {
    const books = await this.getAllBooks();
    
    const booksJson = books.map(book => ({
      id: book.id,
      title: book.title,
      gender: book.gender,
      authorId: book.authorId,
    }));

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(booksJson);

    XLSX.utils.book_append_sheet(workbook, worksheet, 'Books');

    const filePath = path.join(__dirname, '../exports/books.xlsx');

    XLSX.writeFile(workbook, filePath);

    return filePath;
  }

}