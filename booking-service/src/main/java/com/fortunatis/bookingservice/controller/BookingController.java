package com.fortunatis.bookingservice.controller;

import com.fortunatis.bookingservice.model.Booking;
import com.fortunatis.bookingservice.service.BookingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/bookings")
@RequiredArgsConstructor
public class BookingController {

    private final BookingService bookingService;

    @PostMapping
    public ResponseEntity<Booking> createBooking(@RequestBody Booking booking) {
        return ResponseEntity.ok(bookingService.createBooking(booking));
    }

    @GetMapping("/estate/{estateId}")
    public ResponseEntity<List<Booking>> getBookingsByEstate(@PathVariable UUID estateId) {
        return ResponseEntity.ok(bookingService.getBookingsByEstateId(estateId));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Booking>> getBookingsByUser(@PathVariable UUID userId) {
        return ResponseEntity.ok(bookingService.getBookingsByUserId(userId));
    }
}
