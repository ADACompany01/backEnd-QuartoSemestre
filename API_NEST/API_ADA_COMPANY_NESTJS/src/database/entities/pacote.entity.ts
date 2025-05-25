import { Table, Column, Model, DataType, ForeignKey, BelongsTo, HasOne } from 'sequelize-typescript';
import { Cliente } from './cliente.entity';
import { Orcamento } from './orcamento.entity';
// import { Orcamento } from './orcamento.entity'; // Será criado depois

@Table({ tableName: 'pacotes' })
export class Pacote extends Model<Pacote> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    field: 'id_pacote',
  })
  id_pacote: number;

  @ForeignKey(() => Cliente)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: 'id_cliente',
  })
  id_cliente: number;

  @BelongsTo(() => Cliente)
  cliente: Cliente;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'tipo_pacote',
  })
  tipo_pacote: string;

  @Column({
    type: DataType.DECIMAL(10,2),
    allowNull: false,
    field: 'valor_base',
  })
  valor_base: number;

  @HasOne(() => Orcamento)
  orcamento: Orcamento;
} 