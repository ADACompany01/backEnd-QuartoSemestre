import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class ClienteLoginDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  senha: string;
} 