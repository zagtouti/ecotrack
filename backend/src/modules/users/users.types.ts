export type UserRole = "super_admin" | "admin" | "agent" | "finance" | "livreur" | "expediteur";

export type PermissionKey =
  | "dashboard.view"
  | "colis.create"
  | "colis.dispatch"
  | "finance.view"
  | "finance.manage"
  | "livreurs.manage"
  | "expediteurs.manage"
  | "users.manage"
  | "settings.manage"
  | "debts.view_private";

export type UserAccount = {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  role: UserRole;
  isActive: boolean;
  stationCode?: string;
  permissions: PermissionKey[];
  createdAt: string;
};

export type CreateUserInput = {
  name: string;
  role: UserRole;
  email?: string;
  phone?: string;
  stationCode?: string;
  permissions?: PermissionKey[];
};

export type UpdatePermissionsInput = {
  permissions: PermissionKey[];
};
