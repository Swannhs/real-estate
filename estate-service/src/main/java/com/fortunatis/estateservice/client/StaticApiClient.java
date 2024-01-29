package com.fortunatis.estateservice.client;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;

@Component
@RequiredArgsConstructor
public class StaticApiClient {
    @Value("${service.param.static-service.base-url}")
    private String staticServiceBaseUrl;

    public WebClient getClient() {
        return WebClient.builder()
                .baseUrl(staticServiceBaseUrl)
                .build();
    }
}
