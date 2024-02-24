package com.fortunatis.estateservice.controller;

import com.fortunatis.estateservice.pojo.request.EstateSearchDto;
import com.fortunatis.estateservice.service.EstateService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

import static com.fortunatis.estateservice.utils.ApplicationConstants.PUBLIC_URL_PREFIX;

@RestController
@RequestMapping(PUBLIC_URL_PREFIX + "/v1/estates")
@RequiredArgsConstructor
@Tag(name = "Public Estate Controller", description = "Public Rest API for Estate")
public class PublicEstateController {
    private final EstateService estateService;

    @GetMapping("/{id}")
    @Operation(summary = "Get estate by uuid")
    public ResponseEntity<?> getEstateById(@PathVariable UUID id) {
        return ResponseEntity.ok(estateService.getEstateById(id));
    }

    @GetMapping("/search")
    @Operation(summary = "Search estate")
    public ResponseEntity<?> searchEstate(@RequestBody EstateSearchDto estateSearchDto) {
        return ResponseEntity.ok(estateService.searchEstateProperties(estateSearchDto));
    }

    @GetMapping("/recent-listings")
    @Operation(summary = "Get recent listings")
    public ResponseEntity<?> getRecentListings(@RequestParam(name = "limit", required = false, defaultValue = "8") Integer limit) {
        return ResponseEntity.ok(estateService.getRecentListings(limit));
    }
}
