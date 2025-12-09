package com.fortunatis.estateservice.entity.inventory;

import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Entity
@Table(name = "availability_calendar")
@Getter
@Setter
public class AvailabilityCalendarEntry {
    @EmbeddedId
    private AvailabilityCalendarId id;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("unitId")
    @JoinColumn(name = "unit_id", nullable = false)
    private UnitEntity unit;

    @Column(name = "is_available", nullable = false)
    private boolean available = true;

    @Column(name = "price_override", precision = 12, scale = 2)
    private BigDecimal priceOverride;

    @Column(name = "min_stay_override")
    private Integer minStayOverride;

    @Column(name = "notes", length = 255)
    private String notes;
}
