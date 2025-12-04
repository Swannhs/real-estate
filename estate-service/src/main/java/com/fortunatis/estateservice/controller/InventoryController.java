package com.fortunatis.estateservice.controller;

import com.fortunatis.estateservice.pojo.request.inventory.PropertyCreateRequest;
import com.fortunatis.estateservice.service.inventory.InventoryService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/v1/properties")
@RequiredArgsConstructor
@Tag(name = "Inventory Controller", description = "Owner-facing API for managing properties and units")
public class InventoryController {

    private final InventoryService inventoryService;

    @PostMapping
    @Operation(summary = "Create a property with units")
    public ResponseEntity<?> createProperty(@RequestBody PropertyCreateRequest request) {
        return ResponseEntity.ok(inventoryService.createProperty(request));
    }

    @GetMapping("/{propertyId}")
    @Operation(summary = "Get property details by id")
    public ResponseEntity<?> getProperty(@PathVariable UUID propertyId) {
        return ResponseEntity.ok(inventoryService.getProperty(propertyId));
    }
}
