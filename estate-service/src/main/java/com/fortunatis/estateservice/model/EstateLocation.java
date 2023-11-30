package com.fortunatis.estateservice.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

import java.util.UUID;

@Entity
@Table(name = "estate_location")
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class EstateLocation {
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator"
    )
    @Column(name = "id", updatable = false, nullable = false, columnDefinition = "uuid default uuid_generate_v4()")
    private UUID id;

    @Column(name = "latitude")
    private String lat;

    @Column(name = "longitude")
    private String lng;

    @Column(name = "road_number")
    private String streetNo;

    @Column(name = "zip_code")
    private String zipCode;

    @Column(name = "city")
    private String city;

    @Column(name = "address_line_1")
    private String addressLine1;

    @Column(name = "search_keywords")
    private String searchKeywords;

    @OneToOne(mappedBy = "location")
    private Estate locationEstate;
}
