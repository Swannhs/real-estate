package com.fortunatis.userservice.faker.user.service;

import com.fortunatis.userservice.enums.UserRole;
import com.fortunatis.userservice.pojo.request.KeycloakCreateUserRequestDto;
import com.fortunatis.userservice.pojo.request.KeycloakUserCredentialsRequestDto;

public interface SeederService {
    void createKeycloakUser(
            KeycloakCreateUserRequestDto keycloakCreateUserRequestDto,
            KeycloakUserCredentialsRequestDto keycloakUserCredentialsRequestDto,
            UserRole userRole
    );
}
