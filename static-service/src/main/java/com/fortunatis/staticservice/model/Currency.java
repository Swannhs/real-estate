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
@Table(name = "currencies")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Currency {
    @Id
    private UUID id = UUID.randomUUID();
    private String currency;

    @Column(name = "currency_name")
    private String currencyName;

    @Column(name = "is_active")
    private Boolean isActive;

    @Column(name = "priority")
    private Long priority;
}
