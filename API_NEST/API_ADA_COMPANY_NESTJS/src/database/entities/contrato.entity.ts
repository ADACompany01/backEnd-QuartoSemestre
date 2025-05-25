import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Cliente } from './cliente.entity';
import { Orcamento } from './orcamento.entity';

@Table({ tableName: 'contratos' })
export class Contrato extends Model<Contrato> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    field: 'id_contrato',
  })
  id_contrato: number;

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
    type: DataType.DECIMAL(10,2),
    allowNull: false,
    field: 'valor_contrato',
  })
  valor_contrato: number;

  @ForeignKey(() => Orcamento)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: 'cod_orcamento',
  })
  cod_orcamento: number;

  @BelongsTo(() => Orcamento)
  orcamento: Orcamento;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'status_contrato',
  })
  status_contrato: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    field: 'data_inicio',
  })
  data_inicio: Date;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    field: 'data_entrega',
  })
  data_entrega: Date;
} 