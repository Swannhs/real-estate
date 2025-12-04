# Real Estate Platform Production Plan

## Current Stack Snapshot
- **Microservices**: Estate, static content, user, and email Spring Boot services wired via Docker Compose, Keycloak, Postgres, and Redis. 【F:docker-compose-services.yml†L1-L128】【F:docker-compose.yml†L3-L47】
- **Back-end frameworks**: Spring Boot 3.1, JPA, Security/OAuth2 resource servers, Liquibase, and Testcontainers. 【F:estate-service/pom.xml†L5-L109】【F:user-service/pom.xml†L5-L110】
- **Front-end**: React + TypeScript (Vite/Cra hybrid) with Tailwind, Redux Toolkit, Google Maps, PayPal, and CKEditor integrations. 【F:client-ui-react/package.json†L1-L110】

## Product & Release Goals
- Enable customers to discover, book, and pay for properties with real-time availability and rich media.
- Provide a CRM for agents/admins to manage listings, leads, bookings, contracts, and communications.
- Ship a monitored, secure, scalable MVP to production with CI/CD, observability, and disaster recovery.

## Functional Workstreams
1. **Customer experience**
   - Responsive property search with filters, map view, saved searches, and alerts.
   - Booking flow: availability calendar, dynamic pricing, checkout (PayPal/Stripe), cancellation rules.
   - Auth: Keycloak-backed signup/login, social login, MFA, and profile management.
   - Post-booking: dashboards, documents (leases/invoices), messaging with agents, reviews.
2. **CRM/Admin**
   - Listing lifecycle: draft → QA → publish with rich media (images/video), amenities, compliance checks.
   - Lead management: capture, score, and assign; tasks/reminders; pipelines/kanban.
   - Booking operations: approvals, refunds, price overrides, promo codes, channel management.
   - Content/SEO: CMS for blogs/landing pages, SEO metadata, sitemap generation.
3. **Data & Integrations**
   - Payment gateways (Stripe/PayPal), KYC/identity, geocoding, address autocomplete, S3 storage/CDN.
   - Third-party listing syndication (e.g., Zillow/MLS adapters) and calendar sync (iCal/ICS).
   - Analytics: events, funnels, property performance, churn/retention dashboards.

## Architecture & Platform Roadmap
- **Service boundaries**: Keep estate-service focused on inventory/booking, user-service on identity/profile/billing metadata, static-service on CMS/SEO assets, email-service on notifications. Expand with a **CRM-service** for leads/pipelines to isolate CRM logic.
- **API design**: Versioned REST with OpenAPI, consistent error contracts, pagination/sorting, and DTO validation. Add gateway/edge (Traefik/NGINX) routes and rate limiting.
- **Data**: Postgres for relational data, Redis for caching/sessions/rate limits, S3 for media. Define migrations per service via Liquibase and enforce referential integrity.
- **Security**: OAuth2 resource servers with Keycloak realms/clients, fine-grained scopes/roles (customer/agent/admin). Add audit logging, secrets management (Vault/KMS), and WAF/IDS at the edge.
- **Observability**: Actuator, structured logging (JSON), distributed tracing (OpenTelemetry), metrics (Prometheus/Grafana), log aggregation (ELK/Cloud provider).
- **Scalability**: Stateless services with horizontal autoscaling, CDN for assets, background workers/queues (e.g., RabbitMQ/SQS) for emails, webhooks, image processing.
- **Resilience**: Health checks, readiness/liveness probes, circuit breakers/timeouts/retries, graceful shutdown, DR playbooks, and backups for Postgres/Redis/S3.
- **CI/CD**: Multi-stage builds, dependency scanning, unit/integration/e2e suites, Docker image signing, SBOM generation, and progressive delivery (blue/green or canary) via Kubernetes.

## Delivery Plan (Phased)
1. **Foundation (Week 1-2)**
   - Finalize domain model, API contracts, and data schemas (Liquibase).
   - Harden auth flows with Keycloak realms/clients, roles, and JWT validation in services.
   - Set up CI (lint/test/build), container builds, and vulnerability scanning.
2. **Core Booking (Week 3-5)**
   - Implement listing CRUD with media upload to S3 + CDN URLs.
   - Availability calendar, dynamic pricing rules, and booking creation/holds with payment intents.
   - Customer portal for search → detail → checkout → confirmation; email/SMS notifications.
3. **CRM & Operations (Week 6-8)**
   - Lead capture forms, scoring, assignments; task/appointment scheduling and reminders.
   - Agent/admin dashboards with pipelines, booking approvals, refunds, and promo management.
   - Document management (leases/invoices) and e-signature integration placeholder.
4. **Quality & Compliance (Week 9-10)**
   - Add integration tests with Testcontainers and contract tests between FE/BE.
   - Penetration testing checklist, PII handling, GDPR/CCPA flows (export/delete), and audit trails.
   - Performance testing (k6/JMeter) and load-induced optimizations (caching, DB indexes).
5. **Production Readiness (Week 11-12)**
   - Observability stack, alerts/SLOs, incident runbooks, on-call rotations.
   - Blue/green release strategy, database backup/restore drills, chaos testing on non-prod.
   - Cost optimization: autoscaling policies, right-sized DB/Redis, lifecycle rules for S3.

## Backlog Enhancements & Improvements
- Upgrade front-end build to a single Vite stack, add route-based code splitting, and strengthen type coverage.
- Replace host networking in Compose with bridge + explicit ports; adopt environment-specific overlays for dev/stage/prod.
- Introduce API gateway (Traefik/NGINX) rules with TLS termination, rate limits, and request logging.
- Add feature flags/experiments for search ranking, pricing strategies, and UI rollouts.
- Implement offline-friendly PWA features for mobile agents (caching key assets and recent listings).
- Add analytics events + consent management, and ship dashboards for conversion and retention.
- Create data warehouse/ETL feed (e.g., to BigQuery/Snowflake) for BI and forecasting.

## Acceptance Checklist for Production Cut
- ✅ All services have health/readiness probes, dashboards, alerts, and runbooks.
- ✅ End-to-end tests cover critical journeys (search → booking → payment → CRM update).
- ✅ Security: roles/scopes enforced, secrets externalized, transport encrypted (TLS), audits enabled.
- ✅ Reliability: backups tested, autoscaling verified, failure injection rehearsed.
- ✅ Compliance: data retention, PII access controls, breach response plan, and cookie/i18n UX confirmed.

## Ownership & Next Steps
- Assign owners per service/UI and a release captain for production readiness.
- Create Jira/Linear epics matching the phased plan and track DORA metrics from Day 1.
- Schedule weekly architecture and QA gates to keep scope aligned and quality high.
