import { Table, Column, Model, PrimaryKey, DataType, HasMany } from 'sequelize-typescript';
import { Orcamento } from './orcamento.model'; // Ajuste o caminho se necessário

@Table({
  tableName: 'clientes',
  timestamps: false,
})
export class Cliente extends Model {
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
    type: DataType.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  })
  email: string;

  @Column({
    type: DataType.STRING,
  })
  telefone: string;

  @Column({
    type: DataType.STRING,
  })
  cpf: string;

  @Column({
    type: DataType.STRING,
  })
  endereco: string;

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

  @HasMany(() => Orcamento)
  orcamentos: Orcamento[];
}
