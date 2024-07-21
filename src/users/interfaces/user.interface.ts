import { CreateUserDto } from "../dto/create-user.dto";
import { UpdateUserDto } from "../dto/updat-user.dto";

import { User } from "../models/user.model";

export interface UserInterface {
    getAllUsers(): Promise<User[]>;
    findUserByEmail(email: string): Promise<User>;
    createUser(dto: CreateUserDto): Promise<User>;
    updateUser(id: number,dto: UpdateUserDto): Promise<User>;
    deleteUser(id: string): Promise<User>;
}