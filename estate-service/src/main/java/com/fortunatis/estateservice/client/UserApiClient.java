package com.fortunatis.estateservice.client;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;

@Component
@RequiredArgsConstructor
public class UserApiClient {
    @Value("${service.param.user-service.base-url}")
    private String userServiceBaseUrl;

    public WebClient getClient() {
        return WebClient.builder()
                .baseUrl(userServiceBaseUrl)
                .build();
    }
}
