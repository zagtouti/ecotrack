# dashboard

First backend slice for Livraly.

Current endpoint:

```txt
GET /api/v1/dashboard
GET /api/v1/dashboard?stationCode=BIR_DJIR
```

For now this returns mock data shaped like the dashboard UI:

- station identity
- business date
- scan counters
- primary metrics
- operational alerts
- recent colis activity

Tomorrow database-backed queries can replace `dashboard.mock.ts` without changing the API contract.

