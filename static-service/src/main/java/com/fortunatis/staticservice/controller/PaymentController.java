package com.fortunatis.staticservice.controller;

import com.fortunatis.staticservice.pojo.request.admin.payment.PaymentTagRequestDto;
import com.fortunatis.staticservice.pojo.request.admin.payment.PaymentFeatureRequestDto;
import com.fortunatis.staticservice.pojo.request.admin.payment.PaymentPackageRequestDto;
import com.fortunatis.staticservice.sevices.PaymentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/${spring.application.api-prefix}/manage/payment")
@RequiredArgsConstructor
@Tag(name = "Payment Setting", description = "Manage Payment setting")
public class PaymentController {
    private final PaymentService paymentService;

    @GetMapping("/package/{paymentPackageId}")
    @Operation(summary = "Get payment package by id", responses = {@ApiResponse(responseCode = "200", description = "Success", content = {@Content(schema = @Schema(implementation = PaymentPackageRequestDto.class))})})
    public ResponseEntity<?> getPaymentPackageById(@PathVariable UUID paymentPackageId) {
        return ResponseEntity.ok(paymentService.getPaymentPackageById(paymentPackageId));
    }

    @GetMapping("/packages")
    @Operation(summary = "Get all payment packages", responses = {@ApiResponse(responseCode = "200", description = "Success", content = {@Content(schema = @Schema(implementation = PaymentPackageRequestDto.class))})})
    public ResponseEntity<?> getPaymentPackages() {
        return ResponseEntity.ok(paymentService.getPaymentPackages());
    }

    @PostMapping("/package")
    @Operation(summary = "Create payment package", responses = {@ApiResponse(responseCode = "200", description = "Success", content = {@Content(schema = @Schema(implementation = PaymentPackageRequestDto.class))})})
    public ResponseEntity<?> createPaymentPackage(@Valid @RequestBody PaymentPackageRequestDto paymentPackageRequestDto) {
        return ResponseEntity.ok(paymentService.createPaymentPackage(paymentPackageRequestDto));
    }

    @PutMapping("/package/{paymentPackageId}")
    @Operation(summary = "Update payment package", responses = {@ApiResponse(responseCode = "200", description = "Success", content = {@Content(schema = @Schema(implementation = PaymentPackageRequestDto.class))})})
    public ResponseEntity<?> updatePaymentPackage(@PathVariable UUID paymentPackageId, @Valid @RequestBody PaymentPackageRequestDto paymentPackageRequestDto) {
        return ResponseEntity.ok(paymentService.updatePaymentPackage(paymentPackageId, paymentPackageRequestDto));
    }

    @GetMapping("/feature/{paymentFeatureId}")
    @Operation(summary = "Get payment feature by id", responses = {@ApiResponse(responseCode = "200", description = "Success", content = {@Content(schema = @Schema(implementation = PaymentFeatureRequestDto.class))})})
    public ResponseEntity<?> getPaymentFeatureById(@PathVariable UUID paymentFeatureId) {
        return ResponseEntity.ok(paymentService.getPaymentFeature(paymentFeatureId));
    }

    @GetMapping("/features")
    @Operation(summary = "Get all payment features", responses = {@ApiResponse(responseCode = "200", description = "Success", content = {@Content(schema = @Schema(implementation = PaymentFeatureRequestDto.class))})})
    public ResponseEntity<?> getPaymentFeatures() {
        return ResponseEntity.ok(paymentService.getPaymentFeatures());
    }

    @PostMapping("/feature")
    @Operation(summary = "Create payment feature", responses = {@ApiResponse(responseCode = "200", description = "Success", content = {@Content(schema = @Schema(implementation = PaymentFeatureRequestDto.class))})})
    public ResponseEntity<?> createPaymentFeature(@Valid @RequestBody PaymentFeatureRequestDto paymentFeaturesRequestDto) {
        return ResponseEntity.ok(paymentService.createPaymentFeature(paymentFeaturesRequestDto));
    }

    @PutMapping("/feature/{paymentFeatureId}")
    @Operation(summary = "Update payment feature", responses = {@ApiResponse(responseCode = "200", description = "Success", content = {@Content(schema = @Schema(implementation = PaymentFeatureRequestDto.class))})})
    public ResponseEntity<?> updatePaymentFeature(@PathVariable UUID paymentFeatureId, @Valid @RequestBody PaymentFeatureRequestDto paymentFeaturesRequestDto) {
        return ResponseEntity.ok(paymentService.updatePaymentFeature(paymentFeatureId, paymentFeaturesRequestDto));
    }

    @GetMapping("/tag/{paymentTagId}")
    @Operation(summary = "Get payment tag by id", responses = {@ApiResponse(responseCode = "200", description = "Success", content = {@Content(schema = @Schema(implementation = PaymentTagRequestDto.class))})})
    public ResponseEntity<?> getPaymentTagById(@PathVariable UUID paymentTagId) {
        return ResponseEntity.ok(paymentService.getPaymentTag(paymentTagId));
    }

    @GetMapping("/tags")
    @Operation(summary = "Get all payment tags", responses = {@ApiResponse(responseCode = "200", description = "Success", content = {@Content(schema = @Schema(implementation = PaymentTagRequestDto.class))})})
    public ResponseEntity<?> getPaymentTags() {
        return ResponseEntity.ok(paymentService.getPaymentTags());
    }

    @PostMapping("/tag")
    @Operation(summary = "Create payment tag", responses = {@ApiResponse(responseCode = "200", description = "Success", content = {@Content(schema = @Schema(implementation = PaymentTagRequestDto.class))})})
    public ResponseEntity<?> createPaymentTag(@Valid @RequestBody PaymentTagRequestDto paymentTagRequestDto) {
        return ResponseEntity.ok(paymentService.createPaymentTag(paymentTagRequestDto));
    }

    @PutMapping("/tag/{paymentTagId}")
    @Operation(summary = "Update payment tag", responses = {@ApiResponse(responseCode = "200", description = "Success", content = {@Content(schema = @Schema(implementation = PaymentTagRequestDto.class))})})
    public ResponseEntity<?> updatePaymentTag(@PathVariable UUID paymentTagId, @Valid @RequestBody PaymentTagRequestDto paymentTagRequestDto) {
        return ResponseEntity.ok(paymentService.updatePaymentTag(paymentTagId, paymentTagRequestDto));
    }
}
