import {
  Table,
  Column,
  Model,
  DataType,
  HasOne
} from 'sequelize-typescript';
import { Author } from '../../authors/models/author.model';

@Table({
  tableName: 'users',
  timestamps: true,
})
export class User extends Model<User> {
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
    name?: string;

    @Column({
      type: DataType.STRING,
      allowNull: true,
    })
    username: string;

    @Column({
      type: DataType.STRING,
      allowNull: true,
      unique: true,
    })
    email?: string;

    @Column({
      type: DataType.STRING,
      allowNull: false,
    })
    password: string;

    @Column({
      type: DataType.STRING,
      defaultValue: 'user', 
    })
    role: string;
  
    @HasOne(() => Author)
    authorProfile?: Author; 
  }