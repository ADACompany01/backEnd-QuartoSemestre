import { IsOptional, IsNumber, IsEnum, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TipoPacote } from './create-pacote.dto';

export class UpdatePacoteDto {
  @ApiProperty({
    description: 'ID do cliente',
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: false
  })
  @IsUUID('4', { message: 'O ID do cliente deve ser um UUID válido.' })
  @IsOptional()
  id_cliente?: string;

  @ApiProperty({
    description: 'Tipo do pacote de acessibilidade',
    enum: TipoPacote,
    example: TipoPacote.AA,
    required: false
  })
  @IsEnum(TipoPacote)
  @IsOptional()
  tipo_pacote?: TipoPacote;

  @ApiProperty({
    description: 'Valor base do pacote',
    example: 1500.00,
    required: false
  })
  @IsNumber()
  @IsOptional()
  valor_base?: number;
} 