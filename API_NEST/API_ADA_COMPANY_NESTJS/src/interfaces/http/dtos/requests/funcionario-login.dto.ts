import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FuncionarioLoginDto {
  @ApiProperty({
    description: 'Email do funcionário',
    example: 'funcionario@adacompany.com'
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Senha do funcionário',
    example: 'senha123'
  })
  @IsString()
  @IsNotEmpty()
  senha: string;
} 