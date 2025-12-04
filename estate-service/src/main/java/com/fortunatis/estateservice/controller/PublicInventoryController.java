package com.fortunatis.estateservice.controller;

import com.fortunatis.estateservice.pojo.request.inventory.BookingRequest;
import com.fortunatis.estateservice.pojo.request.inventory.InventorySearchRequest;
import com.fortunatis.estateservice.service.inventory.InventoryService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

import static com.fortunatis.estateservice.utils.ApplicationConstants.PUBLIC_URL_PREFIX;

@RestController
@RequestMapping(PUBLIC_URL_PREFIX + "/v1/properties")
@RequiredArgsConstructor
@Tag(name = "Public Inventory Controller", description = "Public API for browsing properties and booking")
public class PublicInventoryController {

    private final InventoryService inventoryService;

    @GetMapping
    @Operation(summary = "Search published properties with availability filters")
    public ResponseEntity<?> searchInventory(
            @RequestParam(required = false) String city,
            @RequestParam(required = false) String state,
            @RequestParam(required = false) String propertyType,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate checkIn,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate checkOut,
            @RequestParam(required = false) Integer guests
    ) {
        InventorySearchRequest request = new InventorySearchRequest();
        request.setCity(city);
        request.setState(state);
        request.setPropertyType(propertyType);
        request.setCheckIn(checkIn);
        request.setCheckOut(checkOut);
        request.setGuests(guests);
        return ResponseEntity.ok(inventoryService.searchInventory(request));
    }

    @PostMapping("/bookings")
    @Operation(summary = "Create a booking for a unit")
    public ResponseEntity<?> createBooking(@RequestBody BookingRequest request) {
        return ResponseEntity.ok(inventoryService.createBooking(request));
    }
}
