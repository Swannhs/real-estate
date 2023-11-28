package com.fortunatis.staticservice.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;
import java.util.UUID;

@Entity
@Table(name = "countrys")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Country {
    @Id
    @Column(name = "id", updatable = false, nullable = false, columnDefinition = "uuid default uuid_generate_v4()")
    private UUID id;

    @Column(name = "country_name")
    private String countryName;

    @Column(name = "country_code")
    private String countryCode;

    @Column(name = "alpha_2")
    private String alpha2;

    @Column(name = "region")
    private String region;

    @Column(name = "sub_region")
    private String subRegion;

    @Column(name = "is_active")
    private boolean isActive;

    @OneToMany(mappedBy = "country", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore
    private Set<City> cities;

}