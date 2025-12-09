package com.fortunatis.bookingservice.controller;

import com.fortunatis.bookingservice.dto.BookingResponse;
import com.fortunatis.bookingservice.dto.CreateBookingRequest;
import com.fortunatis.bookingservice.service.BookingService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    private final BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @PostMapping
    public ResponseEntity<BookingResponse> create(@Valid @RequestBody CreateBookingRequest request) {
        BookingResponse response = bookingService.createBooking(request);
        return ResponseEntity.created(URI.create("/api/bookings/" + response.id())).body(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<BookingResponse> get(@PathVariable UUID id) {
        return bookingService.getById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping
    public List<BookingResponse> listByUser(@RequestParam("userId") UUID userId) {
        return bookingService.findByUser(userId);
    }
}
