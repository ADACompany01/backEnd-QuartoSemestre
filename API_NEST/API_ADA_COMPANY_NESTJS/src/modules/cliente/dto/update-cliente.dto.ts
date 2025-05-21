import { IsEmail, IsOptional, IsString, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateClienteDto {
  @ApiProperty({
    description: 'Nome do cliente',
    example: 'João Silva',
    required: false
  })
  @IsString()
  @IsOptional()
  nome?: string;

  @ApiProperty({
    description: 'Email do cliente',
    example: 'joao.silva@email.com',
    required: false
  })
  @IsEmail()
  @IsOptional()
  email?: string;

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
    example: 'novaSenha123',
    required: false
  })
  @IsString()
  @IsOptional()
  senha?: string;

  @ApiProperty({
    description: 'Status do cliente (ativo/inativo)',
    example: true,
    required: false
  })
  @IsBoolean()
  @IsOptional()
  ativo?: boolean;
} 