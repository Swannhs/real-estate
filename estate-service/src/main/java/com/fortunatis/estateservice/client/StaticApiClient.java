package com.fortunatis.estateservice.client;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;

import static com.fortunatis.estateservice.utils.ApplicationConstants.STATIC_API_URL;

@Component
@RequiredArgsConstructor
public class StaticApiClient {
    private final WebClient webClient;

    public StaticApiClient() {
        this.webClient = WebClient.builder()
                .baseUrl(STATIC_API_URL)
                .build();
    }

    public WebClient getClient() {
        return webClient;
    }
}
