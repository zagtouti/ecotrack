import type { DashboardSummary } from "./dashboard.types.js";

export const dashboardMock: DashboardSummary = {
  station: {
    code: "BIR_DJIR",
    name: "Station Bir Djir",
    country: "DZ"
  },
  businessDate: "2026-05-25",
  scan: {
    valid: 0,
    errors: 0,
    total: 0
  },
  metrics: [
    {
      key: "reception",
      label: "Reception",
      value: 136,
      tone: "neutral"
    },
    {
      key: "in_delivery",
      label: "En livraison",
      value: 869,
      tone: "success"
    },
    {
      key: "returns",
      label: "Retours",
      value: 1896,
      tone: "warning"
    }
  ],
  alerts: [
    {
      id: "stop-desk-4d",
      label: "Stop-desk > 4 jours",
      count: 12,
      severity: "danger",
      targetView: "livraison"
    },
    {
      id: "zero-attempts",
      label: "0 tentatives",
      count: 17,
      severity: "danger",
      targetView: "reclamations"
    },
    {
      id: "cash-not-collected",
      label: "Non encaisses",
      count: 534,
      severity: "warning",
      targetView: "finance"
    }
  ],
  recentActivity: [
    {
      trackingId: "EC2045871",
      sender: "Anderson-ecommerce",
      recipient: "Ali Meziane",
      wilaya: "Oran",
      status: "En livraison",
      lastEventAt: "2026-05-25T13:10:00+01:00"
    },
    {
      trackingId: "EC2045866",
      sender: "Fatima Hadj",
      recipient: "Sara Khelifi",
      wilaya: "Oran",
      status: "A valider",
      lastEventAt: "2026-05-25T12:44:00+01:00"
    },
    {
      trackingId: "EC2045854",
      sender: "Rb livraison",
      recipient: "Hamidi Mohammed",
      wilaya: "Oran",
      status: "Suspendu",
      lastEventAt: "2026-05-24T23:24:00+01:00"
    }
  ]
};

