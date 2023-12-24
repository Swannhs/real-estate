package com.fortunatis.userservice.controller;

import com.fortunatis.userservice.pojo.response.KeycloakUserDetailsResponseDto;
import com.fortunatis.userservice.service.KeycloakService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("public/api/v1/test")
@RequiredArgsConstructor
@Tag(name = "Test", description = "Test controller")
public class TestController {
    private final KeycloakService keycloakService;

    @GetMapping
    @Operation(summary = "Test endpoint")
    public ResponseEntity<?> test() {
        List<KeycloakUserDetailsResponseDto> allUsers = keycloakService.getAllUsers();
        List<String> userIds = allUsers.stream().map(KeycloakUserDetailsResponseDto::getId).toList();
        return ResponseEntity.ok(userIds);
    }
}
