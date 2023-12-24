package com.fortunatis.userservice.service.impl;

import com.fortunatis.userservice.client.KeycloakApiClient;
import com.fortunatis.userservice.pojo.request.KeycloakCreateUserRequestDto;
import com.fortunatis.userservice.pojo.response.KeycloakClientAuthResponseDto;
import com.fortunatis.userservice.pojo.response.KeycloakUserDetailsResponseDto;
import com.fortunatis.userservice.pojo.response.KeycloakUserRoleResponseDto;
import com.fortunatis.userservice.service.KeycloakService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
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

    public List<KeycloakUserDetailsResponseDto> getAllUsers() {
        return keycloakApiClient.getClient()
                .get()
                .uri("/admin/realms/{realm}/users", realm)
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + getClientAuth().getAccessToken())
                .retrieve()
                .bodyToFlux(KeycloakUserDetailsResponseDto.class)
                .collectList()
                .block();
    }

    @Override
    public KeycloakUserDetailsResponseDto getUserById(UUID userId) {
        return keycloakApiClient.getClient()
                .get()
                .uri("/admin/realms/{realm}/users/{userId}", realm, userId)
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + getClientAuth().getAccessToken())
                .retrieve()
                .bodyToMono(KeycloakUserDetailsResponseDto.class)
                .block();
    }

    @Override
    public void createUser(KeycloakCreateUserRequestDto keycloakCreateUserRequestDto) {
        keycloakApiClient.getClient()
                .post()
                .uri(uriBuilder -> uriBuilder
                        .path("/admin/realms/{realm}/users")
                        .build(realm)) // Set the realm in the URI path
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + getClientAuth().getAccessToken())
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(keycloakCreateUserRequestDto)
                .retrieve()
                .toBodilessEntity()
                .block();
    }

    @Override
    public List<KeycloakUserRoleResponseDto> getUserRoles() {
        return keycloakApiClient.getClient()
                .get()
                .uri("/admin/realms/{realm}/roles", realm, clientId)
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + getClientAuth().getAccessToken())
                .retrieve()
                .bodyToFlux(KeycloakUserRoleResponseDto.class)
                .collectList()
                .block();
    }
}
