-- Draft only. We will refine tomorrow before running migrations.

create table users (
  id uuid primary key,
  name text not null,
  email text unique,
  phone text,
  role text not null,
  station_id uuid,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table stations (
  id uuid primary key,
  code text unique not null,
  name text not null,
  wilaya text,
  created_at timestamptz not null default now()
);

create table colis (
  id uuid primary key,
  tracking_id text unique not null,
  status text not null,
  station_id uuid,
  livreur_id uuid,
  sender_name text,
  recipient_name text,
  recipient_phone text,
  wilaya text,
  commune text,
  address text,
  cash_amount numeric(12,2) not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table scan_events (
  id uuid primary key,
  tracking_id text not null,
  user_id uuid,
  station_id uuid,
  context text not null,
  success boolean not null,
  error_reason text,
  created_at timestamptz not null default now()
);

create table colis_events (
  id uuid primary key,
  colis_id uuid not null,
  event_type text not null,
  from_status text,
  to_status text,
  user_id uuid,
  note text,
  created_at timestamptz not null default now()
);

create table livreur_cash_receipts (
  id uuid primary key,
  livreur_id uuid not null,
  station_id uuid not null,
  expected_amount numeric(12,2) not null,
  received_amount numeric(12,2) not null,
  created_by uuid not null,
  created_at timestamptz not null default now()
);

create table livreur_debts (
  id uuid primary key,
  livreur_id uuid not null,
  amount numeric(12,2) not null,
  reason text not null,
  status text not null default 'open',
  visible_admin_only boolean not null default true,
  created_at timestamptz not null default now()
);

create table caisse_transactions (
  id uuid primary key,
  station_id uuid not null,
  type text not null,
  amount numeric(12,2) not null,
  reference text,
  note text,
  created_by uuid not null,
  created_at timestamptz not null default now()
);

create table reclamations (
  id uuid primary key,
  colis_id uuid not null,
  subcontractor text,
  status text not null,
  priority text not null default 'normal',
  created_at timestamptz not null default now()
);

create table reclamation_notes (
  id uuid primary key,
  reclamation_id uuid not null,
  note text not null,
  created_by uuid not null,
  created_at timestamptz not null default now()
);

