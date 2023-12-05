package com.fortunatis.staticservice.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

import java.util.UUID;

@Entity
@Table(name = "currencies")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Currency {
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator"
    )
    @Column(name = "id", updatable = false, nullable = false, columnDefinition = "uuid default uuid_generate_v4()")
    private UUID id;

    @Column(name = "currency")
    private String currency;

    @Column(name = "currency_name")
    private String currencyName;

    @Column(name = "is_active")
    private Boolean isActive;

    @Column(name = "priority")
    private Long priority;
}
