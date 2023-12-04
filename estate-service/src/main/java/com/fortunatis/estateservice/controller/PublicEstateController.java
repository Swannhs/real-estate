package com.fortunatis.estateservice.controller;

import com.fortunatis.estateservice.pojo.request.EstateSearchDto;
import com.fortunatis.estateservice.service.EstateService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

import static com.fortunatis.estateservice.util.ApplicationConstants.PUBLIC_URL_PREFIX;

@RestController
@RequestMapping(PUBLIC_URL_PREFIX + "/v1/estates")
@RequiredArgsConstructor
@Tag(name = "Public Estate Controller", description = "Public estate controller")
@Slf4j
public class PublicEstateController {
    private final EstateService estateService;

    @GetMapping("/{id}")
    @Operation(summary = "Get estate by uuid")
    public ResponseEntity<?> getEstateById(@PathVariable UUID id) {
        return ResponseEntity.ok(estateService.getEstateById(id));
    }

    @PostMapping("/search")
    @Operation(summary = "Search estate")
    public ResponseEntity<?> searchEstate(@RequestBody EstateSearchDto estateSearchDto) {
        return ResponseEntity.ok(estateService.searchEstateProperties(estateSearchDto));
    }
}
