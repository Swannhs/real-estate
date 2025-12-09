package com.fortunatis.bookingservice.model;

import java.time.Instant;
import java.time.LocalDate;
import java.util.UUID;

public record Booking(
        UUID id,
        UUID propertyId,
        UUID unitId,
        UUID userId,
        LocalDate checkIn,
        LocalDate checkOut,
        BookingStatus status,
        BookingPaymentStatus paymentStatus,
        Instant createdAt
) {
}
