import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class FuncionarioLoginDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  senha: string;
} 