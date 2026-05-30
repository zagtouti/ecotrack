import { dashboardMock } from "./dashboard.mock.js";
export async function getDashboardSummary(filters) {
    const summary = structuredClone(dashboardMock);
    if (filters.stationCode) {
        summary.station.code = filters.stationCode;
    }
    return summary;
}
