# ADA Company - Projeto Final

## Sumário

- [Organização do Projeto](#organização-do-projeto)
- [Integrantes](#integrantes)
- [Repositórios](#repositórios)
- [Estrutura dos Diretórios](#estrutura-dos-diretórios)
- [Docker e Orquestração](#docker-e-orquestração)
- [Banco de Dados](#banco-de-dados)
- [Comandos para Execução](#comandos-para-execução)
- [Exemplos de Integração](#exemplos-de-integração)
- [URLs das Aplicações Publicadas](#urls-das-aplicações-publicadas)

---

## Organização do Projeto

O projeto é composto por dois repositórios principais:

- **Backend + Banco de Dados:**  
  [ADACompany01/backEnd-QuartoSemestre](https://github.com/ADACompany01/backEnd-QuartoSemestre.git)
- **Frontend:**  
  [ADACompany01/frontEnd-QuartoSemestre](https://github.com/ADACompany01/frontEnd-QuartoSemestre.git)

---

## Integrantes

- Nome 1 - RA/ID <!-- AJUSTE AQUI -->
- Nome 2 - RA/ID <!-- AJUSTE AQUI -->
- Nome 3 - RA/ID <!-- AJUSTE AQUI -->
- Nome 4 - RA/ID <!-- AJUSTE AQUI -->

---

## Estrutura dos Diretórios

```
backEnd-QuartoSemestre/
│
├── API_NEST/
│   └── API_ADA_COMPANY_NESTJS/
│       ├── docker-compose.yml
│       ├── dockerfile
│       └── ...
├── database/
│   └── postgres/
│       ├── Dockerfile
│       ├── init.sql
│       └── ...
└── ...
frontEnd-QuartoSemestre/
    ├── dockerfile
    └── ...
```

---

## Docker e Orquestração

### Docker Compose

O arquivo `docker-compose.yml` orquestra três serviços:
- **database:** PostgreSQL
- **backend:** API NestJS
- **frontend:** React

Localização:  
`backEnd-QuartoSemestre/API_NEST/API_ADA_COMPANY_NESTJS/docker-compose.yml`

### Dockerfiles

- **Backend:** `backEnd-QuartoSemestre/API_NEST/API_ADA_COMPANY_NESTJS/dockerfile`
- **Frontend:** `frontEnd-QuartoSemestre/dockerfile`
- **Database:** `backEnd-QuartoSemestre/database/postgres/Dockerfile`

---

## Banco de Dados

- **SGBD:** PostgreSQL
- **Usuário:** `adacompanysteam`
- **Senha:** `2N1lrqwIaBxO4eCZU7w0mjGCBXX7QVee`
- **Banco:** `adacompanybd`
- **Script de inicialização:** `backEnd-QuartoSemestre/database/postgres/init.sql`

---

## Comandos para Execução

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

4. **Para parar e remover tudo:**
   ```sh
   docker-compose down
   ```

---

## Exemplos de Integração

### Backend

- **URL base:** `http://localhost:3000`
- **Exemplo de endpoint:**  
  `GET http://localhost:3000/health`

### Frontend

- **URL base:** `http://localhost` (porta 80)

### Banco de Dados

- **Host:** `localhost`
- **Porta:** `5432`
- **Usuário:** `adacompanysteam`
- **Senha:** `2N1lrqwIaBxO4eCZU7w0mjGCBXX7QVee`
- **Banco:** `adacompanybd`

---

## URLs das Aplicações Publicadas

- **Frontend:** [front-end-quarto-semestre.vercel.app](https://front-end-quarto-semestre.vercel.app) <!-- AJUSTE AQUI se necessário -->
- **Backend:** <!-- AJUSTE AQUI: Se houver URL pública, coloque aqui. Caso contrário, remova ou explique que roda localmente. -->

---

## Observações

- Certifique-se de preencher os nomes dos integrantes e as URLs públicas finais.
- Os arquivos de Dockerfile e Docker Compose estão presentes nos repositórios, conforme solicitado.
- Para dúvidas ou problemas, consulte os arquivos `README.md` de cada repositório ou abra uma issue. 