-- liquibase formatted sql

-- changeset swann:1700857921377-1
CREATE TABLE estate
(
    id                         UUID NOT NULL,
    estate_advertiser          VARCHAR(255),
    estate_type                VARCHAR(255),
    estate_advertise_purpose   VARCHAR(255),
    rooms                      DOUBLE PRECISION,
    living_area                DOUBLE PRECISION,
    estate_availability_policy VARCHAR(255),
    estate_will_be_available   TIMESTAMP WITHOUT TIME ZONE,
    estate_price               DOUBLE PRECISION,
    estate_additional_price    DOUBLE PRECISION,
    estate_floor               VARCHAR(255),
    estate_number_of_floor     INTEGER,
    estate_lot_area            DOUBLE PRECISION,
    estate_floor_space         DOUBLE PRECISION,
    estate_room_height         DOUBLE PRECISION,
    estate_year_of_building    INTEGER,
    estate_year_of_renovation  INTEGER,
    video_url                  VARCHAR(255),
    title                      VARCHAR(255),
    description                TEXT,
    is_active                  BOOLEAN DEFAULT TRUE,
    is_published               BOOLEAN DEFAULT FALSE,
    is_deleted                 BOOLEAN DEFAULT FALSE,
    creation_date              TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    updated_at                 TIMESTAMP WITHOUT TIME ZONE,
    user_id                    VARCHAR(255),
    CONSTRAINT pk_estate PRIMARY KEY (id)
);

