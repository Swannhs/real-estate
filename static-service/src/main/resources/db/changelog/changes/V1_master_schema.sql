-- liquibase formatted sql

-- changeset swann:1701195382520-1
CREATE TABLE citys
(
    id         UUID DEFAULT uuid_generate_v4() NOT NULL,
    zip_code   VARCHAR(255),
    city_name  VARCHAR(255),
    country_id UUID DEFAULT uuid_generate_v4(),
    CONSTRAINT pk_citys PRIMARY KEY (id)
);

-- changeset swann:1701195382520-2
CREATE TABLE countrys
(
    id           UUID DEFAULT uuid_generate_v4() NOT NULL,
    country_name VARCHAR(255),
    country_code VARCHAR(255),
    alpha_2      VARCHAR(255),
    region       VARCHAR(255),
    sub_region   VARCHAR(255),
    is_active    BOOLEAN,
    CONSTRAINT pk_countrys PRIMARY KEY (id)
);

-- changeset swann:1701195382520-3
CREATE TABLE currencies
(
    id            UUID DEFAULT uuid_generate_v4() NOT NULL,
    currency      VARCHAR(255),
    currency_name VARCHAR(255),
    is_active     BOOLEAN,
    priority      BIGINT,
    CONSTRAINT pk_currencies PRIMARY KEY (id)
);

-- changeset swann:1701195382520-4
CREATE TABLE features
(
    id                UUID    DEFAULT uuid_generate_v4() NOT NULL,
    features_title    VARCHAR(255),
    features_title_de VARCHAR(255),
    features_title_fr VARCHAR(255),
    features_title_it VARCHAR(255),
    is_active         BOOLEAN DEFAULT TRUE,
    CONSTRAINT pk_features PRIMARY KEY (id)
);

-- changeset swann:1701195382520-5
CREATE TABLE general_terms_and_conditions
(
    id                              UUID DEFAULT uuid_generate_v4() NOT NULL,
    general_terms_and_conditions_en TEXT,
    general_terms_and_conditions_gr TEXT,
    general_terms_and_conditions_fr TEXT,
    general_terms_and_conditions_it TEXT,
    CONSTRAINT pk_general_terms_and_conditions PRIMARY KEY (id)
);

-- changeset swann:1701195382520-6
CREATE TABLE legal_notice
(
    id              UUID DEFAULT uuid_generate_v4() NOT NULL,
    legal_notice_en TEXT,
    legal_notice_gr TEXT,
    legal_notice_fr TEXT,
    legal_notice_it TEXT,
    CONSTRAINT pk_legal_notice PRIMARY KEY (id)
);

-- changeset swann:1701195382520-7
CREATE TABLE payment_features
(
    id        UUID DEFAULT uuid_generate_v4() NOT NULL,
    title     VARCHAR(255),
    is_new    BOOLEAN,
    is_active BOOLEAN,
    CONSTRAINT pk_payment_features PRIMARY KEY (id)
);

-- changeset swann:1701195382520-8
CREATE TABLE payment_package
(
    id             UUID        DEFAULT uuid_generate_v4() NOT NULL,
    name           VARCHAR(255),
    description    VARCHAR(255),
    price          DOUBLE PRECISION,
    price_by       VARCHAR(255),
    cross_price    DOUBLE PRECISION,
    is_active      BOOLEAN,
    currency       VARCHAR(10) DEFAULT 'CHF',
    payment_tag_id UUID        DEFAULT uuid_generate_v4(),
    CONSTRAINT pk_payment_package PRIMARY KEY (id)
);

-- changeset swann:1701195382520-9
CREATE TABLE payment_package_features
(
    payment_features_id UUID DEFAULT uuid_generate_v4() NOT NULL,
    payment_package_id  UUID DEFAULT uuid_generate_v4() NOT NULL
);

-- changeset swann:1701195382520-10
CREATE TABLE payment_tag
(
    id           UUID DEFAULT uuid_generate_v4() NOT NULL,
    name         VARCHAR(255),
    is_active    BOOLEAN,
    color        VARCHAR(255),
    border_color VARCHAR(255),
    CONSTRAINT pk_payment_tag PRIMARY KEY (id)
);

-- changeset swann:1701195382520-11
CREATE TABLE static_data
(
    id             UUID DEFAULT uuid_generate_v4() NOT NULL,
    keyword        VARCHAR(255),
    description_en TEXT,
    description_de TEXT,
    description_fr TEXT,
    description_it TEXT,
    data_type      VARCHAR(255),
    is_deleted     BOOLEAN,
    creation_date  TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    updated_by     UUID,
    CONSTRAINT pk_static_data PRIMARY KEY (id)
);

-- changeset swann:1701195382520-12
CREATE TABLE swiss_cities
(
    id         UUID DEFAULT uuid_generate_v4() NOT NULL,
    address_en VARCHAR(255),
    address_de VARCHAR(255),
    address_fr VARCHAR(255),
    address_it VARCHAR(255),
    latitude   VARCHAR(255),
    longitude  VARCHAR(255),
    CONSTRAINT pk_swiss_cities PRIMARY KEY (id)
);

-- changeset swann:1701195382520-13
ALTER TABLE citys
    ADD CONSTRAINT FK_CITYS_ON_COUNTRY FOREIGN KEY (country_id) REFERENCES countrys (id);

-- changeset swann:1701195382520-14
ALTER TABLE payment_package
    ADD CONSTRAINT FK_PAYMENT_PACKAGE_ON_PAYMENT_TAG FOREIGN KEY (payment_tag_id) REFERENCES payment_tag (id);

-- changeset swann:1701195382520-15
ALTER TABLE payment_package_features
    ADD CONSTRAINT fk_paypacfea_on_payment_features FOREIGN KEY (payment_features_id) REFERENCES payment_features (id);

-- changeset swann:1701195382520-16
ALTER TABLE payment_package_features
    ADD CONSTRAINT fk_paypacfea_on_payment_package FOREIGN KEY (payment_package_id) REFERENCES payment_package (id);

