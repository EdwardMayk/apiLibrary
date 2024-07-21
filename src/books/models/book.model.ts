import {
    Table,
    Column,
    Model,
    DataType,
    ForeignKey,
    BelongsTo,
  } from 'sequelize-typescript';
import { Author } from '../../authors/models/author.model';
  
@Table({
    tableName: 'books',
    timestamps: true,
  })
export class Book extends Model<Book> {
    @Column({
      type: DataType.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    })
    id: number;

    @Column({
      type: DataType.STRING,
      allowNull: false,
    })
    title: string;
  
    @Column({
      type: DataType.STRING,
      allowNull: false,
    })
    gender: string; 

    @ForeignKey(() => Author)
    @Column({
      type: DataType.INTEGER,
      allowNull: true,
    })
    authorId?: number;
  
    @BelongsTo(() => Author)
    author: Author;
  }