<p align="center">
  <img src="assets/hero/AdaHome.png" alt="ADA Company Banner" width="600"/>
</p>

# ADA Company - Projeto Final

<p align="center">
  <a href="https://newadacompany-3drnxk22f-ada-companys-projects.vercel.app/"><img src="https://img.shields.io/badge/Frontend-Online-green" /></a>
  <a href="https://backend-adacompany.onrender.com/"><img src="https://img.shields.io/badge/Backend-Online-blue" /></a>
</p>

---

## 🗂️ Sumário

1. [Sobre o Projeto](#sobre-o-projeto)
2. [Demonstração Visual](#demonstração-visual)
3. [Requisitos Funcionais](#requisitos-funcionais)
4. [Tecnologias Utilizadas](#tecnologias-utilizadas)
5. [Organização dos Repositórios](#organização-dos-repositórios)
6. [Como Executar](#como-executar)
7. [Documentação Docker](#documentação-docker)
8. [Estrutura do Banco de Dados](#estrutura-do-banco-de-dados)
9. [Documentação da API](#documentação-da-api)
10. [Exemplos de Integração](#exemplos-de-integração)
11. [Links das Aplicações Publicadas](#links-das-aplicações-publicadas)
12. [Integrantes](#integrantes)
13. [Licença](#licença)
14. [Referências e Suporte](#referências-e-suporte)

---

## ✨ Sobre o Projeto

Sistema completo para gestão de serviços, clientes e funcionários, com interface web moderna e API robusta. O sistema foi desenvolvido como projeto final do quarto semestre, utilizando arquitetura em camadas, containers Docker e API RESTful documentada.

---

## 🖼️ Demonstração Visual

<p align="center">
  <img src="assets/hero/heroImage.png" alt="Tela Inicial" width="400"/>
  <img src="assets/about/aboutImage.png" alt="Sobre o Projeto" width="400"/>
</p>

<p align="center">
  <img src="assets/cards/site-idosos.jpg" alt="Card Idosos" width="250"/>
  <img src="assets/cards/site-infantil.jpg" alt="Card Infantil" width="250"/>
  <img src="assets/cards/site-acessibilidade.jpg" alt="Card Acessibilidade" width="250"/>
</p>

---

## ✅ Requisitos Funcionais

- **Cadastro de Usuários:** O sistema deve permitir o cadastro de diferentes tipos de usuários (clientes, funcionários).
- **Autenticação e Autorização:** O sistema deve permitir login seguro e garantir que apenas usuários autenticados acessem funcionalidades restritas.
- **Gestão de Serviços:** O sistema deve permitir o cadastro, edição, exclusão e listagem de serviços oferecidos pela empresa.
- **Gestão de Clientes:** O sistema deve permitir o cadastro, edição, exclusão e listagem de clientes.
- **Gestão de Funcionários:** O sistema deve permitir o cadastro, edição, exclusão e listagem de funcionários.
- **Orçamento:** O sistema deve permitir que clientes solicitem orçamentos e acompanhem o status.
- **Dashboard:** O sistema deve apresentar um painel com informações resumidas (quantidade de clientes, serviços, orçamentos, etc).
- **Integração Frontend/Backend:** O frontend deve consumir a API do backend para todas as operações de CRUD.
- **Notificações:** O cliente deve acompanhar o status de pedidos através da pagina de acesso no frontend.
- **Avaliação de url via API:** O cliente deve conseguir avaliar o nível de acessibilidade do seu site informando a url dele.

---

## 🚀 Tecnologias Utilizadas

- **Frontend:** React + Vite, CSS Modules, Nginx
- **Backend:** NestJS, TypeScript, Sequelize, JWT, Swagger
- **Banco de Dados:** PostgreSQL
- **Infraestrutura:** Docker, Docker Compose
- **Ferramentas:** Git, GitHub, Vercel, Render

---

## 🗃️ Organização dos Repositórios

- [Repositório Backend](https://github.com/ADACompany01/backEnd-QuartoSemestre)
- [Repositório Frontend](https://github.com/ADACompany01/frontEnd-QuartoSemestre)

Estrutura de pastas principal:

```
Projetos/
├── backEnd-QuartoSemestre/
│   └── API_NEST/
│       └── API_ADA_COMPANY_NESTJS/
│           ├── docker-compose.yml
│           ├── dockerfile
│           └── src/
└── frontEnd-QuartoSemestre/
    ├── dockerfile
    ├── nginx.conf
    └── src/
```

---

## 📦 Como Executar

1. **Clone os repositórios:**
   ```sh
   git clone https://github.com/ADACompany01/backEnd-QuartoSemestre.git
   git clone https://github.com/ADACompany01/frontEnd-QuartoSemestre.git
   ```
2. **Navegue até a pasta do docker-compose:**
   ```sh
   cd backEnd-QuartoSemestre/API_NEST/API_ADA_COMPANY_NESTJS
   ```
3. **Suba os containers:**
   ```sh
   docker-compose up -d --build
   ```
4. **Acesse:**
   - Frontend: [http://localhost](http://localhost)
   - Backend: [http://localhost:3000](http://localhost:3000)

---

## 🐳 Documentação Docker

### Docker Compose

O arquivo `docker-compose.yml` configura três serviços principais:

```yaml
services:
  database:
    build: ../../database/postgres
    container_name: ada-postgres-db
    ports:
      - "5432:5432"
    environment:
      POSTGRES_USER: adacompanysteam
      POSTGRES_PASSWORD: 2N1lrqwIaBxO4eCZU7w0mjGCBXX7QVee
      POSTGRES_DB: adacompanybd
    volumes:
      - db_data:/var/lib/postgresql/data
      - ./database/postgres/init.sql:/docker-entrypoint-initdb.d/init.sql

  backend:
    build:
      context: .
      dockerfile: dockerfile
    ports:
      - "3000:3000"
    environment:
      DATABASE_URL: postgresql://adacompanysteam:2N1lrqwIaBxO4eCZU7w0mjGCBXX7QVee@database:5432/adacompanybd
      JWT_SECRET: "ada_company_secret_key_2025"
    depends_on:
      database:
        condition: service_healthy

  frontend:
    build:
      context: ../../frontEnd-QuartoSemestre
      dockerfile: dockerfile
    container_name: ada-frontend-app
    ports:
      - "80:80"
    environment:
      REACT_APP_BACKEND_URL: "http://backend:3000"
    depends_on:
      backend:
        condition: service_healthy
```

### Dockerfile Backend

```dockerfile
# Etapa 1: build
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
COPY tsconfig*.json ./
COPY . .
RUN npm install
RUN npm run build
# Etapa 2: imagem final
FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist/src ./dist
COPY --from=builder /app/node_modules ./node_modules
EXPOSE 3000
CMD ["node", "dist/main.js"]
```