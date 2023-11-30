package com.fortunatis.staticservice.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Entity
@Table(name = "payment_tag")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class PaymentTag {
    @Id
    @Column(name = "id", updatable = false, nullable = false, columnDefinition = "uuid default uuid_generate_v4()")
    private UUID id;

    @Column(name = "name")
    private String name;

    @Column(name = "is_active")
    private Boolean isActive;

    @Column(name = "color")
    private String color;

    @Column(name = "border_color")
    private String borderColor;

    @OneToOne(mappedBy = "paymentTag", cascade = CascadeType.ALL)
    @JsonBackReference
    private PaymentPackage paymentPackage;
}
