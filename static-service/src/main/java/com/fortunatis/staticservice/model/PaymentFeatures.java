package com.fortunatis.staticservice.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "payment_features")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class PaymentFeatures {
    @Id
    @Column(name = "id", updatable = false, nullable = false, columnDefinition = "uuid default uuid_generate_v4()")
    private UUID id;

    @Column(name = "title")
    private String title;

    @Column(name = "is_new")
    private Boolean isNew;

    @Column(name = "is_active")
    private Boolean isActive;

    @ManyToMany(mappedBy = "paymentFeatures", fetch = FetchType.LAZY)
    @JsonBackReference
    private List<PaymentPackage> paymentPackages;
}
