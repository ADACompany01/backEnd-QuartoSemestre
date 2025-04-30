import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Orcamento } from '../orcamento/orcamento.entity';

@Entity()
export class Cliente {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nome: string;

  @Column()
  email: string;

  @Column()
  telefone: string;

  @Column()
  cpf: string;

  @Column()
  endereco: string;

  @Column({ default: true })
  ativo: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  dataCriacao: Date;

  @OneToMany(() => Orcamento, orcamento => orcamento.cliente)
  orcamentos: Orcamento[];
}