package com.fortunatis.staticservice.controller;

import com.fortunatis.staticservice.sevices.PrivacyPolicyService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/static/manage/privacy-policy")
@RequiredArgsConstructor
@Tag(name = "Privacy Policy Settings", description = "Manage privacy policy settings")
public class PrivacyPolicyController {
    private final PrivacyPolicyService privacyPolicyService;

    @GetMapping
    @Operation(summary = "Get Privacy Policy")
    public ResponseEntity<?> getPrivacyPolicy() {
        return ResponseEntity.ok(privacyPolicyService.getPrivacyPolicy());
    }
}
