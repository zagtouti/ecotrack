import { env } from "../../config/env.js";
import { buildDefaultRates, livreurDebtsMock, livreursMock } from "./livreurs.mock.js";
import type { CreateLivreurDebtInput, CreateLivreurInput, Livreur, LivreurDebt, LivreurStatus } from "./livreurs.types.js";

const now = () => new Date().toISOString();
const nextId = (prefix: string) => `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

export async function listLivreurs(status?: LivreurStatus): Promise<Livreur[]> {
  const rows = status ? livreursMock.filter((livreur) => livreur.status === status) : livreursMock;
  return structuredClone(rows);
}

export async function createLivreur(input: CreateLivreurInput): Promise<Livreur> {
  const livreur: Livreur = {
    id: nextId("liv"),
    name: input.name,
    phone: input.phone,
    password: input.password,
    type: input.type,
    status: "active",
    stationCode: input.stationCode ?? env.STATION_CODE,
    wilayaRates: input.wilayaRates?.length ? input.wilayaRates : buildDefaultRates(input.type),
    createdAt: now()
  };

  livreursMock.unshift(livreur);
  return structuredClone(livreur);
}

export async function setLivreurStatus(livreurId: string, status: LivreurStatus): Promise<Livreur | null> {
  const livreur = livreursMock.find((candidate) => candidate.id === livreurId);
  if (!livreur) return null;

  livreur.status = status;
  return structuredClone(livreur);
}

export async function listLivreurDebts(): Promise<LivreurDebt[]> {
  return structuredClone(livreurDebtsMock);
}

export async function createLivreurDebt(input: CreateLivreurDebtInput): Promise<LivreurDebt | null> {
  const livreur = livreursMock.find((candidate) => candidate.id === input.livreurId);
  if (!livreur) return null;

  const debt: LivreurDebt = {
    id: nextId("debt"),
    livreurId: livreur.id,
    livreurName: livreur.name,
    amount: input.amount,
    reason: input.reason,
    status: input.status ?? "open",
    visibleAdminOnly: true,
    createdAt: now()
  };

  livreurDebtsMock.unshift(debt);
  return structuredClone(debt);
}
