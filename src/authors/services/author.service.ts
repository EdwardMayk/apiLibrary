import { Book } from "../../books/models/book.model";
import { CreateAuthorDto } from "../dto/create-author.dto";
import { AuthorInterface } from "../interfaces/author.interface";
import { Author } from "../models/author.model";
import { AuthorRepository } from "../repositories/author.repository";
import * as XLSX from 'xlsx';
import * as path from 'path';


export class AuthorService implements AuthorInterface {
    private readonly authorRepository: AuthorRepository;

    constructor() {
        this.authorRepository = new AuthorRepository();
    }

    async createAuthor(dto: CreateAuthorDto): Promise<Author> {
        return await this.authorRepository.createAuthor(dto);
    }

    async getAllAuthors(): Promise<Author[]> {
        return await this.authorRepository.getAllAuthors();
    }

    async getAuthorById(id: number): Promise<Author> {
        const author = await this.authorRepository.getAuthorById(id);

        if (!author) {
            throw new Error('Author not found');
        }

        return author;
    }

    async updateAuthor(id: number, dto: CreateAuthorDto): Promise<Author> {
        return await this.authorRepository.updateAuthor(id, dto);
    }

    async deleteAuthor(id: number): Promise<Author> {
        return this.authorRepository.deleteAuthor(id);
    }

    async exportAuthorsToXlsx(): Promise<string> {
        const authors = await this.getAllAuthors();

        const authorsJson = authors.map(author => ({
            id: author.id,
            name: author.name,
            lastname: author.lastname,
            specialization: author.specialization,
            bookCount: author.bookCount,
            userId: author.userId,
        }));

        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.json_to_sheet(authorsJson);

        XLSX.utils.book_append_sheet(workbook, worksheet, 'Authors');

        const filePath = path.join(__dirname, '../exports/authors.xlsx');

        XLSX.writeFile(workbook, filePath);

        return filePath;
    }
}