import { CreateUserDto } from "../dto/create-user.dto";
import { User } from "../models/user.model";
import { UserInterface } from "../interfaces/user.interface";
import { UserRepository } from "../repositories/user.repository";
import { UpdateUserDto } from "../dto/updat-user.dto";
import { BookService } from "../../books/services/book.service";
import { AuthorService } from "../../authors/services/author.service";
import * as XLSX from 'xlsx';
import * as path from 'path';

export class UserService implements UserInterface {
    private userRepository: UserRepository;
    private bookService: BookService;
    private authorService: AuthorService;

    constructor() {
        this.userRepository = new UserRepository();
        this.bookService = new BookService();
        this.authorService = new AuthorService();
    }

    async getAllUsers(): Promise<User[]> {
        return await this.userRepository.getAllUsers();
    }

    async findUserByEmail(email: string): Promise<User> {
        return await this.userRepository.findUserByEmail(email);
    }

    async createUser(dto: CreateUserDto): Promise<User> {
        return await this.userRepository.createUser(dto);
    }

    async updateUser(id: number, dto: UpdateUserDto): Promise<User> {
        return await this.userRepository.updateUser(id,dto);
    }

    async deleteUser(id: string): Promise<User> {
        return await this.userRepository.deleteUser(id);
    }

    async exportBookAuthorsToXlsx(): Promise<string> {
      try {
        const books = await this.bookService.getAllBooks();
        const authors = await this.authorService.getAllAuthors();
  
        const booksJson = books.map(book => ({
          id: book.id,
          title: book.title,
          gender: book.gender,
          authorId: book.authorId,
        }));
  
        const authorsJson = authors.map(author => ({
          id: author.id,
          name: author.name,
          lastname: author.lastname,
          specialization: author.specialization,
          bookCount: author.bookCount,
          userId: author.userId,
        }));
  
        const workbook = XLSX.utils.book_new();
  
        const worksheetBooks = XLSX.utils.json_to_sheet(booksJson);
        const worksheetAuthors = XLSX.utils.json_to_sheet(authorsJson);
  
        XLSX.utils.book_append_sheet(workbook, worksheetBooks, 'Books');
        XLSX.utils.book_append_sheet(workbook, worksheetAuthors, 'Authors');
  
        const filePath = path.join(__dirname, '../exports/books-authors.xlsx');
  
        XLSX.writeFile(workbook, filePath);
  
        return filePath;
      } catch (error) {
        console.error('Error al exportar datos a Excel:', error);
        throw new Error('No se pudo exportar el archivo Excel.');
      }
    }
}