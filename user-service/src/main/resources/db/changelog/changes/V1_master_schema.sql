-- liquibase formatted sql

-- changeset swann:1708194426887-1
CREATE TABLE payment_setting
(
    id              UUID DEFAULT uuid_generate_v4() NOT NULL,
    user_id         UUID                            NOT NULL,
    payment_details JSONB,
    created_at      TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    updated_at      TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    CONSTRAINT pk_payment_setting PRIMARY KEY (id)
);

-- changeset swann:1708194426887-2
CREATE TABLE user_info
(
    id                   UUID    DEFAULT uuid_generate_v4() NOT NULL,
    user_id              UUID                               NOT NULL,
    phone_number         VARCHAR(255),
    profile_picture_path VARCHAR(255),
    verified_account     BOOLEAN DEFAULT FALSE,
    intro                VARCHAR(255),
    facebook_link        VARCHAR(255),
    twitter_link         VARCHAR(255),
    youtube_link         VARCHAR(255),
    instagram_link       VARCHAR(255),
    CONSTRAINT pk_user_info PRIMARY KEY (id)
);

-- changeset swann:1708194426887-3
ALTER TABLE payment_setting
    ADD CONSTRAINT uc_payment_setting_user UNIQUE (user_id);

-- changeset swann:1708194426887-4
ALTER TABLE user_info
    ADD CONSTRAINT uc_user_info_user UNIQUE (user_id);

