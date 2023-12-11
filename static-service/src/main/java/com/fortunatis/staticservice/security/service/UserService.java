package com.fortunatis.staticservice.security.service;

public interface UserService {
    String getUserId();
    String getUserName();
    String getUserNameByUserId(String userId);
}
