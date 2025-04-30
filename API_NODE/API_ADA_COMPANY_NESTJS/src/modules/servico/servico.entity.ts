import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { Funcionario } from '../funcionario/funcionario.entity';
import { Orcamento } from '../orcamento/orcamento.entity';

@Entity()
export class Servico {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nome: string;

  @Column()
  descricao: string;

  @Column('decimal', { precision: 10, scale: 2 })
  valor: number;

  @Column({ default: true })
  ativo: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  dataCriacao: Date;

  @ManyToOne(() => Funcionario, funcionario => funcionario.servicos)
  funcionario: Funcionario;

  @OneToMany(() => Orcamento, orcamento => orcamento.servico)
  orcamentos: Orcamento[];
}