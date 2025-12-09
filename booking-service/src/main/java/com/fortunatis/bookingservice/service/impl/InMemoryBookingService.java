package com.fortunatis.bookingservice.service.impl;

import com.fortunatis.bookingservice.dto.BookingResponse;
import com.fortunatis.bookingservice.dto.CreateBookingRequest;
import com.fortunatis.bookingservice.model.Booking;
import com.fortunatis.bookingservice.model.BookingPaymentStatus;
import com.fortunatis.bookingservice.model.BookingStatus;
import com.fortunatis.bookingservice.service.BookingService;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class InMemoryBookingService implements BookingService {

    private final Map<UUID, Booking> store = new ConcurrentHashMap<>();

    @Override
    public BookingResponse createBooking(CreateBookingRequest request) {
        Booking booking = new Booking(
                UUID.randomUUID(),
                request.propertyId(),
                request.unitId(),
                request.userId(),
                request.checkIn(),
                request.checkOut(),
                BookingStatus.PENDING,
                BookingPaymentStatus.PENDING,
                Instant.now()
        );
        store.put(booking.id(), booking);
        return toResponse(booking);
    }

    @Override
    public Optional<BookingResponse> getById(UUID id) {
        return Optional.ofNullable(store.get(id)).map(this::toResponse);
    }

    @Override
    public List<BookingResponse> findByUser(UUID userId) {
        List<BookingResponse> responses = new ArrayList<>();
        for (Booking booking : store.values()) {
            if (booking.userId().equals(userId)) {
                responses.add(toResponse(booking));
            }
        }
        return responses;
    }

    private BookingResponse toResponse(Booking booking) {
        return new BookingResponse(
                booking.id(),
                booking.propertyId(),
                booking.unitId(),
                booking.userId(),
                booking.checkIn(),
                booking.checkOut(),
                booking.status(),
                booking.paymentStatus(),
                booking.createdAt()
        );
    }
}
