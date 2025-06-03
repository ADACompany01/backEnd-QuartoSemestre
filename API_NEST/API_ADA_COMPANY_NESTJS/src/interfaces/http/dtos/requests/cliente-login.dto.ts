import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ClienteLoginDto {
  @ApiProperty({
    description: 'Email do cliente',
    example: 'cliente@email.com',
    required: true
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Senha do cliente',
    example: 'senha123',
    required: true,
    minLength: 6
  })
  @IsString()
  @IsNotEmpty()
  senha: string;
} 