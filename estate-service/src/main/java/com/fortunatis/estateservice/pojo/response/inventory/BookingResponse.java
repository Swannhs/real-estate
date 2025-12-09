package com.fortunatis.estateservice.pojo.response.inventory;

import lombok.Builder;
import lombok.Getter;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.UUID;

@Getter
@Builder
public class BookingResponse {
    private UUID bookingId;
    private UUID unitId;
    private LocalDate checkIn;
    private LocalDate checkOut;
    private Integer guests;
    private String status;
    private BigDecimal totalAmount;
    private String currency;
    private String paymentStatus;
}
