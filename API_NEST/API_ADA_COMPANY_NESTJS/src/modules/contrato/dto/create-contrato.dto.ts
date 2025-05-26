import { IsNotEmpty, IsNumber, IsDateString, IsString, IsEnum, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum StatusContrato {
  ATIVO = 'ATIVO',
  CONCLUIDO = 'CONCLUIDO',
  CANCELADO = 'CANCELADO'
}

export class CreateContratoDto {
  @ApiProperty({
    description: 'ID do cliente',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @IsUUID('4', { message: 'O ID do cliente deve ser um UUID válido.' })
  @IsNotEmpty({ message: 'O ID do cliente é obrigatório.' })
  id_cliente: string;

  @ApiProperty({
    description: 'Valor do contrato',
    example: 1500.00
  })
  @IsNumber({}, { message: 'O valor do contrato deve ser um número.' })
  @IsNotEmpty({ message: 'O valor do contrato é obrigatório.' })
  valor_contrato: number;

  @ApiProperty({
    description: 'Código do orçamento',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @IsUUID('4', { message: 'O código do orçamento deve ser um UUID válido.' })
  @IsNotEmpty({ message: 'O código do orçamento é obrigatório.' })
  cod_orcamento: string;

  @ApiProperty({
    description: 'Status do contrato',
    example: 'ATIVO',
    enum: StatusContrato
  })
  @IsEnum(StatusContrato, { message: 'O status do contrato deve ser ATIVO, CONCLUIDO ou CANCELADO.' })
  @IsNotEmpty({ message: 'O status do contrato é obrigatório.' })
  status_contrato: StatusContrato;

  @ApiProperty({
    description: 'Data de início do contrato',
    example: '2024-03-20'
  })
  @IsDateString({}, { message: 'A data de início deve ser uma data válida.' })
  @IsNotEmpty({ message: 'A data de início é obrigatória.' })
  data_inicio: Date;

  @ApiProperty({
    description: 'Data de entrega do contrato',
    example: '2024-04-20'
  })
  @IsDateString({}, { message: 'A data de entrega deve ser uma data válida.' })
  @IsNotEmpty({ message: 'A data de entrega é obrigatória.' })
  data_entrega: Date;
} 