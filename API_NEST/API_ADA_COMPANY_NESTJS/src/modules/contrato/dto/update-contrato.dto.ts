import { IsOptional, IsNumber, IsDateString, IsEnum, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { StatusContrato } from './create-contrato.dto';

export class UpdateContratoDto {
  @ApiProperty({
    description: 'ID do cliente',
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: false
  })
  @IsUUID('4', { message: 'O ID do cliente deve ser um UUID válido.' })
  @IsOptional()
  id_cliente?: string;

  @ApiProperty({
    description: 'Valor do contrato',
    example: 1500.00,
    required: false
  })
  @IsNumber({}, { message: 'O valor do contrato deve ser um número.' })
  @IsOptional()
  valor_contrato?: number;

  @ApiProperty({
    description: 'Código do orçamento',
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: false
  })
  @IsUUID('4', { message: 'O código do orçamento deve ser um UUID válido.' })
  @IsOptional()
  cod_orcamento?: string;

  @ApiProperty({
    description: 'Status do contrato',
    example: 'ATIVO',
    enum: StatusContrato,
    required: false
  })
  @IsEnum(StatusContrato, { message: 'O status do contrato deve ser ATIVO, CONCLUIDO ou CANCELADO.' })
  @IsOptional()
  status_contrato?: StatusContrato;

  @ApiProperty({
    description: 'Data de início do contrato',
    example: '2024-03-20',
    required: false
  })
  @IsDateString({}, { message: 'A data de início deve ser uma data válida no formato YYYY-MM-DD.' })
  @IsOptional()
  data_inicio?: string;

  @ApiProperty({
    description: 'Data de entrega do contrato',
    example: '2024-04-20',
    required: false
  })
  @IsDateString({}, { message: 'A data de entrega deve ser uma data válida no formato YYYY-MM-DD.' })
  @IsOptional()
  data_entrega?: string;
} 