package com.fortunatis.staticservice.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Entity
@Table(name = "citys")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class City {
    @Id
    @Column(name = "id", updatable = false, nullable = false, columnDefinition = "uuid default uuid_generate_v4()")
    private UUID id;

    @Column(name = "zip_code")
    private String zipCode;

    @Column(name = "city_name")
    private String cityName;

    @ManyToOne
    @JoinColumn(name = "country_id")
    private Country country;
}