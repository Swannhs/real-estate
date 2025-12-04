package com.fortunatis.estateservice.entity.inventory;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.UUID;

@Embeddable
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class AvailabilityCalendarId implements Serializable {
    @Column(name = "unit_id", nullable = false)
    private UUID unitId;

    @Column(name = "stay_date", nullable = false)
    private LocalDate stayDate;
}
