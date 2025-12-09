package com.fortunatis.bookingservice.service;

import com.fortunatis.bookingservice.dto.BookingResponse;
import com.fortunatis.bookingservice.dto.CreateBookingRequest;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface BookingService {
    BookingResponse createBooking(CreateBookingRequest request);

    Optional<BookingResponse> getById(UUID id);

    List<BookingResponse> findByUser(UUID userId);
}
