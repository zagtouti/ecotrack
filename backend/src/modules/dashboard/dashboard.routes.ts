import type { FastifyInstance } from "fastify";
import { z } from "zod";
import { env } from "../../config/env.js";
import { getDashboardSummary } from "./dashboard.service.js";

const DashboardQuerySchema = z.object({
  stationCode: z.string().min(1).optional()
});

export async function registerDashboardRoutes(app: FastifyInstance) {
  app.get("/api/v1/dashboard", async (request) => {
    const query = DashboardQuerySchema.parse(request.query);

    return getDashboardSummary({
      stationCode: query.stationCode ?? env.STATION_CODE
    });
  });
}

