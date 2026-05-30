import { z } from "zod";
import { createLivreur, createLivreurDebt, listLivreurDebts, listLivreurs, setLivreurStatus } from "./livreurs.service.js";
const LivreurStatusSchema = z.enum(["active", "deactivated"]);
const LivreurTypeSchema = z.enum(["city", "navet"]);
const DebtStatusSchema = z.enum(["open", "review", "paid"]);
const WilayaRateSchema = z.object({
    wilaya: z.string().min(1),
    amount: z.coerce.number().nonnegative()
});
const CreateLivreurBodySchema = z.object({
    name: z.string().min(1),
    phone: z.string().min(3),
    password: z.string().min(4),
    type: LivreurTypeSchema,
    stationCode: z.string().min(1).optional(),
    wilayaRates: z.array(WilayaRateSchema).optional()
});
const CreateDebtBodySchema = z.object({
    livreurId: z.string().min(1),
    amount: z.coerce.number().positive(),
    reason: z.string().min(1),
    status: DebtStatusSchema.optional()
});
export async function registerLivreurRoutes(app) {
    app.get("/api/v1/livreurs", async (request) => {
        const query = z.object({ status: LivreurStatusSchema.optional() }).parse(request.query);
        return { livreurs: await listLivreurs(query.status) };
    });
    app.post("/api/v1/livreurs", async (request, reply) => {
        const body = CreateLivreurBodySchema.parse(request.body);
        const livreur = await createLivreur(body);
        return reply.code(201).send({ livreur });
    });
    app.patch("/api/v1/livreurs/:livreurId/status", async (request, reply) => {
        const params = z.object({ livreurId: z.string().min(1) }).parse(request.params);
        const body = z.object({ status: LivreurStatusSchema }).parse(request.body);
        const livreur = await setLivreurStatus(params.livreurId, body.status);
        if (!livreur)
            return reply.code(404).send({ error: "LIVREUR_NOT_FOUND" });
        return { livreur };
    });
    app.get("/api/v1/livreur-debts", async () => ({
        debts: await listLivreurDebts()
    }));
    app.post("/api/v1/livreur-debts", async (request, reply) => {
        const body = CreateDebtBodySchema.parse(request.body);
        const debt = await createLivreurDebt(body);
        if (!debt)
            return reply.code(404).send({ error: "LIVREUR_NOT_FOUND" });
        return reply.code(201).send({ debt });
    });
}
