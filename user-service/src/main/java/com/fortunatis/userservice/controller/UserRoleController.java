package com.fortunatis.userservice.controller;

import com.fortunatis.userservice.service.KeycloakService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/user-role")
@RequiredArgsConstructor
@Tag(name = "Role", description = "User role controller")
public class UserRoleController {
    private final KeycloakService keycloakService;

    @GetMapping
    @Operation(summary = "Get user roles")
    public ResponseEntity<?> getUserRoles() {
        return ResponseEntity.ok(keycloakService.getKeycloakUserRoles());
    }
}
