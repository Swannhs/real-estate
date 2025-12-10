-- Create the "static-data-service" database (errors if it already exists)
CREATE DATABASE "static-data-service";

-- Create the role "fortunatis" with a password (errors if it already exists)
CREATE ROLE fortunatis WITH LOGIN PASSWORD 'fortunatis';

-- Grant all privileges on the "static-data-service" database to "fortunatis"
GRANT ALL PRIVILEGES ON DATABASE "static-data-service" TO fortunatis;

-- Grant privileges on all future tables within the "static-data-service" schema to "fortunatis"
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL PRIVILEGES ON TABLES TO fortunatis;

-- Create the "estate-service" database (errors if it already exists)
CREATE DATABASE "estate-service";

-- Grant all privileges on the "estate-service" database to "fortunatis"
GRANT ALL PRIVILEGES ON DATABASE "estate-service" TO fortunatis;

-- Grant privileges on all future tables within the "estate-service" schema to "fortunatis"
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL PRIVILEGES ON TABLES TO fortunatis;

-- Create the "user-service" database (errors if it already exists)
CREATE DATABASE "user-service";

-- Grant all privileges on the "user-service" database to "fortunatis"
GRANT ALL PRIVILEGES ON DATABASE "user-service" TO fortunatis;

-- Grant privileges on all future tables within the "user-service" schema to "fortunatis"
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL PRIVILEGES ON TABLES TO fortunatis;

-- Create the "auth-service" database (errors if it already exists)
CREATE DATABASE "auth-service";

-- Create the "email-service" database
CREATE DATABASE "email-service";
GRANT ALL PRIVILEGES ON DATABASE "email-service" TO fortunatis;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL PRIVILEGES ON TABLES TO fortunatis;

-- Create the CRM database dedicated to lead/pipeline management
CREATE DATABASE "crm-service";
GRANT ALL PRIVILEGES ON DATABASE "crm-service" TO fortunatis;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL PRIVILEGES ON TABLES TO fortunatis;

-- Create the "keycloak" database
CREATE DATABASE "keycloak";
CREATE ROLE keycloak WITH LOGIN PASSWORD 'keycloak';
GRANT ALL PRIVILEGES ON DATABASE "keycloak" TO keycloak;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL PRIVILEGES ON TABLES TO keycloak;

-- Connect to "static-data-service" and create the extension if it doesn't exist
\c "static-data-service"
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Repeat the above for other databases:
\c "estate-service"
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Core inventory and booking schema for estate-service
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

CREATE INDEX IF NOT EXISTS idx_properties_location ON properties(location_id);
CREATE INDEX IF NOT EXISTS idx_properties_status ON properties(status);

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

CREATE INDEX IF NOT EXISTS idx_units_property ON units(property_id);

CREATE TABLE IF NOT EXISTS rate_plans (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    unit_id UUID NOT NULL REFERENCES units(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    min_nights SMALLINT DEFAULT 1,
    max_nights SMALLINT,
    advance_booking_min_days SMALLINT,
    advance_booking_max_days SMALLINT,
    base_rate NUMERIC(12,2) NOT NULL,
    currency CHAR(3) NOT NULL DEFAULT 'USD',
    pricing_rules JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_rate_plans_unit ON rate_plans(unit_id);

CREATE TABLE IF NOT EXISTS availability_calendar (
    unit_id UUID NOT NULL REFERENCES units(id) ON DELETE CASCADE,
    stay_date DATE NOT NULL,
    is_available BOOLEAN NOT NULL DEFAULT TRUE,
    price_override NUMERIC(12,2),
    min_stay_override SMALLINT,
    notes VARCHAR(255),
    PRIMARY KEY (unit_id, stay_date)
);

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

CREATE INDEX IF NOT EXISTS idx_bookings_unit_dates ON bookings(unit_id, check_in, check_out);
CREATE INDEX IF NOT EXISTS idx_bookings_user ON bookings(user_id);

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

CREATE INDEX IF NOT EXISTS idx_booking_payments_booking ON booking_payments(booking_id);

\c "user-service"
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- User profile and billing metadata schema for user-service
CREATE TABLE IF NOT EXISTS user_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    external_auth_id VARCHAR(120) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(40),
    first_name VARCHAR(120),
    last_name VARCHAR(120),
    locale VARCHAR(16) DEFAULT 'en',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS payment_methods (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_profile_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
    provider VARCHAR(40) NOT NULL,
    provider_ref VARCHAR(120) NOT NULL,
    brand VARCHAR(40),
    last4 CHAR(4),
    exp_month SMALLINT,
    exp_year SMALLINT,
    is_default BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_payment_methods_user ON payment_methods(user_profile_id);

\c "crm-service"
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Leads and pipeline schema for crm-service
CREATE TABLE IF NOT EXISTS pipelines (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS pipeline_stages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    pipeline_id UUID NOT NULL REFERENCES pipelines(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    position SMALLINT NOT NULL,
    probability NUMERIC(5,2),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (pipeline_id, position)
);

CREATE TABLE IF NOT EXISTS leads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    external_user_id UUID,
    pipeline_stage_id UUID REFERENCES pipeline_stages(id),
    source VARCHAR(80),
    status VARCHAR(40) NOT NULL DEFAULT 'new',
    full_name VARCHAR(200),
    email VARCHAR(255),
    phone VARCHAR(40),
    desired_city VARCHAR(120),
    desired_budget NUMERIC(12,2),
    desired_move_in DATE,
    tags TEXT[],
    assigned_agent_id UUID,
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_leads_stage ON leads(pipeline_stage_id);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);

CREATE TABLE IF NOT EXISTS lead_tasks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    lead_id UUID NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
    task_type VARCHAR(80) NOT NULL,
    due_at TIMESTAMPTZ,
    status VARCHAR(40) NOT NULL DEFAULT 'open',
    assigned_agent_id UUID,
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_lead_tasks_lead ON lead_tasks(lead_id);

\c "email-service"
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

