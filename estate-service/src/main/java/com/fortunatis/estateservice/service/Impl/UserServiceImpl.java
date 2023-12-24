package com.fortunatis.estateservice.service.Impl;

import com.fortunatis.estateservice.client.UserApiClient;
import com.fortunatis.estateservice.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserApiClient userApiClient;

    @Override
    public UUID getUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return UUID.fromString(authentication.getName());
    }

    @Override
    public List<UUID> getUserIds() {
        return userApiClient.getClient()
                .get()
                .uri("/public/api/v1/test")
                .retrieve()
                .bodyToFlux(UUID.class)
                .collectList()
                .block();
    }
}
