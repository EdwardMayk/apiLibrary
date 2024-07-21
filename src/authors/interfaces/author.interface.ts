import { CreateAuthorDto } from "../dto/create-author.dto";
import { UpdateAuthorDto } from "../dto/update-author.dto";
import { Author } from "../models/author.model";

export interface AuthorInterface {
    getAllAuthors(): Promise<Author[]>;
    createAuthor(dto: CreateAuthorDto): Promise<Author>;
    getAuthorById(id: number): Promise<Author>;
    updateAuthor(id: number, dto: UpdateAuthorDto): Promise<Author>;
    deleteAuthor(id: number): Promise<Author>;
}