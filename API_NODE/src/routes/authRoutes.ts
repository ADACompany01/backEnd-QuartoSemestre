import express, { Request, Response, Router } from 'express';
import { registerCliente, registerFuncionario, loginUser, registerOrcamento, registerServico} from '../controllers/authController';

const router: Router = express.Router();

// Rota para registro de Clientes
router.post('/registerCliente', async (req: Request, res: Response) => {
  try {
    const result = await registerCliente(req, res);  
    res.status(result.status).json(result);  
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: 'Erro desconhecido' });
    }
  }
});

// Rota para registro de Funcionários
router.post('/registerFuncionario', async (req: Request, res: Response) => {
  try {
    const result = await registerFuncionario(req, res);  
    res.status(result.status).json(result);  
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: 'Erro desconhecido' });
    }
  }
});

// Rota para registro de Orçamentos
router.post('/registerOrcamento', async (req: Request, res: Response) => {
  try {
    const result = await registerOrcamento(req, res);  
    res.status(result.status).json(result);  
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: 'Erro desconhecido' });
    }
  }
});

// Rota para registro de Serviços
router.post('/registerServico', async (req: Request, res: Response) => {
  try {
    const result = await registerServico(req, res);  
    res.status(result.status).json(result);  
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: 'Erro desconhecido' });
    }
  }
});


// Rota para login (tanto de Clientes quanto Funcionários)
router.post('/login', async (req: Request, res: Response) => {
  try {
    const result = await loginUser(req);  
    res.status(result.status).json(result);  
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: 'Erro desconhecido' });
    }
  }
});

export default router;

/**
 * @swagger
 * tags:
 *   - name: Cliente
 *     description: Endpoints para cadastro e login de clientes
 *   - name: Funcionário
 *     description: Endpoints para cadastro e login de funcionários
 */

/**
 * @swagger
 * /api/auth/registerCliente:
 *   post:
 *     summary: Cadastrar um novo cliente
 *     tags: [Cliente]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               _id:
 *                 type: integer
 *                 description: ID do cliente
 *               nomeCliente:
 *                 type: string
 *                 description: Nome completo do cliente
 *               telefone:
 *                 type: string
 *                 description: Telefone do cliente
 *               endereco:
 *                 type: object
 *                 properties:
 *                   cep:
 *                     type: string
 *                     description: CEP do endereço
 *                   logradouro:
 *                     type: string
 *                     description: Logradouro do endereço
 *                   complemento:
 *                     type: string
 *                     description: Complemento do endereço (opcional)
 *                   bairro:
 *                     type: string
 *                     description: Bairro do endereço
 *                   localidade:
 *                     type: string
 *                     description: Cidade do endereço
 *                   uf:
 *                     type: string
 *                     description: Unidade federativa do endereço
 *                   estado:
 *                     type: string
 *                     description: Estado do endereço
 *                   ddd:
 *                     type: string
 *                     description: Código DDD do endereço
 *               localizacao:
 *                 type: object
 *                 properties:
 *                   type:
 *                     type: string
 *                     enum: [Point]
 *                     description: Tipo de localização (sempre "Point")
 *                   coordinates:
 *                     type: array
 *                     items:
 *                       type: number
 *                     description: Coordenadas de localização [longitude, latitude]
 *               cnpj:
 *                 type: string
 *                 description: CNPJ do cliente
 *               usuario:
 *                 type: object
 *                 properties:
 *                   email:
 *                     type: string
 *                     description: Email do cliente
 *                   senha:
 *                     type: string
 *                     description: Senha do cliente
 *                   tipoUsuario:
 *                     type: string
 *                     enum: [cliente, admin]
 *                     description: Tipo de usuário
 *                   telefone:
 *                     type: string
 *                     description: Telefone do cliente (dentro de usuário)
 *                   nomeCompleto:
 *                     type: string
 *                     description: Nome completo do cliente (dentro de usuário)
 *     responses:
 *       201:
 *         description: Cliente registrado com sucesso
 *       500:
 *         description: Erro no servidor
 */

/**
 * @swagger
 * /api/auth/registerFuncionario:
 *   post:
 *     summary: Cadastrar um novo funcionário
 *     tags: [Funcionário]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               _id:
 *                 type: integer
 *                 description: ID do funcionário
 *               nomeFuncionario:
 *                 type: string
 *                 description: Nome completo do funcionário
 *               endereco:
 *                 type: object
 *                 properties:
 *                   cep:
 *                     type: string
 *                     description: CEP do endereço
 *                   logradouro:
 *                     type: string
 *                     description: Logradouro do endereço
 *                   complemento:
 *                     type: string
 *                     description: Complemento do endereço (opcional)
 *                   bairro:
 *                     type: string
 *                     description: Bairro do endereço
 *                   localidade:
 *                     type: string
 *                     description: Cidade do endereço
 *                   uf:
 *                     type: string
 *                     description: Unidade federativa do endereço
 *                   estado:
 *                     type: string
 *                     description: Estado do endereço
 *                   ddd:
 *                     type: string
 *                     description: Código DDD do endereço
 *               cargo:
 *                 type: string
 *                 description: Cargo do funcionário
 *               usuario:
 *                 type: object
 *                 properties:
 *                   email:
 *                     type: string
 *                     description: Email do funcionário
 *                   senha:
 *                     type: string
 *                     description: Senha do funcionário
 *                   tipoUsuario:
 *                     type: string
 *                     enum: [funcionario, admin]
 *                     description: Tipo de usuário
 *                   telefone:
 *                     type: string
 *                     description: Telefone do funcionário
 *                   nomeCompleto:
 *                     type: string
 *                     description: Nome completo do funcionário
 *               chatBot:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id_chatbot:
 *                       type: integer
 *                       description: ID da interação no chatbot
 *                     texto_chat:
 *                       type: string
 *                       description: Texto da interação no chatbot
 *                     data:
 *                       type: string
 *                       format: date-time
 *                       description: Data e hora da interação
 *     responses:
 *       201:
 *         description: Funcionário registrado com sucesso
 *       500:
 *         description: Erro no servidor
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login de um usuário (cliente ou funcionário)
 *     tags: [Cliente, Funcionário]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Email do usuário
 *               senha:
 *                 type: string
 *                 description: Senha do usuário
 *     responses:
 *       200:
 *         description: Login realizado com sucesso e retorna um token
 *       404:
 *         description: Usuário não encontrado
 *       400:
 *         description: Senha incorreta
 *       500:
 *         description: Erro no servidor
 */
/**
 * @swagger
 * tags:
 *   - name: Cliente
 *     description: Endpoints para operações CRUD de clientes, protegidos por autenticação e autorização de funcionário
 */

/**
 * @swagger
 * /api/clientes:
 *   get:
 *     summary: Buscar todos os clientes
 *     tags: [Cliente]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de todos os clientes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Cliente'
 *       401:
 *         description: Não autenticado
 *       403:
 *         description: Acesso negado - apenas funcionários
 *       500:
 *         description: Erro ao buscar clientes
 */

/**
 * @swagger
 * /api/clientes/{id}:
 *   get:
 *     summary: Buscar um cliente específico por ID
 *     tags: [Cliente]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do cliente
 *     responses:
 *       200:
 *         description: Dados do cliente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cliente'
 *       401:
 *         description: Não autenticado
 *       403:
 *         description: Acesso negado - apenas funcionários
 *       404:
 *         description: Cliente não encontrado
 *       500:
 *         description: Erro ao buscar cliente
 */

/**
 * @swagger
 * /api/clientes/{id}:
 *   put:
 *     summary: Atualizar dados de um cliente
 *     tags: [Cliente]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do cliente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Cliente'
 *     responses:
 *       200:
 *         description: Cliente atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cliente'
 *       401:
 *         description: Não autenticado
 *       403:
 *         description: Acesso negado - apenas funcionários
 *       404:
 *         description: Cliente não encontrado
 *       500:
 *         description: Erro ao atualizar cliente
 */

/**
 * @swagger
 * /api/clientes/{id}:
 *   delete:
 *     summary: Excluir um cliente
 *     tags: [Cliente]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do cliente
 *     responses:
 *       200:
 *         description: Cliente excluído com sucesso
 *       401:
 *         description: Não autenticado
 *       403:
 *         description: Acesso negado - apenas funcionários
 *       404:
 *         description: Cliente não encontrado
 *       500:
 *         description: Erro ao excluir cliente
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Cliente:
 *       type: object
 *       properties:
 *         _id:
 *           type: integer
 *         nomeCliente:
 *           type: string
 *         telefone:
 *           type: string
 *         endereco:
 *           type: object
 *           properties:
 *             cep:
 *               type: string
 *             logradouro:
 *               type: string
 *             complemento:
 *               type: string
 *             bairro:
 *               type: string
 *             localidade:
 *               type: string
 *             uf:
 *               type: string
 *             estado:
 *               type: string
 *             ddd:
 *               type: string
 *         localizacao:
 *           type: object
 *           properties:
 *             type:
 *               type: string
 *               enum: [Point]
 *             coordinates:
 *               type: array
 *               items:
 *                 type: number
 *         cnpj:
 *           type: string
 *         usuario:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *             senha:
 *               type: string
 *             tipoUsuario:
 *               type: string
 *               enum: [cliente, admin]
 *             telefone:
 *               type: string
 *             nomeCompleto:
 *               type: string
 */
/**
 * @swagger
 * tags:
 *   name: Funcionário
 *   description: Endpoints para operações CRUD de funcionários
 */

/**
 * @swagger
 * /api/funcionario:
 *   get:
 *     summary: Buscar todos os funcionários
 *     tags: [Funcionário]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Retorna a lista de funcionários
 *       500:
 *         description: Erro no servidor
 */

/**
 * @swagger
 * /api/funcionario/{id}:
 *   get:
 *     summary: Buscar um funcionário específico pelo ID
 *     tags: [Funcionário]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do funcionário
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Retorna as informações do funcionário
 *       404:
 *         description: Funcionário não encontrado
 *       500:
 *         description: Erro no servidor
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Funcionario:
 *       type: object
 *       properties:
 *         _id:
 *           type: integer
 *         nomeFuncionario:
 *           type: string
 *         cargo:
 *           type: string
 *         endereco:
 *           type: object
 *           properties:
 *             cep:
 *               type: string
 *             logradouro:
 *               type: string
 *             complemento:
 *               type: string
 *             bairro:
 *               type: string
 *             localidade:
 *               type: string
 *             uf:
 *               type: string
 *             estado:
 *               type: string
 *             ddd:
 *               type: string
 *         idUsuario:
 *           type: string
 *         chatBot:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id_chatbot:
 *                 type: string
 *               texto_chat:
 *                 type: string
 *               data:
 *                 type: string
 *                 format: date-time
 */

/**
 * @swagger
 * /api/funcionario/{id}:
 *   delete:
 *     summary: Excluir um funcionário pelo ID
 *     tags: [Funcionário]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do funcionário
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Funcionário excluído com sucesso
 *       404:
 *         description: Funcionário não encontrado
 *       500:
 *         description: Erro no servidor
 */
/** 

 * @swagger
 * tags:
 *   name: Orçamento
 *   description: Endpoints para operações CRUD de orçamentos
 */

/**
 * @swagger
 * /api/orcamento:
 *   get:
 *     summary: Buscar todos os orçamentos
 *     tags: [Orçamento]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Retorna a lista de orçamentos
 *       500:
 *         description: Erro no servidor
 */

/**
 * @swagger
 * /api/orcamento/{id}:
 *   get:
 *     summary: Buscar detalhes de um orçamento específico pelo ID
 *     tags: [Orçamento]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do orçamento
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Retorna os detalhes do orçamento
 *       404:
 *         description: Orçamento não encontrado
 *       500:
 *         description: Erro no servidor
 */

/**
 * @swagger
 * /api/orcamento:
 *   post:
 *     summary: Criar um novo orçamento
 *     tags: [Orçamento]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               clienteId:
 *                 type: string
 *               validadeOrcamento:
 *                 type: string
 *               dataCriacao:
 *                 type: string
 *               valorTotal:
 *                 type: number
 *               tipoServico:
 *                 type: array
 *                 items:
 *                   type: string
 *               statusOrcamento:
 *                 type: string
 *               descricao:
 *                 type: string
 *               emailVendedor:
 *                 type: string
 *     responses:
 *       201:
 *         description: Orçamento criado com sucesso
 *       400:
 *         description: Dados inválidos
 *       500:
 *         description: Erro no servidor
 */

/**
 * @swagger
 * /api/orcamento/{id}:
 *   put:
 *     summary: Atualizar um orçamento existente
 *     tags: [Orçamento]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do orçamento
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               clienteId:
 *                 type: string
 *               validadeOrcamento:
 *                 type: string
 *               dataCriacao:
 *                 type: string
 *               valorTotal:
 *                 type: number
 *               tipoServico:
 *                 type: array
 *                 items:
 *                   type: string
 *               statusOrcamento:
 *                 type: string
 *               descricao:
 *                 type: string
 *               emailVendedor:
 *                 type: string
 *     responses:
 *       200:
 *         description: Orçamento atualizado com sucesso
 *       400:
 *         description: Dados inválidos
 *       404:
 *         description: Orçamento não encontrado
 *       500:
 *         description: Erro no servidor
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     Orçamento:
 *       type: object
 *       properties:
 *         _id:
 *           type: integer
 *         clienteId:
 *           type: string
 *         funcionarioId:
 *           type: string
 *         dataCriacao:
 *           type: string
 *           format: date-time
 *         valorTotal:
 *           type: number
 *           format: float
 *         status:
 *           type: string
 *           enum: [pendente, aprovado, rejeitado]
 *         itens:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               descricao:
 *                 type: string
 *               quantidade:
 *                 type: integer
 *               precoUnitario:
 *                 type: number
 *                 format: float
 */

/**
 * @swagger
 * /api/orcamento/{id}:
 *   delete:
 *     summary: Deletar um orçamento específico pelo ID
 *     tags: [Orçamento]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do orçamento
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Orçamento deletado com sucesso
 *       404:
 *         description: Orçamento não encontrado
 *       500:
 *         description: Erro no servidor
 */
/**
 * @swagger
 * tags:
 *   name: Serviço
 *   description: Endpoints para operações CRUD de serviços
 */

/**
 * @swagger
 * /api/servico:
 *   get:
 *     summary: Buscar todos os serviços
 *     tags: [Serviço]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Retorna a lista de serviços
 *       500:
 *         description: Erro no servidor
 */

/**
 * @swagger
 * /api/servico/{id}:
 *   get:
 *     summary: Buscar detalhes de um serviço específico pelo ID
 *     tags: [Serviço]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do serviço
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Retorna os detalhes do serviço
 *       404:
 *         description: Serviço não encontrado
 *       500:
 *         description: Erro no servidor
 */

/**
 * @swagger
 * /api/servico:
 *   post:
 *     summary: Criar um novo serviço
 *     tags: [Serviço]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               descricao:
 *                 type: string
 *               valor:
 *                 type: number
 *               duracao:
 *                 type: number
 *     responses:
 *       201:
 *         description: Serviço criado com sucesso
 *       400:
 *         description: Dados inválidos
 *       500:
 *         description: Erro no servidor
 */

/**
 * @swagger
 * /api/servico/{id}:
 *   put:
 *     summary: Atualizar um serviço existente
 *     tags: [Serviço]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do serviço
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               descricao:
 *                 type: string
 *               valor:
 *                 type: number
 *               duracao:
 *                 type: number
 *     responses:
 *       200:
 *         description: Serviço atualizado com sucesso
 *       400:
 *         description: Dados inválidos
 *       404:
 *         description: Serviço não encontrado
 *       500:
 *         description: Erro no servidor
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     Serviço:
 *       type: object
 *       properties:
 *         _id:
 *           type: integer
 *         nomeServico:
 *           type: string
 *         descricao:
 *           type: string
 *         preco:
 *           type: number
 *           format: float
 *         duracao:
 *           type: string
 *           description: "Duração estimada do serviço, por exemplo, '2 horas'"
 *         categoria:
 *           type: string
 *         dataCriacao:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /api/servico/{id}:
 *   delete:
 *     summary: Deletar um serviço específico pelo ID
 *     tags: [Serviço]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do serviço
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Serviço deletado com sucesso
 *       404:
 *         description: Serviço não encontrado
 *       500:
 *         description: Erro no servidor
 */


