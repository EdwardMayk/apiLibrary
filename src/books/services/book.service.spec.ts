import { BookService } from '../services/book.service';
import { BookRepository } from '../repositories/book.repository';
import { CreateBookDto } from '../dto/create-book.dto';
import { UpdateBookDto } from '../dto/update-book.dto';
import { Book } from '../models/book.model';
import * as XLSX from 'xlsx';
import * as path from 'path';

// Mocks
jest.mock('../repositories/book.repository');
jest.mock('xlsx');
jest.mock('path');

describe('BookService', () => {
  let bookService: BookService;
  let bookRepository: jest.Mocked<BookRepository>;

  beforeEach(() => {
    bookRepository = new BookRepository() as jest.Mocked<BookRepository>;
    bookService = new BookService();
  });

  it('should get all books', async () => {
    const mockBooks: Book[] = [
      { id: 1, title: 'Book 1', gender: 'Fiction', authorId: 1 } as any,
      { id: 2, title: 'Book 2', gender: 'Non-Fiction', authorId: 2 } as any
    ];
    
    bookRepository.getAllBooks.mockResolvedValue(mockBooks);

    const books = await bookService.getAllBooks();
    expect(books).toEqual(mockBooks);
    expect(bookRepository.getAllBooks).toHaveBeenCalled();
  });

  it('should get a book by id', async () => {
    const mockBook: Book = { id: 1, title: 'Book 1', gender: 'Fiction', authorId: 1 } as any;

    bookRepository.getBookById.mockResolvedValue(mockBook);

    const book = await bookService.getBookById(1);
    expect(book).toEqual(mockBook);
    expect(bookRepository.getBookById).toHaveBeenCalledWith(1);
  });

  it('should create a book', async () => {
    const createBookDto: CreateBookDto = { title: 'Book 1', gender: 'Fiction', authorId: 1 };
    const mockBook: Book = { id: 1, ...createBookDto } as any;

    bookRepository.createBook.mockResolvedValue(mockBook);

    const book = await bookService.createBook(createBookDto);
    expect(book).toEqual(mockBook);
    expect(bookRepository.createBook).toHaveBeenCalledWith(createBookDto);
  });

  it('should update a book', async () => {
    const updateBookDto: UpdateBookDto = { title: 'Updated Book', gender: 'Non-Fiction', authorId: 1 };
    const mockBook: Book = { id: 1, title: 'Updated Book', gender: 'Non-Fiction', authorId: 1 } as any;

    bookRepository.updateBook.mockResolvedValue(mockBook);

    const book = await bookService.updateBook(1, updateBookDto);
    expect(book).toEqual(mockBook);
    expect(bookRepository.updateBook).toHaveBeenCalledWith(1, updateBookDto);
  });

  it('should delete a book', async () => {
    const mockBook: Book = { id: 1, title: 'Book 1', gender: 'Fiction', authorId: 1 } as any;

    bookRepository.deleteBook.mockResolvedValue(mockBook);

    const book = await bookService.deleteBook(1);
    expect(book).toEqual(mockBook);
    expect(bookRepository.deleteBook).toHaveBeenCalledWith(1);
  });

  it('should export books to XLSX', async () => {
    const mockBooks: Book[] = [
      { id: 1, title: 'Book 1', gender: 'Fiction', authorId: 1 } as any,
      { id: 2, title: 'Book 2', gender: 'Non-Fiction', authorId: 2 } as any
    ];
    
    bookRepository.getAllBooks.mockResolvedValue(mockBooks);

    const mockWriteFile = jest.spyOn(XLSX, 'writeFile').mockImplementation(() => {});
    const mockPathJoin = jest.spyOn(path, 'join').mockReturnValue('/path/to/exports/books.xlsx');

    const filePath = await bookService.exportBooksToXlsx();
    expect(filePath).toBe('/path/to/exports/books.xlsx');
    expect(bookRepository.getAllBooks).toHaveBeenCalled();
    expect(XLSX.writeFile).toHaveBeenCalled();
    expect(path.join).toHaveBeenCalledWith(__dirname, '../exports/books.xlsx');

    mockWriteFile.mockRestore();
    mockPathJoin.mockRestore();
  });
});