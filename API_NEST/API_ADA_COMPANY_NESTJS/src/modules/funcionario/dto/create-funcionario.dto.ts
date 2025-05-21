import { IsEmail, IsNotEmpty, IsOptional, IsString, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFuncionarioDto {
  @ApiProperty({
    description: 'Nome do funcionário',
    example: 'Maria Silva'
  })
  @IsString()
  @IsNotEmpty()
  nome: string;

  @ApiProperty({
    description: 'Email do funcionário',
    example: 'maria.silva@adacompany.com'
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Telefone do funcionário',
    example: '(11) 98765-4321',
    required: false
  })
  @IsString()
  @IsOptional()
  telefone?: string;

  @ApiProperty({
    description: 'CPF do funcionário',
    example: '123.456.789-00',
    required: false
  })
  @IsString()
  @IsOptional()
  cpf?: string;

  @ApiProperty({
    description: 'Cargo do funcionário',
    example: 'Desenvolvedor',
    required: false
  })
  @IsString()
  @IsOptional()
  cargo?: string;

  @ApiProperty({
    description: 'Especialidade do funcionário',
    example: 'Backend',
    required: false
  })
  @IsString()
  @IsOptional()
  especialidade?: string;

  @ApiProperty({
    description: 'Senha do funcionário',
    example: 'senha123'
  })
  @IsString()
  @IsNotEmpty()
  senha: string;

  @ApiProperty({
    description: 'Status do funcionário (ativo/inativo)',
    example: true,
    default: true,
    required: false
  })
  @IsBoolean()
  @IsOptional()
  ativo?: boolean;
} 