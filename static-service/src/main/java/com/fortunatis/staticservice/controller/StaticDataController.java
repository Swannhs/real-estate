package com.fortunatis.staticservice.controller;

import com.fortunatis.staticservice.sevices.StaticDataService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

import static com.fortunatis.staticservice.util.Constants.PUBLIC_URL_PREFIX;

@RestController
@RequestMapping(PUBLIC_URL_PREFIX + "/api/v1/static")
@RequiredArgsConstructor
@Tag(name = "Public Static Data", description = "Public Static Data Resources")
public class StaticDataController {
    private final StaticDataService staticDataService;

    @GetMapping("/features")
    @Operation(summary = "Get all public features")
    public ResponseEntity<?> getPublicFeatures() {
        return ResponseEntity.ok(staticDataService.getPublicFeatures());
    }

    @GetMapping("/payment-packages")
    @Operation(summary = "Get all public payment packages")
    public ResponseEntity<?> getPublicPaymentPackages() {
        return ResponseEntity.ok(staticDataService.getPublicPaymentPackages());
    }

    @GetMapping("/payment-package/{id}")
    @Operation(summary = "Get public payment package by id")
    public ResponseEntity<?> getPublicPaymentPackage(@PathVariable UUID id) {
        return ResponseEntity.ok(staticDataService.getPublicPaymentPackage(id));
    }

    @GetMapping("/countries")
    @Operation(summary = "Get all public countries")
    public ResponseEntity<?> getPublicCountries() {
        return ResponseEntity.ok(staticDataService.getPublicCountries());
    }

    @GetMapping("/country/{id}")
    @Operation(summary = "Get public country by id")
    public ResponseEntity<?> getPublicCountry(@PathVariable Long id) {
        return ResponseEntity.ok(staticDataService.getPublicCountry(id));
    }

    @GetMapping("/estate-advertising-types")
    @Operation(summary = "Get all public estate advertising types")
    public ResponseEntity<?> getPublicEstateAdvertisingTypes() {
        return ResponseEntity.ok(staticDataService.getPublicEstateAdvertisingTypes());
    }

    @GetMapping("/estate-category-types")
    @Operation(summary = "Get all public estate category types")
    public ResponseEntity<?> getPublicEstateCategoryTypes() {
        return ResponseEntity.ok(staticDataService.getPublicEstateCategoryTypes());
    }

    @GetMapping("/cookie-policy")
    @Operation(summary = "Get cookie policy")
    public ResponseEntity<?> getCookiePolicy() {
        return ResponseEntity.ok(staticDataService.getCookiePolicy());
    }

    @GetMapping("/privacy-policy")
    @Operation(summary = "Get privacy policy")
    public ResponseEntity<?> getPrivacyPolicy() {
        return ResponseEntity.ok(staticDataService.getPrivacyPolicy());
    }

    @GetMapping("/legal-notice")
    @Operation(summary = "Get legal notice")
    public ResponseEntity<?> getLegalNotice() {
        return ResponseEntity.ok(staticDataService.getLegalNotice());
    }

    @GetMapping("/general-terms-and-conditions")
    @Operation(summary = "Get general terms and conditions")
    public ResponseEntity<?> getGeneralTermsAndConditions() {
        return ResponseEntity.ok(staticDataService.getGeneralTermsAndConditions());
    }
}
