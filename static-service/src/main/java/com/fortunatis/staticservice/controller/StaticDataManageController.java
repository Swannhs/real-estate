package com.fortunatis.staticservice.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/static/manage")
@RequiredArgsConstructor
@Tag(name = "Static Data", description = "Public Static Data Resources")
public class StaticDataManageController {
    @GetMapping
    @Operation(summary = "Get all public static data")
    public ResponseEntity<?> getPublicStaticData() {
        return ResponseEntity.ok("OK");
    }
}
