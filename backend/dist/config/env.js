import { z } from "zod";
const EnvSchema = z.object({
    NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
    PORT: z.coerce.number().int().positive().default(4000),
    DATABASE_URL: z.string().default("postgres://postgres:postgres@localhost:5432/livraly"),
    JWT_ACCESS_SECRET: z.string().default("change-me"),
    JWT_REFRESH_SECRET: z.string().default("change-me-too"),
    STATION_CODE: z.string().default("BIR_DJIR")
});
export const env = EnvSchema.parse(process.env);
