package com.fortunatis.bookingservice.dto;

import com.fortunatis.bookingservice.model.BookingPaymentStatus;
import com.fortunatis.bookingservice.model.BookingStatus;

import java.time.Instant;
import java.time.LocalDate;
import java.util.UUID;

public record BookingResponse(
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
