const swaggerOptions = {
    swaggerDefinition: {
      openapi: '3.0.0',
      info: {
        title: 'API - ADA Company',
        version: '1.0.0',
        description: 'API RESTful para gerenciamento de clientes, funcionários, serviços e orçamentos de uma empresa. Esta API permite a administração centralizada de informações de clientes, o controle de funcionários, a gestão de serviços oferecidos e o acompanhamento de orçamentos, facilitando operações comerciais e processos internos.',
      },
      servers: [
        {
          url: 'http://localhost:3000',
          description: 'Servidor Local',
        },
      ],
    },
    apis: ['./src/routes/*.ts'], // Garante que o Swagger procure nas rotas
  };
  
  export default swaggerOptions;
  