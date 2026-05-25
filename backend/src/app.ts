import Fastify from "fastify";
import cors from "@fastify/cors";
import { registerDashboardRoutes } from "./modules/dashboard/dashboard.routes.js";

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

  return app;
}
