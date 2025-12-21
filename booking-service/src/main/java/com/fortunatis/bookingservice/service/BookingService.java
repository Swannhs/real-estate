package com.fortunatis.bookingservice.service;

import com.fortunatis.bookingservice.model.Booking;
import com.fortunatis.bookingservice.repository.BookingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class BookingService {

    private final BookingRepository bookingRepository;

    public Booking createBooking(Booking booking) {
        // TODO: Add validation (check availability, check dates)
        return bookingRepository.save(booking);
    }

    public List<Booking> getBookingsByEstateId(UUID estateId) {
        return bookingRepository.findByEstateId(estateId);
    }

    public List<Booking> getBookingsByUserId(UUID userId) {
        return bookingRepository.findByUserId(userId);
    }
}
