# Advanced Database Plan for the Real Estate Platform

## Current State Assessment
- Postgres bootstrap only creates databases/roles without domain tables, so booking, CRM, and profile data are not yet modeled.
- No migration framework usage in Compose (Liquibase present in services but not wired to schemas), and no guardrails for foreign keys, indices, or auditing.
- Databases are split per service (estate, user, email, auth, static-data) but CRM structures and pricing/availability logic are missing.

## Target Architecture Principles
- **Service-aligned schemas**: Each service owns its database (estate, user, CRM, email) with clear foreign-key boundaries and stable UUID identifiers for cross-service references.
- **Data quality**: Enforce referential integrity, uniqueness, and appropriate indexing for search, bookings, and CRM workflows.
- **Performance & scale**: Partition or index by date for booking/availability, add covering indexes for read-heavy queries, and keep payloads lean via JSONB for flexible rules/metadata.
- **Auditability & compliance**: Timestamps on every table, support soft delete/audit tables, and keep PII localized to user-service with references elsewhere.
- **Migration discipline**: Use Liquibase per service, with repeatable changelogs for reference data and checksum-protected migrations.

## Domain Schemas (initial cut)
### Estate Service (inventory & booking)
- `locations`: Normalized addresses and geo coordinates.
- `properties`: Ownership, basic facts, publish state, and timezone.
- `units`: Bookable units tied to properties with base rates and capacity.
- `rate_plans`: Pricing rules per unit (min/max nights, advance booking windows, JSONB rule payloads for seasonal/weekly modifiers).
- `availability_calendar`: Per-day availability and overrides for pricing/min-stay.
- `bookings`: Reservation records with hold/payment status and cancellation policy.
- `booking_payments`: Payment transaction tracking per booking.

### User Service (profiles & billing metadata)
- `user_profiles`: Keycloak/external auth linkage plus contact/locale preferences.
- `payment_methods`: Vaulted payment references per user with provider metadata.

### CRM Service (leads & pipelines)
- `pipelines` and `pipeline_stages`: Configurable stages with probability weighting.
- `leads`: Lead capture, assignment, tags, and desired property attributes.
- `lead_tasks`: Follow-up tasks/reminders tied to leads.

### Other Services
- **Email**: Keep UUID extension; email templates/logs to be added with retention policy.
- **Static/Content**: Create reference tables for amenities, categories, and SEO slugs via Liquibase when CMS models are finalized.

## Cross-Cutting Enhancements
- Add **indices**: geo lookups (city/state), booking date ranges, lead stage/status, and payment status.
- Add **constraints**: currency check constraints, enum tables for statuses, and cascading deletes where ownership is clear.
- **Partitioning candidates**: `availability_calendar` and `bookings` by month for large inventories; use child tables or declarative partitioning.
- **Auditing**: Introduce `*_history` tables and/or change-data-capture (CDC) stream (e.g., Debezium) for analytics/warehouse feeds.
- **Retention & backups**: PITR-enabled Postgres, automated nightly backups, and data lifecycle rules for leads/notifications.
- **Caching**: Redis for availability lookups and booking holds; invalidate on write via events.

## Implementation Roadmap
1. **Adopt migrations**: Split this bootstrap SQL into Liquibase changelogs per service and wire them into service startup pipelines.
2. **Finalize enums/reference data**: Define status/type lookup tables for properties, bookings, leads, and payment providers.
3. **Add auditing**: Create `*_history` tables or triggers for bookings, rate plans, and leads; surface change feeds for BI.
4. **Partitioning & performance**: Evaluate monthly partitions for `availability_calendar`/`bookings` and add composite indexes based on real queries.
5. **Data protection**: Move sensitive PII into user-service only, encrypt secrets at rest, and add row-level policies if multi-tenant.
6. **Observability**: Add slow query logs, pg_stat_statements, and connection pool metrics; define SLOs for query latency.
7. **Disaster recovery drills**: Validate backup/restore scripts and rehearse failover (if using managed Postgres) before launch.

## Status
- Bootstrap SQL now provisions foundational tables for estate, user, and CRM services. Next steps are to express these structures in Liquibase, add reference data/enums, and integrate migrations into CI/CD.
