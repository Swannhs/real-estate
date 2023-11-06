package com.fortunatis.staticservice.controller;

import com.fortunatis.staticservice.sevices.StaticDataService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static com.fortunatis.staticservice.util.Constants.BASE_URL_PREFIX;

@RestController
@RequestMapping(BASE_URL_PREFIX + "/api/v1/static")
@RequiredArgsConstructor
public class StaticDataController {
    private final StaticDataService staticDataService;

    @GetMapping("/features")
    @Operation(summary = "Get all public features")
    public ResponseEntity<?> getPublicFeatures() {
        return ResponseEntity.ok(staticDataService.getPublicFeatures());
    }
}
