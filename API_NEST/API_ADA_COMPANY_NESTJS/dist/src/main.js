"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
async function bootstrap() {
    const port = 3000;
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    const config = new swagger_1.DocumentBuilder()
        .setTitle('API ADA Company')
        .setDescription('API para gerenciamento de serviços da ADA Company')
        .setVersion('1.0')
        .addTag('auth', 'Endpoints de autenticação')
        .addTag('clientes', 'Gerenciamento de clientes')
        .addTag('funcionarios', 'Gerenciamento de funcionários')
        .addTag('servicos', 'Gerenciamento de serviços')
        .addTag('orcamentos', 'Gerenciamento de orçamentos')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    await app.listen(port);
    console.log(`Aplicação rodando na porta ${port}`);
    console.log(`Documentação Swagger disponível em: http://localhost:${port}/api`);
}
bootstrap();
//# sourceMappingURL=main.js.map