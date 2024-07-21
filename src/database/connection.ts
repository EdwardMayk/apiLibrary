
import { Sequelize } from "sequelize-typescript";
import { Author } from "../authors/models/author.model";
import { Book } from "../books/models/book.model";
import { User } from "../users/models/user.model";

export const sequelize = new Sequelize({
    dialect: 'postgres',
    database: process.env.DB_NAME || 'libraryDB',
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'password',
    host: process.env.DB_HOST || '0.0.0.0',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    models: [User, Author, Book],
    logging: false
});

