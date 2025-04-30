import { Table, Column, Model, PrimaryKey, DataType, ForeignKey, HasMany, BelongsTo } from 'sequelize-typescript';
import { Funcionario } from './funcionario.model'; // Ajuste o caminho se necessário
import { Orcamento } from './orcamento.model'; // Ajuste o caminho se necessário

@Table({
  tableName: 'servicos',
  timestamps: false,
})
export class Servico extends Model {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  nome: string;

  @Column({
    type: DataType.TEXT,
  })
  descricao: string;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  valor: number;

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

  @ForeignKey(() => Funcionario)
  @Column({
    type: DataType.UUID,
  })
  funcionarioId: string;

  @BelongsTo(() => Funcionario)
  funcionario: Funcionario;

  @HasMany(() => Orcamento)
  orcamentos: Orcamento[];
}
