package com.fortunatis.userservice.controller;

import com.fortunatis.userservice.pojo.request.UserInfoRequestDto;
import com.fortunatis.userservice.service.UserInfoService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/user-info")
@RequiredArgsConstructor
@Tag(name = "User Info", description = "User info controller")
public class UserInfoController {
    private final UserInfoService userInfoService;

    @GetMapping
    @Operation(summary = "Get logged in user's info")
    public ResponseEntity<?> getUserInfo() {
        return ResponseEntity.ok(userInfoService.getUserInfo());
    }

    @PutMapping
    @Operation(summary = "Create or update logged in user's info")
    public ResponseEntity<?> createOrUpdateUserInfo(@RequestBody UserInfoRequestDto userInfoRequestDto) {
        return ResponseEntity.ok(userInfoService.createOrUpdateUserInfo(userInfoRequestDto));
    }
}
