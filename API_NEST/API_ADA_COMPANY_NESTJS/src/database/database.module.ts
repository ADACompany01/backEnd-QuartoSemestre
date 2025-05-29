import { Module, OnModuleInit } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { InjectModel } from '@nestjs/sequelize';
import { Cliente } from './entities/cliente.entity';
import { Funcionario } from './entities/funcionario.entity';
import { Pacote } from './entities/pacote.entity';
import { Orcamento } from './entities/orcamento.entity';
import { Contrato } from './entities/contrato.entity';
import { Usuario } from './entities/usuario.entity';
import * as bcrypt from 'bcrypt';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'sqlite',
      storage: './database.sqlite',
      autoLoadModels: true,
      synchronize: true,
      logging: console.log,
      define: {
        timestamps: true,
        underscored: true,
      },
      models: [Usuario, Cliente, Funcionario, Pacote, Orcamento, Contrato],
    }),
    SequelizeModule.forFeature([
      Usuario,
      Cliente,
      Funcionario,
      Pacote,
      Orcamento,
      Contrato,
    ]),
  ],
  exports: [SequelizeModule],
})
export class DatabaseModule implements OnModuleInit {
  constructor(
    @InjectModel(Usuario)
    private usuarioModel: typeof Usuario,
    @InjectModel(Cliente)
    private clienteModel: typeof Cliente,
    @InjectModel(Funcionario)
    private funcionarioModel: typeof Funcionario,
    @InjectModel(Pacote)
    private pacoteModel: typeof Pacote,
    @InjectModel(Orcamento)
    private orcamentoModel: typeof Orcamento,
    @InjectModel(Contrato)
    private contratoModel: typeof Contrato,
  ) {}

  async onModuleInit() {
    try {
      // Verificar se já existem dados
      const usuarioCount = await this.usuarioModel.count();
      if (usuarioCount === 0) {
        // Criar usuários
        const hashedPassword = await bcrypt.hash('senha123', 10);
        const usuarios = await this.usuarioModel.bulkCreate([
          {
            nome_completo: 'João Silva',
            telefone: '(11) 99999-9999',
            email: 'joao.silva@email.com',
            senha: hashedPassword,
          },
          {
            nome_completo: 'Maria Santos',
            telefone: '(11) 98888-8888',
            email: 'maria.santos@email.com',
            senha: hashedPassword,
          },
          {
            nome_completo: 'Pedro Silva',
            telefone: '(11) 97777-7777',
            email: 'pedro.silva@adacompany.com',
            senha: hashedPassword,
          },
          {
            nome_completo: 'Ana Costa',
            telefone: '(11) 96666-6666',
            email: 'ana.costa@adacompany.com',
            senha: hashedPassword,
          },
          {
            nome_completo: 'Carlos Santos',
            telefone: '(11) 95555-5555',
            email: 'carlos.santos@adacompany.com',
            senha: hashedPassword,
          }
        ]);

        // Criar clientes
        await this.clienteModel.bulkCreate([
          {
            nome_completo: 'João Silva',
            cnpj: '12.345.678/0001-90',
            telefone: '(11) 99999-9999',
            email: 'joao.silva@email.com',
            id_usuario: usuarios[0].id_usuario,
          },
          {
            nome_completo: 'Maria Santos',
            cnpj: '98.765.432/0001-10',
            telefone: '(11) 98888-8888',
            email: 'maria.santos@email.com',
            id_usuario: usuarios[1].id_usuario,
          }
        ]);

        // Criar funcionários
        await this.funcionarioModel.bulkCreate([
          {
            nome_completo: 'Pedro Silva',
            email: 'pedro.silva@adacompany.com',
            telefone: '(11) 97777-7777',
            id_usuario: usuarios[2].id_usuario,
          },
          {
            nome_completo: 'Ana Costa',
            email: 'ana.costa@adacompany.com',
            telefone: '(11) 96666-6666',
            id_usuario: usuarios[3].id_usuario,
          },
          {
            nome_completo: 'Carlos Santos',
            email: 'carlos.santos@adacompany.com',
            telefone: '(11) 95555-5555',
            id_usuario: usuarios[4].id_usuario,
          }
        ]);

        console.log('Dados iniciais criados com sucesso!');
      }
    } catch (error) {
      console.error('Erro ao inicializar banco de dados:', error);
    }
  }
}