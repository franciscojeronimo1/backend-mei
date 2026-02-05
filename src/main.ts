import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';

/* 
 - `src/app.`
 - `src/app/app.controller.ts` modulo principal de rotas
 - `src/app/app.service.ts` contém a lógica da aplicação
 - `src/app/app.module.ts` é o módulo principal da aplicação
*/

// Arquivo que inicia a aplicação
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // remove as propriedades que não estão no DTO
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
