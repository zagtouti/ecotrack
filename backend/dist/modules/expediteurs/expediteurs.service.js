import { colisMock } from "../colis/colis.mock.js";
import { expediteursMock } from "./expediteurs.mock.js";
const now = () => new Date().toISOString();
const nextId = (prefix) => `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
export async function listExpediteurs() {
    return structuredClone(expediteursMock);
}
export async function createExpediteur(input) {
    const expediteur = {
        id: nextId("exp"),
        name: input.name,
        phone: input.phone,
        gmail: input.gmail,
        address: input.address,
        billing: input.billing,
        isActive: true,
        createdAt: now()
    };
    expediteursMock.unshift(expediteur);
    return structuredClone(expediteur);
}
export async function getExpediteurDashboard(expediteurId) {
    const expediteur = expediteursMock.find((candidate) => candidate.id === expediteurId);
    if (!expediteur)
        return null;
    const rows = colisMock.filter((colis) => colis.expediteurId === expediteurId);
    const delivered = rows.filter((colis) => colis.status === "delivered");
    const returns = rows.filter((colis) => colis.status === "return");
    const inDelivery = rows.filter((colis) => colis.status === "in_delivery");
    const codCollected = delivered.reduce((total, colis) => total + colis.codAmount, 0);
    return {
        expediteur: structuredClone(expediteur),
        month: "2026-05",
        kpis: {
            totalSent: rows.length,
            inDelivery: inDelivery.length,
            delivered: delivered.length,
            returns: returns.length,
            codCollected,
            netToReceive: Math.max(codCollected - 43400, 0)
        },
        recentColis: rows.slice(0, 10).map((colis) => ({
            trackingId: colis.trackingId,
            recipientName: colis.recipientName,
            recipientPhone: colis.recipientPhone,
            wilaya: colis.wilaya,
            codAmount: colis.codAmount,
            status: colis.status,
            createdAt: colis.createdAt
        }))
    };
}
