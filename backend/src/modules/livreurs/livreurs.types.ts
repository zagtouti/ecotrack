export type LivreurType = "city" | "navet";
export type LivreurStatus = "active" | "deactivated";
export type DebtStatus = "open" | "review" | "paid";

export type WilayaRate = {
  wilaya: string;
  amount: number;
};

export type Livreur = {
  id: string;
  name: string;
  phone: string;
  password?: string;
  type: LivreurType;
  status: LivreurStatus;
  stationCode: string;
  wilayaRates: WilayaRate[];
  createdAt: string;
};

export type CreateLivreurInput = {
  name: string;
  phone: string;
  password: string;
  type: LivreurType;
  stationCode?: string;
  wilayaRates?: WilayaRate[];
};

export type LivreurDebt = {
  id: string;
  livreurId: string;
  livreurName: string;
  amount: number;
  reason: string;
  status: DebtStatus;
  visibleAdminOnly: true;
  createdAt: string;
};

export type CreateLivreurDebtInput = {
  livreurId: string;
  amount: number;
  reason: string;
  status?: DebtStatus;
};
