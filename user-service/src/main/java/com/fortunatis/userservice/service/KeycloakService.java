package com.fortunatis.userservice.service;

import com.fortunatis.userservice.pojo.request.KeycloakCreateUserRequestDto;
import com.fortunatis.userservice.pojo.request.KeycloakUpdateUserRequestDto;
import com.fortunatis.userservice.pojo.response.KeycloakUserDetailsResponseDto;
import com.fortunatis.userservice.pojo.response.KeycloakUserRoleResponseDto;

import java.util.List;
import java.util.UUID;

public interface KeycloakService {
    List<KeycloakUserDetailsResponseDto> getAllUsers();
    KeycloakUserDetailsResponseDto getUserById(UUID userId);
    void createUser(KeycloakCreateUserRequestDto keycloakCreateUserRequestDto);
    void updateUser(UUID userId, KeycloakUpdateUserRequestDto keycloakUpdateUserRequestDto);
    List<KeycloakUserRoleResponseDto> getUserRoles();
}
