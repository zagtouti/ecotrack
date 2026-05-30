import Fastify from "fastify";
import cors from "@fastify/cors";
import { registerColisRoutes } from "./modules/colis/colis.routes.js";
import { registerDashboardRoutes } from "./modules/dashboard/dashboard.routes.js";
import { registerExpediteurRoutes } from "./modules/expediteurs/expediteurs.routes.js";
import { registerLivreurRoutes } from "./modules/livreurs/livreurs.routes.js";
import { registerUserRoutes } from "./modules/users/users.routes.js";

export async function buildApp() {
  const app = Fastify({ logger: true });

  await app.register(cors, {
    origin: true
  });

  app.get("/health", async () => ({
    ok: true,
    service: "livraly-api"
  }));

  app.get("/api/v1/modules", async () => ({
    modules: [
      "dashboard",
      "auth",
      "users",
      "roles",
      "stations",
      "colis",
      "expediteurs",
      "scan",
      "dispatch",
      "livraison",
      "retours",
      "livreurs",
      "caisse",
      "finance",
      "reclamations",
      "history",
      "settings",
      "reports"
    ]
  }));

  await registerDashboardRoutes(app);
  await registerUserRoutes(app);
  await registerLivreurRoutes(app);
  await registerExpediteurRoutes(app);
  await registerColisRoutes(app);

  return app;
}
