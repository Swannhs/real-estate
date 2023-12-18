package com.fortunatis.staticservice.sevices;

import com.fortunatis.staticservice.pojo.response.UserResponseDto;

import java.util.UUID;

public interface UserService {
    UUID getUserId();
    String getUserName();
    UserResponseDto getUserDetailsByUserId(String userId);
}
