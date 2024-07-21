import { Author } from "../../authors/models/author.model";
import { AuthorService } from "../../authors/services/author.service";
import { UserService } from "../../users/services/user.service";
import { LoginUserDto } from "../dto/login-user.dto";
import { RegisterUserDto } from "../dto/register-user.dto";
import { ErrorMessages } from "../enum/error-messages.enum";
import { RoleUser } from "../enum/role-user.enum";
import { generateToken } from "../jwt/jwt.handle";
import { encrypt, verify } from "../utils/bcrypt.handle";

export class AuthService {
    private userService: UserService;
    private authorService: AuthorService;

    constructor() {
        this.userService = new UserService(); 
        this.authorService = new AuthorService();
    }

    async register(dto: RegisterUserDto) {
        const findUser = await this.userService.findUserByEmail(dto.email);

        if (findUser) throw new Error(ErrorMessages.USER_ALREADY_EXISTS);

        const passwordEncrypted = await encrypt(dto.password);

        if (dto.role === RoleUser.AUTHOR) {
            const user = await this.userService.createUser({
                email: dto.email,
                password: passwordEncrypted,
                role: dto.role,
                ...dto,
            });


            await Author.create({
                name: dto.name,
                userId: user.id,
            });

            return user;
        } 
        return await this.userService.createUser({
            ...dto,
            email: dto.email,
            password: passwordEncrypted,
            role: dto.role,
        });
    }

    async login(dto: LoginUserDto) {
        const user = await this.userService.findUserByEmail(dto.email);
        
        if (!user) throw new Error(ErrorMessages.USER_NOT_FOUND);

        const passwordMatch = await verify(dto.password, user.password);

        if (!passwordMatch) throw new Error(ErrorMessages.INVALID_PASSWORD);

        const token = generateToken(user.id);

        const data = { user,token }

        return data;
    }
}