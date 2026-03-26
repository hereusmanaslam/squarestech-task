"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: process.env.CORS_ORIGIN?.split(',').map((s) => s.trim()) ?? ['http://localhost:3000'],
    });
    app.setGlobalPrefix('api');
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    const swaggerConfig = new swagger_1.DocumentBuilder()
        .setTitle('Team Directory API')
        .setDescription('CRUD API for team members')
        .setVersion('1.0')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, swaggerConfig);
    swagger_1.SwaggerModule.setup('docs', app, document);
    await app.listen(Number(process.env.PORT ?? 3001));
}
void bootstrap();
//# sourceMappingURL=main.js.map