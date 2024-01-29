package com.fortunatis.estateservice.client;

import com.fortunatis.estateservice.pojo.response.keycloak.KeycloakTokenResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.reactive.function.client.WebClient;

@Component
@RequiredArgsConstructor
public class EmailApiClient {
    @Value("${service.param.keycloak-service.token-url}")
    private String keycloakTokenUrl;
    @Value("${service.param.keycloak-service.client-id}")
    private String keycloakClientId;
    @Value("${service.param.keycloak-service.client-secret}")
    private String keycloakClientSecret;
    @Value("${service.param.email-service.base-url}")
    private String emailServiceBaseUrl;

    public WebClient getClient() {
        return WebClient.builder()
                .baseUrl(emailServiceBaseUrl)
                .defaultHeader("Authorization", "Bearer " + generateKeycloakClientToken().getAccessToken())
                .defaultHeader("Content-Type", "application/json")
                .build();
    }

    private KeycloakTokenResponseDto generateKeycloakClientToken() {
        MultiValueMap<String, String> formData = new LinkedMultiValueMap<>();
        formData.add("grant_type", "client_credentials");
        formData.add("client_id", keycloakClientId);
        formData.add("client_secret", keycloakClientSecret);

        return getClient()
                .post()
                .uri(keycloakTokenUrl)
                .contentType(MediaType.APPLICATION_FORM_URLENCODED)
                .bodyValue(formData)
                .retrieve()
                .bodyToMono(KeycloakTokenResponseDto.class)
                .block();
    }
}
