import { Table, Column, Model, PrimaryKey, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Cliente } from './cliente.model'; // Ajuste o caminho se necessário
import { Servico } from './servico.model'; // Ajuste o caminho se necessário

@Table({
  tableName: 'orcamentos',
  timestamps: false,
})
export class Orcamento extends Model {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  dataServico: Date;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  valorTotal: number;

  @Column({
    type: DataType.STRING,
    defaultValue: 'pendente',
    validate: {
      isIn: [['pendente', 'aprovado', 'recusado', 'cancelado', 'finalizado']]
    }
  })
  status: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  observacoes: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  ativo: boolean;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  dataCriacao: Date;

  @ForeignKey(() => Cliente)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  clienteId: string;

  @BelongsTo(() => Cliente)
  cliente: Cliente;

  @ForeignKey(() => Servico)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  servicoId: string;

  @BelongsTo(() => Servico)
  servico: Servico;
}
