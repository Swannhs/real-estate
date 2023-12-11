package com.fortunatis.userservice.client;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;

@Component
@RequiredArgsConstructor
public class KeycloakApiClient {
    private final WebClient webClient;

    public KeycloakApiClient() {
        this.webClient = WebClient.builder()
                .baseUrl("http://localhost:8080")
                .build();
    }

    public WebClient getClient() {
        return webClient;
    }
}
