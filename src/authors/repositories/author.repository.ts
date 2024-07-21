// src/repositories/author.repository.ts
import { Author } from "../models/author.model";
import { CreateAuthorDto } from "../dto/create-author.dto";
import { AuthorInterface } from "../interfaces/author.interface";
import { UpdateAuthorDto } from "../dto/update-author.dto";
import { User } from "../../users/models/user.model";
import { encrypt } from "../../auth/utils/bcrypt.handle";
import { RoleUser } from "../../auth/enum/role-user.enum";

export class AuthorRepository implements AuthorInterface {

    async getAllAuthors(): Promise<Author[]> {
        return await Author.findAll();
    }

    async createAuthor(dto: CreateAuthorDto): Promise<Author> {

        const passwordEncrypted = await encrypt(dto.name+dto.specialization);

        const user = await User.create({
            ...dto,
            name: dto.name,
            role: RoleUser.AUTHOR,
            password: passwordEncrypted
        });

        return await Author.create({
            name: dto.name,
            lastname: dto.lastname,
            specialization: dto.specialization,
            userId: user.id
        });
    }

    async getAuthorById(id: number): Promise<Author | null> {
        return await Author.findByPk(id);
    }

    async updateAuthor(id: number, dto: UpdateAuthorDto): Promise<Author> {
        const author = await this.getAuthorById(id);
        if (!author) {
            throw new Error('Author not found');
        }
        return await author.update(dto);
    }

    async deleteAuthor(id: number): Promise<Author> {
        const author = await this.getAuthorById(id);
        if (!author) {
            throw new Error('Author not found');
        }
        await author.destroy();
        return author;
    }
}