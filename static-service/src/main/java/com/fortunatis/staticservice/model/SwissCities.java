package com.fortunatis.staticservice.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Entity
@Table(name = "swiss_cities")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class SwissCities {
    @Id
    private UUID id =  UUID.randomUUID();

    @Column(name = "address_en")
    private String addressEn;

    @Column(name = "address_de")
    private String addressDe;

    @Column(name = "address_fr")
    private String addressFr;

    @Column(name = "address_it")
    private String addressIt;

    @Column(name = "latitude")
    private String latitude;

    @Column(name = "longitude")
    private String longitude;
}