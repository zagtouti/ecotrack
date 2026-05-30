export type BillingType = "cod" | "prepaye" | "mixte";

export type Expediteur = {
  id: string;
  name: string;
  phone: string;
  gmail?: string;
  address?: string;
  billing: BillingType;
  isActive: boolean;
  createdAt: string;
};

export type CreateExpediteurInput = {
  name: string;
  phone: string;
  gmail?: string;
  address?: string;
  billing: BillingType;
};

export type ExpediteurDashboard = {
  expediteur: Expediteur;
  month: string;
  kpis: {
    totalSent: number;
    inDelivery: number;
    delivered: number;
    returns: number;
    codCollected: number;
    netToReceive: number;
  };
  recentColis: Array<{
    trackingId: string;
    recipientName: string;
    recipientPhone: string;
    wilaya: string;
    codAmount: number;
    status: string;
    createdAt: string;
  }>;
};
