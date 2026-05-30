export const rolePermissions = {
    super_admin: [
        "dashboard.view",
        "colis.create",
        "colis.dispatch",
        "finance.view",
        "finance.manage",
        "livreurs.manage",
        "expediteurs.manage",
        "users.manage",
        "settings.manage",
        "debts.view_private"
    ],
    admin: [
        "dashboard.view",
        "colis.create",
        "colis.dispatch",
        "finance.view",
        "livreurs.manage",
        "expediteurs.manage"
    ],
    agent: ["dashboard.view", "colis.dispatch"],
    finance: ["dashboard.view", "finance.view", "finance.manage"],
    livreur: ["dashboard.view"],
    expediteur: ["dashboard.view", "colis.create"]
};
export const usersMock = [
    {
        id: "usr-super-admin",
        name: "Yacine G.",
        email: "admin@livraly.local",
        phone: "0770 00 00 01",
        role: "super_admin",
        isActive: true,
        stationCode: "BIR_DJIR",
        permissions: rolePermissions.super_admin,
        createdAt: "2026-05-01T09:00:00.000Z"
    },
    {
        id: "usr-finance",
        name: "Nadia Finance",
        email: "finance@livraly.local",
        phone: "0770 00 00 02",
        role: "finance",
        isActive: true,
        stationCode: "BIR_DJIR",
        permissions: rolePermissions.finance,
        createdAt: "2026-05-04T11:30:00.000Z"
    }
];
