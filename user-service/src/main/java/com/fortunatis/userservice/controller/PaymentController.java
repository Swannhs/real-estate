package com.fortunatis.userservice.controller;

import com.fortunatis.userservice.service.PaymentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/payment")
@RequiredArgsConstructor
@Tag(name = "Payment", description = "Payment controller")
public class PaymentController {
    private final PaymentService paymentService;

    @GetMapping("/create-account")
    @Operation(summary = "Create payment account")
    public ResponseEntity<?> createAccount() {
        return ResponseEntity.ok(paymentService.createConnectAccount());
    }

    @GetMapping("/account-status")
    @Operation(summary = "Get payment account status")
    public ResponseEntity<?> getAccountStatus(@RequestParam("accountId") String accountId) {
        return ResponseEntity.ok(paymentService.getConnectAccount(accountId));
    }
}
