import { NestFactory } from "@nestjs/core";
import {
  FastifyAdapter,
  type NestFastifyApplication,
} from "@nestjs/platform-fastify";
import { AppModule } from "./app.module.js";

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  app.setGlobalPrefix("api/v1");

  const port = Number(process.env.PORT ?? 3000);
  const host = process.env.HOST ?? "localhost";
  await app.listen(port, host);
  console.log(`Server running at http://${host}:${port}/`);
}

void bootstrap();
