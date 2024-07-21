import { IsString, IsInt, IsNotEmpty, MinLength } from 'class-validator';

export class CreateBookDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(1)
    title: string;

    @IsString()
    @IsNotEmpty()
    gender: string;

    @IsInt()
    @IsNotEmpty()
    authorId: number;
}