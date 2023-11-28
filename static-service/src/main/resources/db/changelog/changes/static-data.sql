-- features --
INSERT INTO public.features (features_title, features_title_de, features_title_fr, features_title_it, is_active)
VALUES ('Has wheelchair access', 'Hai accesso in sedia a rotelle', 'Accesso per disabili', 'Accesso per disabili',
        true),
       ('Pet allowed', 'Animali domestici ammessi', 'Animali domestici ammessi', 'Animali domestici ammessi', true),
       ('Balcony / Terrace', 'Balcone / Terrazza', 'Balcone / Terrazza', 'Balcone / Terrazza', true),
       ('Parking place', 'Posto auto', 'Posto auto', 'Posto auto', true),
       ('Fireplace', 'Camino', 'Camino', 'Camino', true),
       ('View', 'Vista', 'Vista', 'Vista', true),
       ('Minergie construction', 'Costruzione Minergie', 'Costruzione Minergie', 'Costruzione Minergie', true),
       ('New building', 'Nuovo edificio', 'Nuovo edificio', 'Nuovo edificio', true),
       ('Child-friendly', 'Adatto ai bambini', 'Adatto ai bambini', 'Adatto ai bambini', true),
       ('Smoking permitted', 'Fumo consentito', 'Fumo consentito', 'Fumo consentito', true),
       ('Garage', 'Garage', 'Garage', 'Garage', true),
       ('Elevator', 'Ascensore', 'Ascensore', 'Ascensore', true),
       ('Private washing machine', 'Lavatrice privata', 'Lavatrice privata', 'Lavatrice privata', true),
       ('Quiet neighbourhood', 'Vicinato tranquillo', 'Vicinato tranquillo', 'Vicinato tranquillo', true),
       ('Minergie certified', 'Certificato Minergie', 'Certificato Minergie', 'Certificato Minergie', true),
       ('Old building', 'Vecchio edificio', 'Vecchio edificio', 'Vecchio edificio', true);


-- payment_features --
INSERT INTO public.payment_features (is_active, is_new, title)
VALUES (true, false, 'Fastest notification of interested parties'),
       (true, false, 'Appointment planner'),
       (true, false, '4x more listing views on average'),
       (true, false, 'Premium placement (before Top and Classic)'),
       (true, false, '130% more enquiries on average'),
       (true, false, 'Large ad and image format'),
       (true, false, 'Additional details about each interested person'),
       (true, false, '1.8x more listing views on average'),
       (true, false, 'Top placement'),
       (true, false, '55% more enquiries on average'),
       (true, false, 'Large ad and image format'),
       (true, false, 'Fastest notification of interested parties'),
       (true, false, '5 images maximum');


-- payment_package --
INSERT INTO public.payment_package (cross_price, currency, description, is_active, "name", price, price_by,
                                    payment_tag_id)
VALUES (15.0, 'CHF', 'Standard positioning in the search results.', true, 'Classic', 10.0, NULL, NULL),
       (25.0, 'CHF', 'Good positioning in the search results.', true, 'Top', 20.0, NULL, NULL),
       (35.0, 'CHF', 'Best positioning in the search results and high visibility.', true, 'Premium', 30.0, NULL, NULL);

INSERT INTO static_data (keyword, description_en, description_de, description_fr, description_it, data_type, is_deleted,
                         creation_date, updated_by)
VALUES ('Owner', 'Owner', 'EigentÃ¼mer', 'PropriÃ©taire', 'Proprietario', 'ADVERTISER', false, now(), null),
       ('Tenant', 'Tenant', 'Mieter', 'Locataire', 'Locatario', 'ADVERTISER', false, now(), null),
       ('Business', 'Business', 'GeschÃ¤ft', 'Affaire', 'Affare', 'ADVERTISER', false, now(), null);


INSERT INTO static_data (keyword, description_en, description_de, description_fr, description_it, data_type, is_deleted,
                         creation_date, updated_by)
VALUES ('Apartment', 'Apartment', 'Wohnung', 'Appartement', 'Appartamento', 'ESTATE_TYPE', false, now(), null),
       ('House', 'House', 'Haus', 'Maison', 'Casa', 'ESTATE_TYPE', false, now(), null),
       ('Plot', 'Plot', 'GrundstÃ¼ck', 'Terrain', 'Terreno', 'ESTATE_TYPE', false, now(), null),
       ('Parking', 'Parking', 'Parkplatz', 'Parking', 'Parcheggio', 'ESTATE_TYPE', false, now(), null);

INSERT INTO static_data (keyword, description_en, description_de, description_fr, description_it, data_type, is_deleted,
                         creation_date, updated_by)
VALUES ('Immediately', 'Immediately', 'Onmiddellijk', 'Immédiatement', 'Subito', 'ESTATE_AVAILABILITY_POLICY', false,
        now(), null),
       ('By_agreement', 'By agreement', 'Bij overeenkomst', 'Par consentement', 'Per accordo',
        'ESTATE_AVAILABILITY_POLICY', false, now(), null),
       ('By_date', 'By date', 'Op datum', 'Par_date', 'Entro_data', 'ESTATE_AVAILABILITY_POLICY', false, now(), null);

INSERT INTO static_data (keyword, description_en, description_de, description_fr, description_it, data_type, is_deleted,
                         creation_date, updated_by)
VALUES ('Rent', 'Rent', 'Huur', 'Louer', 'Affitto', 'ESTATE_ADVERTISE_PURPOSE', false, now(), null),
       ('Sell', 'Sell', 'Verkopen', 'Vendre', 'Vendre', 'ESTATE_ADVERTISE_PURPOSE', false, now(), null);
