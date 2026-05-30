export type ColisStatus = "created" | "in_station" | "in_delivery" | "delivered" | "return" | "suspended";

export type Colis = {
  id: string;
  trackingId: string;
  expediteurId: string;
  expediteurName: string;
  recipientName: string;
  recipientPhone: string;
  wilaya: string;
  commune?: string;
  address?: string;
  product?: string;
  notes?: string;
  codAmount: number;
  quantity: number;
  fragile: boolean;
  status: ColisStatus;
  createdAt: string;
  updatedAt: string;
};

export type CreateColisInput = {
  expediteurId: string;
  recipientName: string;
  recipientPhone: string;
  wilaya: string;
  commune?: string;
  address?: string;
  product?: string;
  notes?: string;
  codAmount?: number;
  quantity?: number;
  fragile?: boolean;
};
