import 'dotenv/config';
import express, { Express } from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerOptions from './src/config/swaggerConfig';

// Importando rotas
import clienteRoute from './src/routes/clienteRoute';
import servicoRoute from './src/routes/servicoRoute';
import funcionarioRoute from './src/routes/funcionarioRoute';
import orcamentoRoute from './src/routes/orcamentoRoute';
import authRoutes from './src/routes/authRoutes';

const app: Express = express();

// Configurando CORS
app.use(
  cors({
    origin: ['http://localhost:3000', 'https://adacompany.vercel.app'], // Habilita CORS para esta origem
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Middlewares para JSON e body-parser
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Configurando rotas
app.use('/api/auth', authRoutes);
app.use(clienteRoute);
app.use(servicoRoute);
app.use(funcionarioRoute);
app.use(orcamentoRoute);

// Swagger (Documentação)
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Conexão com o banco de dados
const mongoDB = process.env.MONGODB_URI;
mongoose.Promise = global.Promise;
mongoose.connect(mongoDB!)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Error connecting to MongoDB:', err));

// Verificação de conexão com o banco de dados
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erro ao conectar com o banco de dados'));

// Iniciando o servidor
app.listen(3000, () => {
  console.log('Servidor em execução na porta 3000');
});

export default app; 