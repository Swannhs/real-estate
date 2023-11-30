package com.fortunatis.estateservice.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.GenericGenerator;

import java.io.Serializable;
import java.util.UUID;

@Entity
@Table(name = "estate_rules")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class EstateRules implements Serializable {
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator"
    )
    @Column(name = "id", updatable = false, nullable = false, columnDefinition = "uuid default uuid_generate_v4()")
    private UUID id;

    @Column(name = "is_pet_allowed")
    private Boolean isPetAllowed;

    @Column(name = "is_smoking_allowed")
    private Boolean isSmokingAllowed;

    @Column(name = "is_general_amenities_allowed")
    private Boolean isGeneralAmenitiesAllowed;

    @Column(name = "is_party_organizing_allowed")
    private Boolean isPartyOrganizingAllowed;

    @Column(name = "is_cooking_allowed")
    private Boolean isCookingAllowed;

    @JsonBackReference
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "estate_id")
    private Estate estate;
}
