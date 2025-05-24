import { IsEmail, IsNotEmpty, IsOptional, IsString, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateClienteDto {
  @ApiProperty({
    description: 'Nome do cliente',
    example: 'João Silva'
  })
  @IsString()
  @IsNotEmpty()
  nome: string;

  @ApiProperty({
    description: 'Email do cliente',
    example: 'joao.silva@email.com'
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Telefone do cliente',
    example: '(11) 98765-4321',
    required: false
  })
  @IsString()
  @IsOptional()
  telefone?: string;

  @ApiProperty({
    description: 'CPF do cliente',
    example: '123.456.789-00',
    required: false
  })
  @IsString()
  @IsOptional()
  cpf?: string;

  @ApiProperty({
    description: 'Endereço do cliente',
    example: 'Rua das Flores, 123',
    required: false
  })
  @IsString()
  @IsOptional()
  endereco?: string;

  @ApiProperty({
    description: 'Senha do cliente',
    example: 'senha123'
  })
  @IsString()
  @IsNotEmpty()
  senha: string;

  @ApiProperty({
    description: 'Status do cliente (ativo/inativo)',
    example: true,
    default: true,
    required: false
  })
  @IsBoolean()
  @IsOptional()
  ativo?: boolean;
} 