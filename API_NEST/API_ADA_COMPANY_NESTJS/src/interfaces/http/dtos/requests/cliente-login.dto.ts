import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ClienteLoginDto {
  @ApiProperty({
    description: 'Email do cliente',
    example: 'cliente@email.com'
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Senha do cliente',
    example: 'senha123'
  })
  @IsString()
  @IsNotEmpty()
  senha: string;
} 