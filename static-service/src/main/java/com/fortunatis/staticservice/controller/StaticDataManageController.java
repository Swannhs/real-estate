package com.fortunatis.staticservice.controller;

import com.fortunatis.staticservice.sevices.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/static/manage")
@RequiredArgsConstructor
@Tag(name = "Static Data Setting", description = "Manage static data setting")
public class StaticDataManageController {
    private final UserService userService;

    @GetMapping
    @Operation(summary = "Get all public static data")
    public ResponseEntity<?> getPublicStaticData() {
        return ResponseEntity.ok(userService.getUserId());
    }
}
