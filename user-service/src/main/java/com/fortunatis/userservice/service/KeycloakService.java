package com.fortunatis.userservice.service;

import com.fortunatis.userservice.pojo.KeycloakUserDetailsResponseDto;

import java.util.List;
import java.util.UUID;

public interface KeycloakService {
    List<KeycloakUserDetailsResponseDto> getAllUsers();
    KeycloakUserDetailsResponseDto getUserById(UUID userId);
}
