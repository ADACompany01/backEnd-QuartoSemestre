import { IsNotEmpty, IsNumber, IsString, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum TipoPacote {
  A = 'A',
  AA = 'AA',
  AAA = 'AAA'
}

export class CreatePacoteDto {
  @ApiProperty({
    description: 'ID do cliente',
    example: 1
  })
  @IsNumber({}, { message: 'O ID do cliente deve ser um número.' })
  @IsNotEmpty({ message: 'O ID do cliente é obrigatório.' })
  id_cliente: number;

  @ApiProperty({
    description: 'Tipo do pacote (A, AA ou AAA)',
    example: 'AA',
    enum: TipoPacote
  })
  @IsEnum(TipoPacote, { message: 'O tipo do pacote deve ser A, AA ou AAA.' })
  @IsNotEmpty({ message: 'O tipo do pacote é obrigatório.' })
  tipo_pacote: TipoPacote;

  @ApiProperty({
    description: 'Valor base do pacote',
    example: 1000.00
  })
  @IsNumber({}, { message: 'O valor base deve ser um número.' })
  @IsNotEmpty({ message: 'O valor base é obrigatório.' })
  valor_base: number;
} 