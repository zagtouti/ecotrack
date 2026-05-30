import type { FastifyInstance } from "fastify";
import { z } from "zod";
import { createUser, listUsers, updateUserPermissions } from "./users.service.js";

const RoleSchema = z.enum(["super_admin", "admin", "agent", "finance", "livreur", "expediteur"]);
const PermissionSchema = z.enum([
  "dashboard.view",
  "colis.create",
  "colis.dispatch",
  "finance.view",
  "finance.manage",
  "livreurs.manage",
  "expediteurs.manage",
  "users.manage",
  "settings.manage",
  "debts.view_private"
]);

const ListUsersQuerySchema = z.object({
  role: RoleSchema.optional()
});

const CreateUserBodySchema = z.object({
  name: z.string().min(1),
  role: RoleSchema,
  email: z.string().email().optional(),
  phone: z.string().min(3).optional(),
  stationCode: z.string().min(1).optional(),
  permissions: z.array(PermissionSchema).optional()
});

const UpdatePermissionsBodySchema = z.object({
  permissions: z.array(PermissionSchema)
});

export async function registerUserRoutes(app: FastifyInstance) {
  app.get("/api/v1/users", async (request) => {
    const query = ListUsersQuerySchema.parse(request.query);
    return { users: await listUsers(query.role) };
  });

  app.post("/api/v1/users", async (request, reply) => {
    const body = CreateUserBodySchema.parse(request.body);
    const user = await createUser(body);
    return reply.code(201).send({ user });
  });

  app.put("/api/v1/users/:userId/permissions", async (request, reply) => {
    const params = z.object({ userId: z.string().min(1) }).parse(request.params);
    const body = UpdatePermissionsBodySchema.parse(request.body);
    const user = await updateUserPermissions(params.userId, body);

    if (!user) return reply.code(404).send({ error: "USER_NOT_FOUND" });
    return { user };
  });
}
