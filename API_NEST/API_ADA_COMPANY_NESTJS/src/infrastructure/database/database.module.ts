import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Usuario } from './entities/usuario.entity';
import { Cliente } from './entities/cliente.entity';
import { Funcionario } from './entities/funcionario.entity';
import { Orcamento } from './entities/orcamento.entity';
import { Contrato } from './entities/contrato.entity';
import { Pacote } from './entities/pacote.entity';
import { UsuarioRepository } from './repositories/usuario.repository';

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        
        // --- LEITURA DAS VARIÁVEIS DE AMBIENTE (NOMES CORRIGIDOS) ---
        const dbHost = configService.get<string>('DB_HOST');
        const dbPort = configService.get<number>('DB_PORT', 5432); // 5432 é um padrão OK
        const dbUser = configService.get<string>('DB_USER');       // Corrigido de DB_USERNAME
        const dbPassword = configService.get<string>('DB_PASSWORD');
        const dbName = configService.get<string>('DB_NAME');       // Corrigido de DB_DATABASE

        // Verificação para garantir que as variáveis existem
        if (!dbHost || !dbUser || !dbPassword || !dbName) {
          throw new Error('Variáveis de ambiente do banco de dados (DB_HOST, DB_USER, DB_PASSWORD, DB_NAME) não estão configuradas.');
        }

        return {
          dialect: 'postgres',
          host: dbHost,
          port: dbPort,
          username: dbUser,
          password: dbPassword,
          database: dbName,
          autoLoadModels: true,
          synchronize: true, // (Nota: 'true' não é ideal para produção real)
          models: [Usuario, Cliente, Funcionario, Orcamento, Contrato, Pacote],
        };
      },
    }),
    SequelizeModule.forFeature([Usuario, Cliente, Funcionario, Orcamento, Contrato, Pacote]),
  ],
  providers: [
    UsuarioRepository,
  ],
  exports: [
    UsuarioRepository,
    SequelizeModule.forFeature([Usuario, Cliente, Funcionario, Orcamento, Contrato, Pacote])
  ]
})
export class DatabaseModule {}
