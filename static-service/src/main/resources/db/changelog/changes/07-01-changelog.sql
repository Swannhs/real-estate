-- liquibase formatted sql

-- changeset swann:1699302958596-1
CREATE TABLE citys
(
    id         UUID NOT NULL,
    zip_code   VARCHAR(255),
    city_name  VARCHAR(255),
    country_id UUID,
    CONSTRAINT pk_citys PRIMARY KEY (id)
);

-- changeset swann:1699302958596-2
CREATE TABLE countrys
(
    id           UUID NOT NULL,
    country_name VARCHAR(255),
    country_code VARCHAR(255),
    alpha_2      VARCHAR(255),
    region       VARCHAR(255),
    sub_region   VARCHAR(255),
    is_active    BOOLEAN,
    CONSTRAINT pk_countrys PRIMARY KEY (id)
);

-- changeset swann:1699302958596-3
CREATE TABLE currencies
(
    id            UUID NOT NULL,
    currency      VARCHAR(255),
    currency_name VARCHAR(255),
    is_active     BOOLEAN,
    priority      BIGINT,
    CONSTRAINT pk_currencies PRIMARY KEY (id)
);

-- changeset swann:1699302958596-4
CREATE TABLE static_data
(
    id             UUID NOT NULL,
    keyword        VARCHAR(255),
    description_en TEXT,
    description_de TEXT,
    description_fr TEXT,
    description_it TEXT,
    data_type      VARCHAR(255),
    is_deleted     BOOLEAN,
    creation_date  TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    CONSTRAINT pk_static_data PRIMARY KEY (id)
);

-- changeset swann:1699302958596-5
CREATE TABLE swiss_cities
(
    id         UUID NOT NULL,
    address_en VARCHAR(255),
    address_de VARCHAR(255),
    address_fr VARCHAR(255),
    address_it VARCHAR(255),
    latitude   VARCHAR(255),
    longitude  VARCHAR(255),
    CONSTRAINT pk_swiss_cities PRIMARY KEY (id)
);

-- changeset swann:1699302958596-6
ALTER TABLE citys
    ADD CONSTRAINT FK_CITYS_ON_COUNTRY FOREIGN KEY (country_id) REFERENCES countrys (id);

-- changeset swann:1699302958596-7
CREATE TABLE features
(
    id                UUID NOT NULL,
    features_title    VARCHAR(255),
    features_title_de VARCHAR(255),
    features_title_fr VARCHAR(255),
    features_title_it VARCHAR(255),
    is_active         BOOLEAN DEFAULT TRUE,
    CONSTRAINT pk_features PRIMARY KEY (id)
);
