# Booking Service

This service coordinates booking orchestration between the estate inventory API, payments, and user accounts. It aligns with the target architecture by acting as the system of record for reservation lifecycle state and emitting events to messaging for downstream consumers (CRM, notifications, analytics).

## Planned Responsibilities
- Accept booking intents from the client experience (property + unit + dates + user context).
- Validate availability against the estate-service before holding inventory.
- Initiate payment authorization with the payment-service and update booking status accordingly.
- Emit booking lifecycle events (created, confirmed, cancelled) for messaging/CRM pipelines.

## Current Skeleton
- In-memory booking persistence with REST endpoints under `/api/bookings`.
- OpenAPI UI available at `/swagger-ui.html` when the app is running.
- Actuator health endpoint exposed at `/actuator/health`.

## Next Steps
- Replace in-memory storage with Postgres + Liquibase migrations.
- Integrate estate-service availability checks and user-service identity validation.
- Add payment-service authorization workflows and idempotency keys.
- Publish booking events to the messaging service (Kafka/RabbitMQ) and consume payment webhooks.
