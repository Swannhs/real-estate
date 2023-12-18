package com.fortunatis.staticservice.controller;

import com.fortunatis.staticservice.pojo.request.admin.cookie_policy.CookiePolicyRequestDto;
import com.fortunatis.staticservice.sevices.CookiePolicyService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/static/manage/cookie-policy")
@RequiredArgsConstructor
@Tag(name = "Cookie Policy", description = "Manage Cookie Policy")
public class CookiePolicyController {
    private final CookiePolicyService cookiePolicyService;

    @GetMapping
    @Operation(summary = "Get Cookie Policy")
    public ResponseEntity<?> getCookiePolicy() {
        return ResponseEntity.ok(cookiePolicyService.getCookiePolicy());
    }

    @PutMapping("/update")
    @Operation(summary = "Update Cookie Policy")
    public ResponseEntity<?> updateCookiePolicy(@RequestBody @Valid CookiePolicyRequestDto cookiePolicyRequestDto) {
        return ResponseEntity.ok(cookiePolicyService.updateCookiePolicy(cookiePolicyRequestDto));
    }
}
