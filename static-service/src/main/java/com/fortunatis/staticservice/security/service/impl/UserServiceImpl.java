package com.fortunatis.staticservice.security.service.impl;

import com.fortunatis.staticservice.security.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final WebClient webClient;

    @Override
    public String getUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication.getName();
    }

    @Override
    public String getUserName() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication.getPrincipal().toString();
    }

    @Override
    public String getUserNameByUserId(String userId) {
        return userId;
    }
}
