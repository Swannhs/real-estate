package com.fortunatis.estateservice.controller;

import com.fortunatis.estateservice.pojo.request.EstateAddDto;
import com.fortunatis.estateservice.service.EstateService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/v1/estates")
@RequiredArgsConstructor
@Tag(name = "Estate Controller", description = "estate controller")
@Slf4j
public class EstateController {
    private final EstateService estateService;

    @PostMapping
    @Operation(summary = "Create estate")
    public ResponseEntity<?> createEstate(@RequestBody EstateAddDto estateAddDto) {
        return ResponseEntity.ok(estateService.createEstate(estateAddDto));
    }
}
