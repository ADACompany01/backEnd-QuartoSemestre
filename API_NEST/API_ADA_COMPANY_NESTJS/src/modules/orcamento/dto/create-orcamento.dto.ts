import { IsNotEmpty, IsNumber, IsDateString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrcamentoDto {
  @ApiProperty({
    description: 'Valor do orçamento',
    example: 1500.00
  })
  @IsNumber({}, { message: 'O valor do orçamento deve ser um número.' })
  @IsNotEmpty({ message: 'O valor do orçamento é obrigatório.' })
  valor_orcamento: number;

  @ApiProperty({
    description: 'Data do orçamento',
    example: '2024-03-20'
  })
  @IsDateString({}, { message: 'A data do orçamento deve ser uma data válida.' })
  @IsNotEmpty({ message: 'A data do orçamento é obrigatória.' })
  data_orcamento: Date;

  @ApiProperty({
    description: 'Data de validade do orçamento',
    example: '2024-04-20'
  })
  @IsDateString({}, { message: 'A data de validade deve ser uma data válida.' })
  @IsNotEmpty({ message: 'A data de validade é obrigatória.' })
  data_validade: Date;

  @ApiProperty({
    description: 'ID do pacote',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @IsUUID('4', { message: 'O ID do pacote deve ser um UUID válido.' })
  @IsNotEmpty({ message: 'O ID do pacote é obrigatório.' })
  id_pacote: string;

  @ApiProperty({
    description: 'ID do cliente',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @IsUUID('4', { message: 'O ID do cliente deve ser um UUID válido.' })
  @IsNotEmpty({ message: 'O ID do cliente é obrigatório.' })
  id_cliente: string;
} 