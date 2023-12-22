-- liquibase formatted sql

-- changeset swann:1703239372782-1
CREATE TABLE canton_name_variations
(
    id      UUID DEFAULT uuid_generate_v4() NOT NULL,
    cantons VARCHAR(255),
    CONSTRAINT pk_canton_name_variations PRIMARY KEY (id)
);

-- changeset swann:1703239372782-2
CREATE TABLE estate
(
    id                          UUID    DEFAULT uuid_generate_v4() NOT NULL,
    created_at                  TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    updated_at                  TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    estate_advertiser           VARCHAR(255),
    estate_type                 VARCHAR(255),
    estate_advertise_purpose    VARCHAR(255),
    rooms                       DOUBLE PRECISION,
    living_area                 DOUBLE PRECISION,
    estate_availability_policy  VARCHAR(255),
    estate_will_be_available    TIMESTAMP WITHOUT TIME ZONE,
    estate_will_be_available_to TIMESTAMP WITHOUT TIME ZONE,
    estate_price_currency       SMALLINT,
    estate_price                DOUBLE PRECISION,
    estate_additional_price     DOUBLE PRECISION,
    estate_floor                VARCHAR(255),
    estate_number_of_floor      INTEGER,
    estate_lot_area             DOUBLE PRECISION,
    estate_floor_space          DOUBLE PRECISION,
    estate_room_height          DOUBLE PRECISION,
    estate_year_of_building     INTEGER,
    estate_year_of_renovation   INTEGER,
    video_url                   VARCHAR(255),
    title                       VARCHAR(255),
    description                 TEXT,
    is_active                   BOOLEAN DEFAULT TRUE,
    is_published                BOOLEAN DEFAULT FALSE,
    is_deleted                  BOOLEAN DEFAULT FALSE,
    user_id                     VARCHAR(255),
    estate_contact_id           UUID    DEFAULT uuid_generate_v4(),
    location_id                 UUID    DEFAULT uuid_generate_v4(),
    estate_search_property_id   UUID    DEFAULT uuid_generate_v4(),
    country                     VARCHAR(255),
    CONSTRAINT pk_estate PRIMARY KEY (id)
);

-- changeset swann:1703239372782-3
CREATE TABLE estate_contact
(
    id                UUID    DEFAULT uuid_generate_v4() NOT NULL,
    contact_name      VARCHAR(255),
    contact_phone     VARCHAR(255),
    contact_email     VARCHAR(255),
    display_as_public BOOLEAN DEFAULT FALSE,
    CONSTRAINT pk_estate_contact PRIMARY KEY (id)
);

-- changeset swann:1703239372782-4
CREATE TABLE estate_features
(
    estate_id  UUID DEFAULT uuid_generate_v4() NOT NULL,
    feature_id UUID
);

-- changeset swann:1703239372782-5
CREATE TABLE estate_gallery
(
    id                    UUID    DEFAULT uuid_generate_v4() NOT NULL,
    original_image_name   VARCHAR(255),
    compressed_image_name VARCHAR(255),
    blurred_image_name    VARCHAR(50),
    creation_date         TIMESTAMP WITHOUT TIME ZONE,
    is_featured_image     BOOLEAN DEFAULT FALSE,
    estate_id             UUID    DEFAULT uuid_generate_v4() NOT NULL,
    CONSTRAINT pk_estate_gallery PRIMARY KEY (id)
);

-- changeset swann:1703239372782-6
CREATE TABLE estate_location
(
    id              UUID DEFAULT uuid_generate_v4() NOT NULL,
    latitude        VARCHAR(255),
    longitude       VARCHAR(255),
    road_number     VARCHAR(255),
    zip_code        VARCHAR(255),
    city            VARCHAR(255),
    address_line_1  VARCHAR(255),
    search_keywords VARCHAR(255),
    CONSTRAINT pk_estate_location PRIMARY KEY (id)
);

-- changeset swann:1703239372782-7
CREATE TABLE estate_rules
(
    id                           UUID DEFAULT uuid_generate_v4() NOT NULL,
    is_pet_allowed               BOOLEAN,
    is_smoking_allowed           BOOLEAN,
    is_general_amenities_allowed BOOLEAN,
    is_party_organizing_allowed  BOOLEAN,
    is_cooking_allowed           BOOLEAN,
    estate_id                    UUID DEFAULT uuid_generate_v4(),
    CONSTRAINT pk_estate_rules PRIMARY KEY (id)
);

-- changeset swann:1703239372782-8
CREATE TABLE estate_search_priority
(
    id         UUID DEFAULT uuid_generate_v4() NOT NULL,
    created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    updated_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    priority   INTEGER                         NOT NULL,
    CONSTRAINT pk_estate_search_priority PRIMARY KEY (id)
);

-- changeset swann:1703239372782-9
CREATE TABLE estate_search_property
(
    estate_id          UUID DEFAULT uuid_generate_v4() NOT NULL,
    search_property_id UUID DEFAULT uuid_generate_v4() NOT NULL,
    CONSTRAINT pk_estate_search_property PRIMARY KEY (estate_id, search_property_id)
);

-- changeset swann:1703239372782-10
CREATE TABLE estate_sticker
(
    id            UUID DEFAULT uuid_generate_v4() NOT NULL,
    created_at    TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    updated_at    TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    sticker_name  VARCHAR(255),
    sticker_style VARCHAR(255),
    CONSTRAINT pk_estate_sticker PRIMARY KEY (id)
);

-- changeset swann:1703239372782-11
CREATE TABLE estate_sticker_estate_type
(
    estate_sticker_id UUID DEFAULT uuid_generate_v4() NOT NULL,
    estate_type_id    UUID DEFAULT uuid_generate_v4() NOT NULL,
    CONSTRAINT pk_estate_sticker_estate_type PRIMARY KEY (estate_sticker_id, estate_type_id)
);

-- changeset swann:1703239372782-12
CREATE TABLE estate_wish_list
(
    id         UUID DEFAULT uuid_generate_v4() NOT NULL,
    created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    updated_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    estate_id  UUID DEFAULT uuid_generate_v4(),
    user_id    UUID                            NOT NULL,
    CONSTRAINT pk_estate_wish_list PRIMARY KEY (id)
);

-- changeset swann:1703239372782-13
ALTER TABLE estate
    ADD CONSTRAINT uc_estate_estate_contact UNIQUE (estate_contact_id);

-- changeset swann:1703239372782-14
ALTER TABLE estate
    ADD CONSTRAINT uc_estate_location UNIQUE (location_id);

-- changeset swann:1703239372782-15
ALTER TABLE estate_rules
    ADD CONSTRAINT uc_estate_rules_estate UNIQUE (estate_id);

-- changeset swann:1703239372782-16
ALTER TABLE estate_search_priority
    ADD CONSTRAINT uc_estate_search_priority_priority UNIQUE (priority);

-- changeset swann:1703239372782-17
ALTER TABLE estate_gallery
    ADD CONSTRAINT FK_ESTATE_GALLERY_ON_ESTATE FOREIGN KEY (estate_id) REFERENCES estate (id);

-- changeset swann:1703239372782-18
ALTER TABLE estate
    ADD CONSTRAINT FK_ESTATE_ON_ESTATE_CONTACT FOREIGN KEY (estate_contact_id) REFERENCES estate_contact (id);

-- changeset swann:1703239372782-19
ALTER TABLE estate
    ADD CONSTRAINT FK_ESTATE_ON_ESTATE_SEARCH_PROPERTY FOREIGN KEY (estate_search_property_id) REFERENCES estate_search_priority (id);

-- changeset swann:1703239372782-20
ALTER TABLE estate
    ADD CONSTRAINT FK_ESTATE_ON_LOCATION FOREIGN KEY (location_id) REFERENCES estate_location (id);

-- changeset swann:1703239372782-21
ALTER TABLE estate_rules
    ADD CONSTRAINT FK_ESTATE_RULES_ON_ESTATE FOREIGN KEY (estate_id) REFERENCES estate (id);

-- changeset swann:1703239372782-22
ALTER TABLE estate_wish_list
    ADD CONSTRAINT FK_ESTATE_WISH_LIST_ON_ESTATE FOREIGN KEY (estate_id) REFERENCES estate (id);

-- changeset swann:1703239372782-23
ALTER TABLE estate_features
    ADD CONSTRAINT fk_estate_features_on_estate FOREIGN KEY (estate_id) REFERENCES estate (id);

-- changeset swann:1703239372782-24
ALTER TABLE estate_search_property
    ADD CONSTRAINT fk_estseapro_on_estate FOREIGN KEY (estate_id) REFERENCES estate (id);

-- changeset swann:1703239372782-25
ALTER TABLE estate_search_property
    ADD CONSTRAINT fk_estseapro_on_estate_sticker FOREIGN KEY (search_property_id) REFERENCES estate_sticker (id);

-- changeset swann:1703239372782-26
ALTER TABLE estate_sticker_estate_type
    ADD CONSTRAINT fk_eststiesttyp_on_estate_search_priority FOREIGN KEY (estate_type_id) REFERENCES estate_search_priority (id);

-- changeset swann:1703239372782-27
ALTER TABLE estate_sticker_estate_type
    ADD CONSTRAINT fk_eststiesttyp_on_estate_sticker FOREIGN KEY (estate_sticker_id) REFERENCES estate_sticker (id);

