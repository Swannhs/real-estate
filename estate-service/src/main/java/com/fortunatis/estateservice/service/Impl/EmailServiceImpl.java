package com.fortunatis.estateservice.service.Impl;

import com.fortunatis.estateservice.client.EmailApiClient;
import com.fortunatis.estateservice.service.EmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class EmailServiceImpl implements EmailService {
    private final EmailApiClient emailApiClient;

    @Override
    public String testEmailApi() {
        return emailApiClient.getClient()
                .get()
                .uri("/api/test")
                .retrieve()
                .bodyToMono(String.class)
                .block();
    }
}
