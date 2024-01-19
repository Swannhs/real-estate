package com.fortunatis.staticservice.controller;

import com.fortunatis.staticservice.pojo.request.admin.privacy_policy.PrivacyPolicyRequestDto;
import com.fortunatis.staticservice.sevices.PrivacyPolicyService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/${spring.application.api-prefix}/manage/privacy-policy")
@RequiredArgsConstructor
@Tag(name = "Privacy Policy Settings", description = "Manage privacy policy settings")
public class PrivacyPolicyController {
    private final PrivacyPolicyService privacyPolicyService;

    @GetMapping
    @Operation(summary = "Get Privacy Policy")
    public ResponseEntity<?> getPrivacyPolicy() {
        return ResponseEntity.ok(privacyPolicyService.getPrivacyPolicy());
    }

    @PutMapping(value = "/update")
    @Operation(summary = "Update Privacy Policy")
    public ResponseEntity<?> updatePrivacyPolicy(@RequestBody @Valid PrivacyPolicyRequestDto privacyPolicyRequestDto) {
        return ResponseEntity.ok(privacyPolicyService.updatePrivacyPolicy(privacyPolicyRequestDto));
    }
}
