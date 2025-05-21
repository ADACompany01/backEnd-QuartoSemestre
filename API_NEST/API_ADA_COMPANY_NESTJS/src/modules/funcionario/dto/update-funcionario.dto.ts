import { IsEmail, IsOptional, IsString, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateFuncionarioDto {
  @ApiProperty({
    description: 'Nome do funcionário',
    example: 'Maria Silva',
    required: false
  })
  @IsString()
  @IsOptional()
  nome?: string;

  @ApiProperty({
    description: 'Email do funcionário',
    example: 'maria.silva@adacompany.com',
    required: false
  })
  @IsEmail()
  @IsOptional()
  email?: string;

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
    example: 'Desenvolvedor Senior',
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
    example: 'novaSenha123',
    required: false
  })
  @IsString()
  @IsOptional()
  senha?: string;

  @ApiProperty({
    description: 'Status do funcionário (ativo/inativo)',
    example: true,
    required: false
  })
  @IsBoolean()
  @IsOptional()
  ativo?: boolean;
} 