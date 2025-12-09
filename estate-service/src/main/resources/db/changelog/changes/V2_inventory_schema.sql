-- liquibase formatted sql

-- changeset estate:inventory-1
CREATE TABLE IF NOT EXISTS locations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    country_code CHAR(2) NOT NULL,
    state VARCHAR(100),
    city VARCHAR(120) NOT NULL,
    postal_code VARCHAR(20),
    address_line1 VARCHAR(200) NOT NULL,
    address_line2 VARCHAR(200),
    latitude NUMERIC(10,8),
    longitude NUMERIC(11,8),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- changeset estate:inventory-2
CREATE TABLE IF NOT EXISTS properties (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    owner_user_id UUID NOT NULL,
    location_id UUID NOT NULL REFERENCES locations(id),
    title VARCHAR(180) NOT NULL,
    description TEXT,
    property_type VARCHAR(80) NOT NULL,
    status VARCHAR(40) NOT NULL DEFAULT 'draft',
    bedrooms SMALLINT,
    bathrooms SMALLINT,
    area_sqft NUMERIC(10,2),
    timezone VARCHAR(64) NOT NULL DEFAULT 'UTC',
    published_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- changeset estate:inventory-3
CREATE INDEX IF NOT EXISTS idx_properties_location ON properties(location_id);
CREATE INDEX IF NOT EXISTS idx_properties_status ON properties(status);

-- changeset estate:inventory-4
CREATE TABLE IF NOT EXISTS units (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
    name VARCHAR(120) NOT NULL,
    capacity SMALLINT NOT NULL,
    base_rate NUMERIC(12,2) NOT NULL,
    currency CHAR(3) NOT NULL DEFAULT 'USD',
    availability_strategy VARCHAR(40) NOT NULL DEFAULT 'calendar',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- changeset estate:inventory-5
CREATE INDEX IF NOT EXISTS idx_units_property ON units(property_id);

-- changeset estate:inventory-6
CREATE TABLE IF NOT EXISTS rate_plans (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    unit_id UUID NOT NULL REFERENCES units(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    min_nights SMALLINT,
    max_nights SMALLINT,
    advance_booking_min_days SMALLINT,
    advance_booking_max_days SMALLINT,
    base_rate NUMERIC(12,2) NOT NULL,
    currency CHAR(3) NOT NULL DEFAULT 'USD',
    pricing_rules JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- changeset estate:inventory-7
CREATE INDEX IF NOT EXISTS idx_rate_plans_unit ON rate_plans(unit_id);

-- changeset estate:inventory-8
CREATE TABLE IF NOT EXISTS availability_calendar (
    unit_id UUID NOT NULL REFERENCES units(id) ON DELETE CASCADE,
    stay_date DATE NOT NULL,
    is_available BOOLEAN NOT NULL DEFAULT TRUE,
    price_override NUMERIC(12,2),
    min_stay_override SMALLINT,
    notes VARCHAR(255),
    PRIMARY KEY (unit_id, stay_date)
);

-- changeset estate:inventory-9
CREATE TABLE IF NOT EXISTS bookings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    unit_id UUID NOT NULL REFERENCES units(id),
    user_id UUID NOT NULL,
    check_in DATE NOT NULL,
    check_out DATE NOT NULL,
    guests SMALLINT NOT NULL,
    status VARCHAR(40) NOT NULL DEFAULT 'pending',
    total_amount NUMERIC(12,2) NOT NULL,
    currency CHAR(3) NOT NULL DEFAULT 'USD',
    payment_status VARCHAR(40) NOT NULL DEFAULT 'unpaid',
    hold_expires_at TIMESTAMPTZ,
    cancellation_policy VARCHAR(120),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- changeset estate:inventory-10
CREATE INDEX IF NOT EXISTS idx_bookings_unit_dates ON bookings(unit_id, check_in, check_out);
CREATE INDEX IF NOT EXISTS idx_bookings_user ON bookings(user_id);

-- changeset estate:inventory-11
CREATE TABLE IF NOT EXISTS booking_payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_id UUID NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
    provider VARCHAR(40) NOT NULL,
    provider_payment_id VARCHAR(120),
    status VARCHAR(40) NOT NULL,
    amount NUMERIC(12,2) NOT NULL,
    currency CHAR(3) NOT NULL DEFAULT 'USD',
    captured_at TIMESTAMPTZ,
    metadata JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- changeset estate:inventory-12
CREATE INDEX IF NOT EXISTS idx_booking_payments_booking ON booking_payments(booking_id);
