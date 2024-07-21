import {
    Table,
    Column,
    Model,
    DataType,
    HasMany,
    ForeignKey,
    BelongsTo,
  } from 'sequelize-typescript';
import { Book } from '../../books/models/book.model';
import { User } from '../../users/models/user.model';

@Table({
    tableName: 'authors',
    timestamps: true,
})
 export class Author extends Model<Author> {
    @Column({
      type: DataType.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    })
    id: number;

    @Column({
      type: DataType.STRING,
      allowNull: true,
    })
    name: string;
  
    @Column({
      type: DataType.STRING,
      allowNull: true,
    })
    lastname?: string;

    @Column({
      type: DataType.STRING,
      allowNull: true,
    })
    specialization?: string;
  
    @Column({
      type: DataType.INTEGER,
      defaultValue: 0,
    })
    bookCount: number;
  
    @HasMany(() => Book)
    books: Book[];

    @ForeignKey(() => User)
    @Column({
      type: DataType.INTEGER,
      allowNull: false,
    })
    userId!: number;
  
    @BelongsTo(() => User)
    user!: User;
  }