import { IsNotEmpty, IsOptional, IsString, IsNumber, IsBoolean, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateServicoDto {
  @ApiProperty({
    description: 'Nome do serviço',
    example: 'Desenvolvimento de API'
  })
  @IsString()
  @IsNotEmpty()
  nome: string;

  @ApiProperty({
    description: 'Descrição do serviço',
    example: 'Desenvolvimento de API RESTful com NestJS e Swagger',
    required: false
  })
  @IsString()
  @IsOptional()
  descricao?: string;

  @ApiProperty({
    description: 'Valor do serviço',
    example: 2500.00
  })
  @IsNumber()
  @IsNotEmpty()
  valor: number;

  @ApiProperty({
    description: 'Status do serviço (ativo/inativo)',
    example: true,
    default: true,
    required: false
  })
  @IsBoolean()
  @IsOptional()
  ativo?: boolean;

  @ApiProperty({
    description: 'ID do funcionário responsável pelo serviço',
    example: '550e8400-e29b-41d4-a716-446655440000'
  })
  @IsUUID()
  @IsNotEmpty()
  funcionarioId: string;
} 