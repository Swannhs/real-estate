package com.fortunatis.staticservice.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

import java.io.Serializable;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "payment_package")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class PaymentPackage implements Serializable {
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator"
    )
    @Column(name = "id", updatable = false, nullable = false, columnDefinition = "uuid default uuid_generate_v4()")
    private UUID id;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "price")
    private Double price;

    @Column(name = "price_by")
    private String priceBy;

    @Column(name = "cross_price")
    private Double crossPrice;

    @Column(name = "is_active")
    private Boolean isActive;

    @Column(name = "currency", columnDefinition = "varchar(10) default 'CHF'")
    private String currency;

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "payment_tag_id", referencedColumnName = "id")
    @JsonManagedReference
    private PaymentTag paymentTag;

    @ManyToMany(cascade = {CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH})
    @JoinTable(name = "payment_package_features",
            joinColumns = @JoinColumn(name = "payment_package_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "payment_features_id", referencedColumnName = "id"))
    @JsonManagedReference
    private List<PaymentFeature> paymentFeatures;
}
