package com.fortunatis.bookingservice.dto;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;
import java.util.UUID;

public record CreateBookingRequest(
        @NotNull UUID propertyId,
        @NotNull UUID unitId,
        @NotNull UUID userId,
        @NotNull @Future LocalDate checkIn,
        @NotNull @Future LocalDate checkOut
) {
}
