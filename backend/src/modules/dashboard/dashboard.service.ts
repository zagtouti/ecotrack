import { dashboardMock } from "./dashboard.mock.js";
import type { DashboardSummary } from "./dashboard.types.js";

export type DashboardFilters = {
  stationCode?: string;
};

export async function getDashboardSummary(filters: DashboardFilters): Promise<DashboardSummary> {
  const summary = structuredClone(dashboardMock);

  if (filters.stationCode) {
    summary.station.code = filters.stationCode;
  }

  return summary;
}

