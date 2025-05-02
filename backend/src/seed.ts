import { NestFactory } from '@nestjs/core';
import { SeedModule } from './infrastructure/seed/seed.module';
import { SeedService } from './infrastructure/seed/seed.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(SeedModule);
  const seedService = app.get(SeedService);
  await seedService.runSeed();
  await app.close();
}

bootstrap();
