package com.fortunatis.estateservice.client;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;

import static com.fortunatis.estateservice.utils.ApplicationConstants.USER_API_URL;

@Component
@RequiredArgsConstructor
public class UserApiClient {
    private final WebClient webClient;

    public UserApiClient() {
        this.webClient = WebClient.builder()
                .baseUrl(USER_API_URL)
                .build();
    }

    public WebClient getClient() {
        return webClient;
    }
}
