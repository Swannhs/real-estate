package com.fortunatis.userservice.controller;

import com.fortunatis.userservice.service.KeycloakService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
@Tag(name = "User", description = "User controller")
public class UserController {
    private final KeycloakService keycloakService;

    @GetMapping
    @Operation(summary = "Get all users")
    public ResponseEntity<?> getAllUsers() {
        return ResponseEntity.ok(keycloakService.getAllUsers());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get user by id")
    public ResponseEntity<?> getUserById(@PathVariable UUID id) {
        return ResponseEntity.ok(keycloakService.getUserById(id));
    }

//    @PostMapping
//    @Operation(summary = "Create user")
//    public ResponseEntity<?> createUser(@RequestBody KeycloakCreateUserRequestDto keycloakCreateUserRequestDto) {
//        return ResponseEntity.ok(keycloakService.createUser(keycloakCreateUserRequestDto));
//    }
}
