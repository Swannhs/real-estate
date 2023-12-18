package com.fortunatis.staticservice.sevices.impl;

import com.fortunatis.staticservice.client.UserServiceApiClient;
import com.fortunatis.staticservice.pojo.response.UserResponseDto;
import com.fortunatis.staticservice.sevices.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserServiceApiClient userServiceApiClient;

    @Override
    public UUID getUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return UUID.fromString(authentication.getName());
    }

    @Override
    public String getUserName() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication.getPrincipal().toString();
    }

    @Override
    public UserResponseDto getUserDetailsByUserId(String userId) {
        return userServiceApiClient.getClient().get()
                .uri("/users/" + userId)
                .retrieve()
                .bodyToMono(UserResponseDto.class)
                .block();
    }
}
