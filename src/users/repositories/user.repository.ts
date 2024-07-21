
import { encrypt } from "../../auth/utils/bcrypt.handle";
import { Author } from "../../authors/models/author.model";
import { CreateUserDto } from "../dto/create-user.dto";
import { UpdateUserDto } from "../dto/updat-user.dto";
import { UserInterface } from "../interfaces/user.interface";
import { User } from "../models/user.model";

export class UserRepository implements UserInterface {
    async getAllUsers(): Promise<User[]> {
        return await User.findAll();
    }

    async findUserByEmail(email: string): Promise<User> {
        const user = await User.findOne({ 
            where: { email },
            include: [{ model: Author, as: 'authorProfile' }], 
        });
        
        return user;
    }

    async createUser(dto: CreateUserDto): Promise<User> {
        const passwordEncrypted = await encrypt(dto.password);

        const newUser = await User.create({
            email: dto.email,
            password: passwordEncrypted,
            name: dto.name,
            username: dto.username,
            role: dto.role,

        });

        delete newUser.password;
        return newUser;
    }

    async updateUser(id: number, dto: UpdateUserDto): Promise<User> {
        const user = await User.findOne({ where: { id } });
        if (!user) {
            throw new Error('User not found');
        }

        const passwordEncrypted = await encrypt(dto.password);

        const updatedUser = await user.update({
            email: dto.email,
            password: passwordEncrypted,
            name: dto.name,
            username: dto.username,
            role: dto.role,
        });


        //remove password from response
        delete updatedUser.password;
        return updatedUser;
    }

    async deleteUser(id: string): Promise<User> {
        const user = await User.findOne({ where: { id } });
        if (!user) {
            throw new Error('User not found');
        }
        await user.destroy();
        return user;
    }
}