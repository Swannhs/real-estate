# Target Service Topology and Flows

The platform is evolving toward a decoupled service mesh similar to the provided architecture map. The following scope applies to the estate/booking/user/payment/CRM/messaging domains.

## Services and Contracts
- **Estate-service**: Source of truth for properties, units, rate plans, and availability. Exposes read-heavy APIs for search and write APIs for owners/agents. Must provide idempotent availability holds for booking intents.
- **Booking-service (new)**: Orchestrates reservation lifecycle: receives intents from the client UI, checks availability in estate-service, coordinates payment authorization, and emits lifecycle events. Maintains booking state and relationships to user + property + unit.
- **Payment-service**: Manages payment intents, authorization, capture, refunds, and webhooks. Exposes callbacks the booking-service can consume to advance booking state.
- **User-service**: Supplies verified identity, roles, and profile/payment preferences. Booking and estate services consume it for user context.
- **CRM-service**: Ingests booking/lead events, enriches them with user/profile data, and powers pipelines/tasks. Subscribes to messaging topics emitted by booking and estate services.
- **Messaging-service**: Event backbone (Kafka/RabbitMQ) that carries booking lifecycle events, payment state changes, and notification triggers. Exposes dead-letter handling and replay for resilience.

## Critical Flows (Happy Path)
1. Client UI posts booking intent to **booking-service** with user + unit + dates.
2. Booking-service calls **estate-service** to confirm availability/hold inventory.
3. Booking-service calls **payment-service** to open a payment intent and marks booking as `PENDING` with payment status `PENDING`.
4. Payment-service returns authorization link/token; booking-service emits a `booking.created` event via **messaging-service**.
5. Upon payment webhook, payment-service emits `payment.authorized` → booking-service marks booking `CONFIRMED`, emits `booking.confirmed` event, and estate-service finalizes the hold.
6. CRM-service consumes booking events to create/advance deals; notification/messaging consumes to notify users/agents.

## Non-Happy Paths
- If availability fails, booking-service returns 409 and emits `booking.rejected` with reason.
- If payment fails/timeout, booking-service cancels the hold and emits `booking.cancelled` with payment failure metadata.
- If estate-service is unavailable, booking-service responds with 503 and publishes an operational event for alerting.

## Immediate Implementation Steps
- Ship the **booking-service** skeleton with REST endpoints and actuator health checks (done in this change).
- Add contract tests between booking-service and estate-service for availability checks.
- Define a shared event schema (JSON) for booking and payment topics; include idempotency keys and trace IDs.
- Introduce messaging infrastructure (Kafka/RabbitMQ) in docker-compose and wire booking-service + CRM-service consumers.
- Extend payment-service API stubs to return payment-intent handles; add webhook endpoints for status changes.

## Migration Notes
- Keep estate-service focused on inventory; migrate booking persistence out of estate-service into booking-service.
- Gradually route client bookings through booking-service; deprecate any direct booking writes to estate-service once parity is achieved.
- Maintain backward compatibility via API gateway routing until clients are fully migrated.
