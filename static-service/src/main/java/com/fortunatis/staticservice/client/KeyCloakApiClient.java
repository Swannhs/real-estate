package com.fortunatis.staticservice.client;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;

@Component
@RequiredArgsConstructor
public class KeyCloakApiClient {
    private final WebClient webClient;

    public WebClient getClient() {
        return webClient;
    }

    public WebClient getClient(String url) {
        return WebClient.builder()
                .baseUrl(url)
                .build();
    }
}
