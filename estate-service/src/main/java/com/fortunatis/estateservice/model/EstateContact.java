package com.fortunatis.estateservice.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

import java.io.Serializable;
import java.util.UUID;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "estate_contact")
public class EstateContact implements Serializable {
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator"
    )
    @Column(name = "id", updatable = false, nullable = false, columnDefinition = "uuid default uuid_generate_v4()")
    private UUID id;

    @Column(name = "contact_name")
    private String name;

    @Column(name = "contact_phone")
    private String phone;

    @Column(name = "contact_email")
    private String email;

    @Column(name = "display_as_public", columnDefinition = "boolean default false")
    private Boolean displayAsPublic;

    @OneToOne(mappedBy = "contact")
    @JsonBackReference
    private Estate contactEstate;
}
