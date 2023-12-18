package com.fortunatis.estateservice.controller;

import com.fortunatis.estateservice.client.StaticApiClient;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static com.fortunatis.estateservice.util.ApplicationConstants.PUBLIC_URL_PREFIX;

@RestController
@RequestMapping(PUBLIC_URL_PREFIX + "/v1/estates")
@RequiredArgsConstructor
@Tag(name = "Test controller", description = "Test controller")
public class TestController {
    private final StaticApiClient staticApiClient;

    @GetMapping("/test")
    public ResponseEntity<?> test() {
        return staticApiClient.getClient()
                .get()
                .uri("/privacy-policy")
                .retrieve()
                .toEntity(String.class).block();
    }
}
