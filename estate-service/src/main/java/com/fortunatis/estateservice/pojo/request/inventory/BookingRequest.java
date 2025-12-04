package com.fortunatis.estateservice.pojo.request.inventory;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.UUID;

@Getter
@Setter
public class BookingRequest {
    private UUID unitId;
    private LocalDate checkIn;
    private LocalDate checkOut;
    private Integer guests;
    private String currency;
    private String cancellationPolicy;
}
