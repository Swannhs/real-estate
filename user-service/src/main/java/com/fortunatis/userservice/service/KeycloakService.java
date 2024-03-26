package com.fortunatis.userservice.service;

import com.fortunatis.userservice.enums.UserRole;
import com.fortunatis.userservice.pojo.request.KeycloakCreateUserRequestDto;
import com.fortunatis.userservice.pojo.request.KeycloakUpdateUserRequestDto;
import com.fortunatis.userservice.pojo.request.KeycloakUserCredentialsRequestDto;
import com.fortunatis.userservice.pojo.response.KeycloakClientResponse;
import com.fortunatis.userservice.pojo.response.KeycloakUserDetailsResponseDto;
import com.fortunatis.userservice.pojo.response.KeycloakUserRoleResponseDto;

import java.util.List;
import java.util.UUID;

public interface KeycloakService {
    List<KeycloakUserDetailsResponseDto> getAllKeycloakUsers();
    KeycloakUserDetailsResponseDto getKeycloakUserByEmail(String email);
    KeycloakUserDetailsResponseDto getKeycloakUserById(UUID userId);
    void createKeycloakUser(KeycloakCreateUserRequestDto keycloakCreateUserRequestDto);
    void updateKeycloakUser(UUID userId, KeycloakUpdateUserRequestDto keycloakUpdateUserRequestDto);
    void createKeycloakUserPassword(KeycloakUserCredentialsRequestDto keycloakUserCredentialsRequestDto, UUID userId);
    void assignUserRoleByUserIdAndRoleId(UUID userId, UserRole userRole);
    List<KeycloakUserRoleResponseDto> getKeycloakUserRoles();
    UUID getKeycloakUserRoleByName(UserRole roleName);
    List<KeycloakClientResponse> getKeycloakClients();
    KeycloakClientResponse getKeycloakClientById(String clientId);
}
