import type { Livreur, LivreurDebt, WilayaRate } from "./livreurs.types.js";

export const wilayas = [
  "Adrar",
  "Chlef",
  "Laghouat",
  "Oum el Bouaghi",
  "Batna",
  "Béjaïa",
  "Biskra",
  "Béchar",
  "Blida",
  "Bouira",
  "Tamanrasset",
  "Tébessa",
  "Tlemcen",
  "Tiaret",
  "Tizi Ouzou",
  "Alger",
  "Djelfa",
  "Jijel",
  "Sétif",
  "Saïda",
  "Skikda",
  "Sidi Bel Abbès",
  "Annaba",
  "Guelma",
  "Constantine",
  "Médéa",
  "Mostaganem",
  "M'Sila",
  "Mascara",
  "Ouargla",
  "Oran",
  "El Bayadh",
  "Illizi",
  "Bordj Bou Arréridj",
  "Boumerdès",
  "El Tarf",
  "Tindouf",
  "Tissemsilt",
  "El Oued",
  "Khenchela",
  "Souk Ahras",
  "Tipaza",
  "Mila",
  "Aïn Defla",
  "Naâma",
  "Aïn Témouchent",
  "Ghardaïa",
  "Relizane"
];

export function buildDefaultRates(type: "city" | "navet"): WilayaRate[] {
  const amount = type === "city" ? 150 : 280;
  return wilayas.map((wilaya) => ({ wilaya, amount }));
}

export const livreursMock: Livreur[] = [
  {
    id: "liv-rachid",
    name: "Rachid Boukert",
    phone: "0550 77 88 99",
    type: "city",
    status: "active",
    stationCode: "BIR_DJIR",
    wilayaRates: buildDefaultRates("city"),
    createdAt: "2026-05-01T08:00:00.000Z"
  },
  {
    id: "liv-maamer",
    name: "Maamer Youssef",
    phone: "0661 44 55 66",
    type: "navet",
    status: "active",
    stationCode: "BIR_DJIR",
    wilayaRates: buildDefaultRates("navet"),
    createdAt: "2026-05-02T08:00:00.000Z"
  },
  {
    id: "liv-bilal",
    name: "Bilal Cherif",
    phone: "0551 70 80 90",
    type: "city",
    status: "deactivated",
    stationCode: "BIR_DJIR",
    wilayaRates: buildDefaultRates("city"),
    createdAt: "2026-04-20T08:00:00.000Z"
  }
];

export const livreurDebtsMock: LivreurDebt[] = [
  {
    id: "debt-chadli-1",
    livreurId: "liv-rachid",
    livreurName: "Rachid Boukert",
    amount: 11500,
    reason: "Paiement court",
    status: "open",
    visibleAdminOnly: true,
    createdAt: "2026-05-20T14:00:00.000Z"
  },
  {
    id: "debt-maamer-1",
    livreurId: "liv-maamer",
    livreurName: "Maamer Youssef",
    amount: 4200,
    reason: "Colis manquant",
    status: "review",
    visibleAdminOnly: true,
    createdAt: "2026-05-19T10:00:00.000Z"
  }
];
