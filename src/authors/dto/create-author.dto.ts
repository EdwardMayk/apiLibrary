import { IsNotEmpty, IsOptional, IsString, IsEmail, MinLength, IsNumber } from 'class-validator';

export class CreateAuthorDto {
    @IsOptional()
    @IsString() 
    name: string;

    @IsOptional()
    @IsString() 
    lastname?: string;
    
    @IsOptional()
    @IsString() 
    specialization?: string;

    @IsNotEmpty()
    @IsNumber()
    userId: number;
}