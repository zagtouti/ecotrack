# Livraly Backend Module Map

## Core

- `dashboard`: station overview, scan counters, metrics, alerts
- `auth`: login, refresh, sessions
- `users`: admins, agents, finance users
- `roles`: permissions per role and user
- `stations`: station profile and counters

## Operations

- `colis`: tracking, status, recipient/sender data
- `scan`: scan events, validation, scan errors
- `dispatch`: assign colis to livreur or station
- `livraison`: delivery flow and attempts
- `retours`: return and exchange handling
- `livreurs`: desk flow, returned packages, cash, debts

## Money

- `caisse`: station balance and movements
- `finance`: expéditeur payments, expenses, reports

## Control

- `reclamations`: sous-traitant monitoring, notes, 0 tentative, aging
- `history`: event timelines
- `settings`: super-admin-only configuration
- `reports`: exports and daily close
