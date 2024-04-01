package com.fortunatis.userservice.faker.user.service.impl;

import com.fortunatis.userservice.enums.UserRole;
import com.fortunatis.userservice.faker.user.service.SeederService;
import com.fortunatis.userservice.pojo.request.KeycloakCreateUserRequestDto;
import com.fortunatis.userservice.pojo.request.KeycloakUserCredentialsRequestDto;
import com.fortunatis.userservice.pojo.response.KeycloakUserDetailsResponseDto;
import com.fortunatis.userservice.service.KeycloakService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class SeederServiceImpl implements SeederService {
    private final KeycloakService keycloakService;

    public void createKeycloakUser(
            KeycloakCreateUserRequestDto keycloakCreateUserRequestDto,
            KeycloakUserCredentialsRequestDto keycloakUserCredentialsRequestDto,
            UserRole userRole
    ) {
        keycloakService.createKeycloakUser(keycloakCreateUserRequestDto);
        KeycloakUserDetailsResponseDto keycloakUser = keycloakService.getKeycloakUserByEmail(keycloakCreateUserRequestDto.getEmail());
        keycloakService.assignUserRoleByUserIdAndRoleId(keycloakUser.getId(), userRole);
        keycloakService.createKeycloakUserPassword(keycloakUserCredentialsRequestDto, keycloakUser.getId());
        log.info("User created email: {} and role: {}", keycloakCreateUserRequestDto.getEmail(), userRole);
    }
}
