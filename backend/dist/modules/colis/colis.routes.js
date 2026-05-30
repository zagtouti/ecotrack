import { z } from "zod";
import { createColis, listColis } from "./colis.service.js";
const CreateColisBodySchema = z.object({
    expediteurId: z.string().min(1),
    recipientName: z.string().min(1),
    recipientPhone: z.string().min(3),
    wilaya: z.string().min(1),
    commune: z.string().min(1).optional(),
    address: z.string().min(1).optional(),
    product: z.string().min(1).optional(),
    notes: z.string().optional(),
    codAmount: z.coerce.number().nonnegative().optional(),
    quantity: z.coerce.number().int().positive().optional(),
    fragile: z.boolean().optional()
});
export async function registerColisRoutes(app) {
    app.get("/api/v1/colis", async (request) => {
        const query = z.object({ expediteurId: z.string().min(1).optional() }).parse(request.query);
        return { colis: await listColis(query.expediteurId) };
    });
    app.post("/api/v1/colis", async (request, reply) => {
        const body = CreateColisBodySchema.parse(request.body);
        const colis = await createColis(body);
        if (!colis)
            return reply.code(404).send({ error: "EXPEDITEUR_NOT_FOUND" });
        return reply.code(201).send({ colis });
    });
}
