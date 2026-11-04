# EchoSOS Admin

A separate Next.js administration console for the EchoSOS BLE emergency alert system.

## Architecture decisions

- **Application:** Next.js 16 + React 19 + TypeScript.
- **Operational data:** the existing EchoSOS Convex deployment used by `echoSOS1`.
- **Administrator authentication:** Better Auth via Convex's maintained `@convex-dev/better-auth` component. Auth records are stored in the same Convex deployment; no second database is introduced.
- **Map:** Leaflet + OpenStreetMap tiles with visible attribution.
- **Initial access model:** one administrator account; public administrator sign-up remains disabled.
- **Deployment:** local development first. Production deployment is deferred.

## Repository boundary

This repository owns the admin web UI. The `echoSOS1` repository remains the owner of the shared Convex backend, schema, Better Auth component registration, auth HTTP routes, and admin-only queries/mutations. Do not create a second Convex project or deploy a competing schema from this repository.

## Required local environment

Create `.env.local` after the shared backend is configured:

```env
NEXT_PUBLIC_CONVEX_URL=
NEXT_PUBLIC_CONVEX_SITE_URL=
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Never commit deployment URLs containing secrets, Better Auth secrets, or administrator credentials. Better Auth's secret and site URL belong in the Convex deployment environment, not browser-exposed variables.

## Local setup

```bash
npm install
npm run dev
```

## Backend integration status

The dashboard shell intentionally displays no fabricated counts, users, incidents, or map pins. It becomes operational after the shared backend branch adds:

1. Better Auth Convex component and auth routes.
2. A single-admin allowlist/bootstrap procedure with public sign-up disabled.
3. Authenticated admin queries for overview metrics, users, beacons, active alerts, and alert history.
4. Audited administrative acknowledgement/resolution actions that do not cancel a beacon-originated SOS.
5. A location telemetry history path if the hardware/mobile gateway is expected to provide ongoing movement updates.

## OSM operational note

The standard OSM tile service requires visible attribution, normal interactive tile loading, caching, and compliance with its usage policy. For high-volume production traffic, select a dedicated OSM tile provider rather than assuming the community tile server provides an SLA.
