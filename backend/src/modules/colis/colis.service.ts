import { expediteursMock } from "../expediteurs/expediteurs.mock.js";
import { colisMock } from "./colis.mock.js";
import type { Colis, CreateColisInput } from "./colis.types.js";

const now = () => new Date().toISOString();
const nextId = (prefix: string) => `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

function createTrackingId() {
  return `EC${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
}

export async function listColis(expediteurId?: string): Promise<Colis[]> {
  const rows = expediteurId ? colisMock.filter((colis) => colis.expediteurId === expediteurId) : colisMock;
  return structuredClone(rows);
}

export async function createColis(input: CreateColisInput): Promise<Colis | null> {
  const expediteur = expediteursMock.find((candidate) => candidate.id === input.expediteurId);
  if (!expediteur) return null;

  const timestamp = now();
  const colis: Colis = {
    id: nextId("colis"),
    trackingId: createTrackingId(),
    expediteurId: expediteur.id,
    expediteurName: expediteur.name,
    recipientName: input.recipientName,
    recipientPhone: input.recipientPhone,
    wilaya: input.wilaya,
    commune: input.commune,
    address: input.address,
    product: input.product,
    notes: input.notes,
    codAmount: input.codAmount ?? 0,
    quantity: input.quantity ?? 1,
    fragile: input.fragile ?? false,
    status: "created",
    createdAt: timestamp,
    updatedAt: timestamp
  };

  colisMock.unshift(colis);
  return structuredClone(colis);
}
