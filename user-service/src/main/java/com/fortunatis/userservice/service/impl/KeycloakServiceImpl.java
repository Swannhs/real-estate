package com.fortunatis.userservice.service.impl;

import com.fortunatis.userservice.client.KeycloakApiClient;
import com.fortunatis.userservice.enums.UserRole;
import com.fortunatis.userservice.pojo.request.KeycloakCreateUserRequestDto;
import com.fortunatis.userservice.pojo.request.KeycloakUpdateUserRequestDto;
import com.fortunatis.userservice.pojo.request.KeycloakUserCredentialsRequestDto;
import com.fortunatis.userservice.pojo.response.KeycloakClientAuthResponseDto;
import com.fortunatis.userservice.pojo.response.KeycloakClientResponse;
import com.fortunatis.userservice.pojo.response.KeycloakUserDetailsResponseDto;
import com.fortunatis.userservice.pojo.response.KeycloakUserRoleResponseDto;
import com.fortunatis.userservice.service.KeycloakService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class KeycloakServiceImpl implements KeycloakService {
    @Value("${service.param.keycloak.realm}")
    private String realm;
    @Value("${service.param.keycloak.client-id}")
    private String clientId;
    @Value("${service.param.keycloak.client-secret}")
    private String clientSecret;
    @Value("${service.param.keycloak.grant-type}")
    private String grantType;
    private final KeycloakApiClient keycloakApiClient;

    private KeycloakClientAuthResponseDto getClientAuth() {
        MultiValueMap<String, String> requestBody = new LinkedMultiValueMap<>();
        requestBody.add("grant_type", grantType);
        requestBody.add("client_id", clientId);
        requestBody.add("client_secret", clientSecret);

        return keycloakApiClient.getClient()
                .post()
                .uri("/realms/" + realm + "/protocol/openid-connect/token")
                .contentType(MediaType.APPLICATION_FORM_URLENCODED)
                .bodyValue(requestBody)
                .retrieve()
                .bodyToMono(KeycloakClientAuthResponseDto.class)
                .block();
    }

    public List<KeycloakUserDetailsResponseDto> getAllKeycloakUsers() {
        return keycloakApiClient.getClient()
                .get()
                .uri("/admin/realms/{realm}/users", realm)
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + getClientAuth().getAccessToken())
                .retrieve()
                .bodyToFlux(KeycloakUserDetailsResponseDto.class)
                .collectList()
                .block();
    }

    public KeycloakUserDetailsResponseDto getKeycloakUserByEmail(String email) {
        List<KeycloakUserDetailsResponseDto> keycloakUsers = keycloakApiClient.getClient()
                .get()
                .uri("/admin/realms/{realm}/users?email={email}", realm, email)
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + getClientAuth().getAccessToken())
                .retrieve()
                .bodyToFlux(KeycloakUserDetailsResponseDto.class)
                .collectList()
                .block();
        assert keycloakUsers != null;
        return keycloakUsers.isEmpty() ? null : keycloakUsers.get(0);
    }

    @Override
    public KeycloakUserDetailsResponseDto getKeycloakUserById(UUID userId) {
        return keycloakApiClient.getClient()
                .get()
                .uri("/admin/realms/{realm}/users/{userId}", realm, userId)
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + getClientAuth().getAccessToken())
                .retrieve()
                .bodyToMono(KeycloakUserDetailsResponseDto.class)
                .block();
    }

    @Override
    public void createKeycloakUser(KeycloakCreateUserRequestDto keycloakCreateUserRequestDto) {
        try {
            keycloakApiClient.getClient()
                    .post()
                    .uri("/admin/realms/{realm}/users", realm)
                    .header(HttpHeaders.AUTHORIZATION, "Bearer " + getClientAuth().getAccessToken())
                    .contentType(MediaType.APPLICATION_JSON)
                    .bodyValue(keycloakCreateUserRequestDto)
                    .retrieve()
                    .toBodilessEntity()
                    .block();
        } catch (Exception e) {
            log.error("Error creating user in keycloak", e);
            throw new RuntimeException("Failed to create user");
        }
    }

    @Override
    public void updateKeycloakUser(UUID userId, KeycloakUpdateUserRequestDto keycloakUpdateUserRequestDto) {
        keycloakApiClient.getClient()
                .put()
                .uri("/admin/realms/{realm}/users/{userId}", realm, userId)
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + getClientAuth().getAccessToken())
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(keycloakUpdateUserRequestDto)
                .retrieve()
                .bodyToMono(KeycloakUserDetailsResponseDto.class)
                .block();
    }

    @Override
    public void createKeycloakUserPassword(KeycloakUserCredentialsRequestDto keycloakUserCredentialsRequestDto, UUID userId) {
        try {
            keycloakApiClient.getClient()
                    .put()
                    .uri("/admin/realms/{realm}/users/{userId}/reset-password", realm, userId)
                    .header(HttpHeaders.AUTHORIZATION, "Bearer " + getClientAuth().getAccessToken())
                    .contentType(MediaType.APPLICATION_JSON)
                    .bodyValue(keycloakUserCredentialsRequestDto)
                    .retrieve()
                    .toBodilessEntity()
                    .block();
        } catch (Exception e) {
            log.error("Error creating password for user in keycloak", e);
            throw new RuntimeException("Failed to create user password");
        }
    }

    @Override
    public void assignUserRoleByUserIdAndRoleId(UUID userId, UserRole role) {
        try {
            List<KeycloakUserRoleResponseDto> keycloakUserRoles = getKeycloakUserRoles();
            KeycloakUserRoleResponseDto userRole = keycloakUserRoles.stream()
                    .filter(r -> r.getName().equals(role.toString()))
                    .findFirst()
                    .orElseThrow(() -> new RuntimeException("Role not found"));

            keycloakApiClient.getClient()
                    .post()
                    .uri("/admin/realms/{realm}/users/{userId}/role-mappings/realm", realm, userId)
                    .header(HttpHeaders.AUTHORIZATION, "Bearer " + getClientAuth().getAccessToken())
                    .contentType(MediaType.APPLICATION_JSON)
                    .bodyValue(
                            List.of(Map.of(
                                    "id", userRole.getId(),
                                    "name", userRole.getName(),
                                    "description", userRole.getDescription(),
                                    "composite", userRole.getComposite(),
                                    "clientRole", userRole.getClientRole(),
                                    "containerId", userRole.getContainerId()
                            ))
                    )
                    .retrieve()
                    .toBodilessEntity()
                    .block();
        } catch (Exception e) {
            log.error("Error assigning role to user in Keycloak", e);
            throw new RuntimeException("Failed to assign role to user");
        }
    }


    @Override
    public List<KeycloakUserRoleResponseDto> getKeycloakUserRoles() {
        return keycloakApiClient.getClient()
                .get()
                .uri("/admin/realms/{realm}/roles", realm, clientId)
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + getClientAuth().getAccessToken())
                .retrieve()
                .bodyToFlux(KeycloakUserRoleResponseDto.class)
                .collectList()
                .block();
    }

    @Override
    public List<KeycloakClientResponse> getKeycloakClients() {
        return keycloakApiClient.getClient()
                .get()
                .uri("/admin/realms/{realm}/clients", realm)
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + getClientAuth().getAccessToken())
                .retrieve()
                .bodyToFlux(KeycloakClientResponse.class)
                .collectList()
                .block();
    }

    @Override
    public KeycloakClientResponse getKeycloakClientById(String clientId) {
        List<KeycloakClientResponse> keycloakClients = keycloakApiClient.getClient()
                .get()
                .uri("/admin/realms/{realm}/clients?{clientId}", realm, clientId)
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + getClientAuth().getAccessToken())
                .retrieve()
                .bodyToFlux(KeycloakClientResponse.class)
                .collectList()
                .block();
        assert keycloakClients != null;
        return keycloakClients.isEmpty() ? null : keycloakClients.get(0);
    }

    @Override
    public UUID getKeycloakUserRoleByName(UserRole roleName) {
        List<KeycloakUserRoleResponseDto> keycloakUserRoles = getKeycloakUserRoles();
        return keycloakUserRoles.stream()
                .filter(role -> role.getName().equals(roleName.toString()))
                .map(role -> UUID.fromString(role.getId()))
                .findFirst()
                .orElse(null);
    }
}
