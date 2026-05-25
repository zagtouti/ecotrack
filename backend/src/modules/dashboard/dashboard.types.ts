export type DashboardMetric = {
  key: string;
  label: string;
  value: number;
  unit?: string;
  tone: "neutral" | "success" | "warning" | "danger";
};

export type DashboardAlert = {
  id: string;
  label: string;
  count: number;
  severity: "warning" | "danger";
  targetView: "livraison" | "retours" | "reclamations" | "finance";
};

export type DashboardActivity = {
  trackingId: string;
  sender: string;
  recipient: string;
  wilaya: string;
  status: string;
  lastEventAt: string;
};

export type DashboardSummary = {
  station: {
    code: string;
    name: string;
    country: "DZ";
  };
  businessDate: string;
  scan: {
    valid: number;
    errors: number;
    total: number;
  };
  metrics: DashboardMetric[];
  alerts: DashboardAlert[];
  recentActivity: DashboardActivity[];
};

