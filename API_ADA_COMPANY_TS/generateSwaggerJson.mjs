import swaggerJsDoc from 'swagger-jsdoc';
import fs from 'fs';

// Configuração do Swagger
const swaggerOptions = {
    swaggerDefinition: {
      openapi: '3.0.0',
      info: {
        title: 'API de Cadastro e Login',
        version: '1.0.0',
        description: 'API para gerenciamento de clientes, funcionários, orçamentos e serviços.',
        contact: {
          name: 'Nome do Desenvolvedor',
          email: 'email@exemplo.com'
        }
      },
      servers: [
        {
          url: 'http://localhost:3000', // URL base da API
        }
      ]
    },
    apis: ['./src/routes/*.ts'], // Caminho para as rotas com as anotações do Swagger
  };
  
  const swaggerDocs = swaggerJsDoc(swaggerOptions);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

fs.writeFileSync('./swagger.json', JSON.stringify(swaggerDocs, null, 2), 'utf-8');
console.log('Arquivo swagger.json gerado com sucesso!');
