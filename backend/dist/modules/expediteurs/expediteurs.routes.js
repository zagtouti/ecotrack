import { z } from "zod";
import { createExpediteur, getExpediteurDashboard, listExpediteurs } from "./expediteurs.service.js";
const BillingSchema = z.enum(["cod", "prepaye", "mixte"]);
const CreateExpediteurBodySchema = z.object({
    name: z.string().min(1),
    phone: z.string().min(3),
    gmail: z.string().email().optional(),
    address: z.string().min(1).optional(),
    billing: BillingSchema
});
export async function registerExpediteurRoutes(app) {
    app.get("/api/v1/expediteurs", async () => ({
        expediteurs: await listExpediteurs()
    }));
    app.post("/api/v1/expediteurs", async (request, reply) => {
        const body = CreateExpediteurBodySchema.parse(request.body);
        const expediteur = await createExpediteur(body);
        return reply.code(201).send({ expediteur });
    });
    app.get("/api/v1/expediteurs/:expediteurId/dashboard", async (request, reply) => {
        const params = z.object({ expediteurId: z.string().min(1) }).parse(request.params);
        const dashboard = await getExpediteurDashboard(params.expediteurId);
        if (!dashboard)
            return reply.code(404).send({ error: "EXPEDITEUR_NOT_FOUND" });
        return { dashboard };
    });
}
