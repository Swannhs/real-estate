package com.fortunatis.userservice.controller;

import com.fortunatis.userservice.enums.UserRole;
import com.fortunatis.userservice.pojo.request.KeycloakCreateUserRequestDto;
import com.fortunatis.userservice.pojo.request.KeycloakUserCredentialsRequestDto;
import com.fortunatis.userservice.pojo.response.KeycloakUserDetailsResponseDto;
import com.fortunatis.userservice.service.KeycloakService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("public/api/v1/test")
@RequiredArgsConstructor
@Tag(name = "Test", description = "Test controller")
public class TestController {
    private final KeycloakService keycloakService;
    @Value("${spring.profiles.active}")
    private String profile;

    @GetMapping
    @Operation(summary = "Test endpoint")
    public ResponseEntity<?> test() {
        List<KeycloakUserDetailsResponseDto> allUsers = keycloakService.getAllKeycloakUsers();
        List<UUID> userIds = allUsers.stream().map(KeycloakUserDetailsResponseDto::getId).toList();
        return ResponseEntity.ok(userIds);
    }

    @GetMapping("/keycloak/users")
    @Operation(summary = "Test keycloak endpoint")
    public ResponseEntity<?> testKeycloak() {
        return ResponseEntity.ok(keycloakService.getKeycloakUserRoles());
    }

    @GetMapping("/keycloak/user")
    @Operation(summary = "Create keycloak user")
    public ResponseEntity<?> createKeycloakUser() {
        KeycloakUserDetailsResponseDto keycloakUserByEmail = keycloakService.getKeycloakUserByEmail("alan@fortunatis.ch");
        KeycloakUserCredentialsRequestDto password = new KeycloakUserCredentialsRequestDto();
        password.setValue("alan");
        password.setTemporary(false);
        password.setType("password");
        keycloakService.createKeycloakUserPassword(password, keycloakUserByEmail.getId());
        return ResponseEntity.ok(keycloakUserByEmail);
    }

    @GetMapping("/keycloak/user/{userId}/assign/role")
    @Operation(summary = "Assign role to keycloak user")
    public ResponseEntity<?> assignRoleToKeycloakUser(@PathVariable UUID userId) {
        keycloakService.assignUserRoleByUserIdAndRoleId(userId, UserRole.USER);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/keycloak/user/{userEmail}")
    @Operation(summary = "Get keycloak user")
    public ResponseEntity<?> getKeycloakUser(@PathVariable String userEmail) {
        return ResponseEntity.ok(keycloakService.getKeycloakUserByEmail(userEmail));
    }
}
