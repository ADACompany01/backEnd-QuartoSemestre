# ADA Company - Backend

Este repositório contém o backend do projeto ADA Company, desenvolvido em NestJS.

## Sumário
- [Sobre o Projeto](#sobre-o-projeto)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Como Rodar Localmente](#como-rodar-localmente)
- [Docker](#docker)
- [Integração com o Banco de Dados](#integração-com-o-banco-de-dados)
- [Integração com o Frontend](#integração-com-o-frontend)
- [Endpoints Principais](#endpoints-principais)
- [Links Úteis](#links-úteis)

---

## Sobre o Projeto

API responsável por gerenciar as regras de negócio, autenticação, persistência e exposição de dados do sistema ADA Company.

---

## Tecnologias Utilizadas
- Node.js
- NestJS
- TypeScript
- Sequelize (ORM)
- PostgreSQL (banco de dados)

---

## Como Rodar Localmente

1. **Clone o repositório:**
   ```sh
   git clone https://github.com/ADACompany01/backEnd-QuartoSemestre.git
   cd backEnd-QuartoSemestre/API_NEST/API_ADA_COMPANY_NESTJS
   ```
2. **Instale as dependências:**
   ```sh
   npm install
   ```
3. **Configure as variáveis de ambiente:**
   - Crie um arquivo `.env` com as configurações necessárias, por exemplo:
     ```env
     DATABASE_URL=postgresql://adacompanysteam:2N1lrqwIaBxO4eCZU7w0mjGCBXX7QVee@localhost:5432/adacompanybd
     JWT_SECRET=ada_company_secret_key_2025
     ```
4. **Execute as migrations/seeds se necessário.**
5. **Inicie a aplicação:**
   ```sh
   npm run start:dev
   ```
6. Acesse em: [http://localhost:3000](http://localhost:3000)

---

## Docker

Para rodar o backend em um container Docker:

1. **Build da imagem:**
   ```sh
   docker build -t ada-company-backend .
   ```
2. **Execute o container:**
   ```sh
   docker run -d -p 3000:3000 \
     -e DATABASE_URL=postgresql://adacompanysteam:2N1lrqwIaBxO4eCZU7w0mjGCBXX7QVee@host.docker.internal:5432/adacompanybd \
     -e JWT_SECRET=ada_company_secret_key_2025 \
     --name ada-backend ada-company-backend
   ```
   > Ajuste a variável `DATABASE_URL` conforme o endereço do banco de dados.

---

## Integração com o Banco de Dados

- O backend utiliza PostgreSQL.
- Certifique-se de que o banco esteja rodando e acessível pela URL configurada.
- Parâmetros padrão:
  - **Usuário:** `adacompanysteam`
  - **Senha:** `2N1lrqwIaBxO4eCZU7w0mjGCBXX7QVee`
  - **Banco:** `adacompanybd`
  - **Host:** `localhost` ou `database` (em ambiente Docker Compose)
  - **Porta:** `5432`

---

## Integração com o Frontend

- O frontend consome a API exposta pelo backend em: `http://localhost:3000` (ou conforme configurado).
- Certifique-se de que o backend esteja rodando antes de acessar o frontend.

---

## Endpoints Principais

- `GET /health` — Health check da API
- `POST /auth/login` — Autenticação de usuário
- `GET /users` — Listagem de usuários
- <!-- Adicione outros endpoints relevantes aqui -->

---

## Links Úteis
- **Repositório do Frontend:** [ADACompany01/frontEnd-QuartoSemestre](https://github.com/ADACompany01/frontEnd-QuartoSemestre.git)
- **Documentação Geral:** Consulte o README na raiz do backend para detalhes completos do projeto.

---

## 🛡️ Requisitos Não Funcionais

- **Performance:** O sistema deve responder às requisições do usuário de forma rápida e eficiente.
- **Segurança:**
  - As senhas dos usuários devem ser armazenadas de forma criptografada.
  - O acesso à API deve ser protegido por autenticação JWT.
- **Escalabilidade:** O sistema deve ser capaz de ser executado em containers Docker, facilitando a escalabilidade horizontal.
- **Usabilidade:** A interface do frontend deve ser responsiva e acessível em dispositivos móveis e desktops.
- **Disponibilidade:** O sistema deve estar disponível 99% do tempo, exceto em períodos programados de manutenção.
- **Documentação:** O projeto deve conter documentação clara para instalação, execução e uso das APIs.
- **Backup:** O banco de dados deve permitir backup e restauração dos dados (pode ser feito via Docker volume).
- **Compatibilidade:** O sistema deve ser compatível com os principais navegadores modernos (Chrome, Firefox, Edge).

---

## Contato
Dúvidas ou sugestões? Abra uma issue ou entre em contato com os integrantes do projeto.
