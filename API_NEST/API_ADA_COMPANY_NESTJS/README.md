# API de Gerenciamento da ADA Company

Esta é a API backend para o sistema de gerenciamento de serviços da ADA Company, desenvolvida com o framework NestJS.

## Sumário

- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Pré-requisitos](#pré-requisitos)
- [Como Começar](#como-começar)
  - [1. Clone o Repositório](#1-clone-o-repositório)
  - [2. Configure as Variáveis de Ambiente](#2-configure-as-variáveis-de-ambiente)
  - [3. Execute a Aplicação com Docker](#3-execute-a-aplicação-com-docker)
- [Banco de Dados](#banco-de-dados)
  - [Executando Migrations](#executando-migrations)
  - [Populando o Banco (Seeding)](#populando-o-banco-seeding)
- [Documentação da API](#documentação-da-api)
- [Scripts Disponíveis](#scripts-disponíveis)

## Tecnologias Utilizadas

Este projeto foi construído utilizando as seguintes tecnologias:

-   **Backend**: [NestJS](https://nestjs.com/), [TypeScript](https://www.typescriptlang.org/)
-   **Banco de Dados**: [PostgreSQL](https://www.postgresql.org/)
-   **ORM**: [Sequelize](https://sequelize.org/)
-   **Autenticação**: [JWT](https://jwt.io/) (JSON Web Tokens) & [Passport](http://www.passportjs.org/)
-   **Documentação da API**: [Swagger](https://swagger.io/)
-   **Containerização**: [Docker](https://www.docker.com/) e [Docker Compose](https://docs.docker.com/compose/)

## Pré-requisitos

Antes de começar, você precisará ter as seguintes ferramentas instaladas em sua máquina:
*   [Git](https://git-scm.com)
*   [Node.js](https://nodejs.org/en/)
*   [Docker](https://www.docker.com/products/docker-desktop)

## Como Começar

Siga os passos abaixo para configurar e executar o ambiente de desenvolvimento.

### 1. Clone o Repositório

```bash
git clone <URL_DO_SEU_REPOSITORIO>
cd backEnd-QuartoSemestre
```

### 2. Configure as Variáveis de Ambiente

O `docker-compose` utiliza variáveis de ambiente para configurar os serviços. Você precisa criar um arquivo `.env` na raiz do projeto (`backEnd-QuartoSemestre/`).

Crie o arquivo `.env` e adicione o seguinte conteúdo, substituindo os valores conforme necessário:

```env
# Variáveis para o serviço do PostgreSQL no Docker
POSTGRES_USER=docker
POSTGRES_PASSWORD=docker
POSTGRES_DB=ada_company_db

# URL de conexão que a API NestJS usará para se conectar ao banco de dados
# Note que o host é 'database', o nome do serviço no docker-compose.yml
DATABASE_URL="postgresql://docker:docker@database:5432/ada_company_db"

# Porta em que a aplicação backend irá rodar
PORT=3000
```

**Importante**: O `docker-compose.yml` está configurado para ler estas variáveis e provisionar os containers corretamente.

### 3. Execute a Aplicação com Docker

Com o Docker em execução na sua máquina, utilize o `docker-compose` para construir as imagens e iniciar os containers da aplicação e do banco de dados.

Execute o seguinte comando na raiz do projeto:

```bash
docker-compose up --build -d
```
*   `--build`: Força a reconstrução das imagens caso haja alguma alteração no `Dockerfile`.
*   `-d`: Executa os containers em modo "detached" (em segundo plano).

Após a execução, você terá o container da API e do banco de dados rodando.

## Banco de Dados

Após iniciar os containers, o banco de dados estará de pé, mas vazio. É necessário executar as **migrations** para criar as tabelas e, opcionalmente, as **seeds** para popular o banco com dados iniciais.

Os comandos devem ser executados dentro do container da aplicação backend.

### Executando Migrations

Para criar toda a estrutura de tabelas no banco de dados, execute:

```bash
docker-compose exec backend npm run migration:run
```

### Populando o Banco (Seeding)

Para popular o banco de dados com dados de teste/iniciais, execute:

```bash
docker-compose exec backend npm run seed:run
```

## Documentação da API

Com a aplicação em execução, a documentação da API, gerada pelo Swagger, estará disponível no seu navegador.

Acesse: [http://localhost:3000/api](http://localhost:3000/api)

Lá você encontrará todos os endpoints disponíveis, seus parâmetros e poderá testá-los diretamente.

## Scripts Disponíveis

Além da execução via Docker, o `package.json` contém vários scripts úteis para desenvolvimento (caso queira rodar a aplicação localmente, sem Docker).

-   `npm run start:dev`: Inicia a aplicação em modo de desenvolvimento com watch mode.
-   `npm run build`: Compila o código TypeScript para JavaScript.
-   `npm run test`: Roda os testes unitários.
-   `npm run db:reset`: Reseta o banco de dados (limpa, executa migrations e seeds).

Para executar estes comandos, você precisaria de uma instância do banco de dados rodando e um arquivo `.env` configurado para a aplicação local.
