# EchoSOS Admin

A separate Next.js administration console for the EchoSOS BLE emergency alert system.

## Architecture decisions

- **Application:** Next.js 16 + React 19 + TypeScript.
- **Operational data:** the dedicated EchoSOS development Convex deployment (`perceptive-schnauzer-138`) while integrating; production remains isolated.
- **Administrator authentication:** Better Auth via Convex's maintained `@convex-dev/better-auth` component.
- **Map:** Leaflet + OpenStreetMap tiles with visible attribution.
- **Initial access model:** one administrator account; public registration is disabled.
- **Deployment:** local development first. Production deployment is deferred.

## Repository boundary

This repository owns the admin web UI. The `echoSOS1` repository owns the shared Convex backend, schema, Better Auth component registration, auth HTTP routes, and admin-only queries/mutations. During integration, use only the dedicated development deployment `https://perceptive-schnauzer-138.convex.cloud` and its `.convex.site` endpoint. Do not point admin development at production or create a second Convex project.

## Local setup

1. Integrate and validate the shared backend against the dedicated development deployment in `echoSOS1`.
2. Configure the three frontend environment variables shown in `.env.example` in the chosen runtime environment; do not commit private `.env.local` files.
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
