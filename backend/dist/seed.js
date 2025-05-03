"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const seed_module_1 = require("./infrastructure/seed/seed.module");
const seed_service_1 = require("./infrastructure/seed/seed.service");
async function bootstrap() {
    const app = await core_1.NestFactory.createApplicationContext(seed_module_1.SeedModule);
    const seedService = app.get(seed_service_1.SeedService);
    await seedService.runSeed();
    await app.close();
}
bootstrap();
//# sourceMappingURL=seed.js.map