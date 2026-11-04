# EchoSOS Admin

A separate Next.js administration console for the EchoSOS BLE emergency alert system.

## Architecture decisions

- **Application:** Next.js 16 + React 19 + TypeScript.
- **Operational data:** the existing EchoSOS Convex deployment used by `echoSOS1`.
- **Administrator authentication:** Better Auth via Convex's maintained `@convex-dev/better-auth` component.
- **Map:** Leaflet + OpenStreetMap tiles with visible attribution.
- **Initial access model:** one administrator account; public registration is disabled.
- **Deployment:** local development first. Production deployment is deferred.

## Repository boundary

This repository owns the admin web UI. The `echoSOS1` repository owns the shared Convex backend, schema, Better Auth component registration, auth HTTP routes, and admin-only queries/mutations. The backend work is on branch `feature/admin-backend-foundation`. Do not create a second Convex project or deploy a competing schema from this repository.

## Local setup

1. Review and integrate the shared backend branch in `echoSOS1` on a development deployment.
2. Copy `.env.example` to `.env.local` and fill in the URLs for the same Convex deployment used by the mobile app.
3. Install dependencies and run the admin app:

```bash
npm install
npm run dev
```

## Authentication

The Next.js app proxies Better Auth requests to the shared Convex deployment. The dashboard is protected by a Better Auth session cookie, and all data queries independently verify the authenticated identity against the server-side `ADMIN_EMAIL` allowlist.

Public sign-up is disabled. The first admin account must be provisioned through a controlled one-time bootstrap procedure in the shared backend; do not expose a public registration route.

## Live operations

The overview reads active alerts, recent alert-history events, and bounded user/beacon samples from the existing Convex tables. It plots real active-alert coordinates on OpenStreetMap and does not fabricate incident markers.

The current ESP32 telemetry flow captures coordinates when an SOS event is opened. It does not yet persist a continuous location trail, so the map is an incident-location map, not a live movement tracker.

Admin actions are intentionally read-only in this first increment. A later audited case-management workflow may support acknowledge/assign/resolve actions, but it must never cancel the user's beacon-originated SOS event.

## OpenStreetMap

The map includes visible OpenStreetMap attribution. The standard community tile service has usage requirements and no production SLA; use a dedicated OSM tile provider if traffic grows.
