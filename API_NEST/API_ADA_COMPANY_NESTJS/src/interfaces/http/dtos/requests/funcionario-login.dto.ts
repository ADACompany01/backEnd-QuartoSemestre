import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FuncionarioLoginDto {
  @ApiProperty({
    description: 'Email do funcionário',
    example: 'pedro.silva@adacompany.com',
    required: true
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Senha do funcionário',
    example: 'senha123',
    required: true,
    minLength: 6
  })
  @IsString()
  @IsNotEmpty()
  senha: string;
} 