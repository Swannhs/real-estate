package com.fortunatis.estateservice.controller;

import com.fortunatis.estateservice.pojo.request.EstateAddDto;
import com.fortunatis.estateservice.service.EstateService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/v1/estates")
@RequiredArgsConstructor
@Tag(name = "Estate Controller", description = "estate controller")
@Slf4j
public class EstateController {
    private final EstateService estateService;

    @GetMapping
    @Operation(summary = "Get all estates by user")
    public ResponseEntity<?> getAllEstatesByUser(
            @RequestParam(name = "page", required = false, defaultValue = "1") Integer page,
            @RequestParam(name = "size", required = false, defaultValue = "10") Integer size,
            @RequestParam(name = "orderBy", required = false, defaultValue = "createdAt") String orderBy,
            @RequestParam(name = "desc", required = false, defaultValue = "desc") String desc
    ) {
        return ResponseEntity.ok(estateService.getAllEstatesByUser(page, size > 50 ? 50 : size, orderBy, desc));
    }

    @PostMapping
    @Operation(summary = "Create estate")
    public ResponseEntity<?> createEstate(@RequestBody EstateAddDto estateAddDto) {
        return ResponseEntity.ok(estateService.createEstate(estateAddDto));
    }

    @PutMapping(value = "/{id}")
    @Operation(summary = "Update estate")
    public ResponseEntity<?> updateEstate(@PathVariable UUID id, @RequestBody EstateAddDto estateAddDto) {
        return ResponseEntity.ok(estateService.updateEstate(estateAddDto, id));
    }

    @DeleteMapping(value = "/{id}")
    @Operation(summary = "Delete estate")
    public ResponseEntity<?> deleteEstate(@PathVariable UUID id) {
        return ResponseEntity.ok(estateService.deleteEstate(id));
    }
}
