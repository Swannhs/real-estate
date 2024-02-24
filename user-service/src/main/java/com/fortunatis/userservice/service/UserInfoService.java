package com.fortunatis.userservice.service;

import com.fortunatis.userservice.pojo.request.UserInfoRequestDto;
import com.fortunatis.userservice.pojo.response.UserInfoResponseDto;

public interface UserInfoService {
    UserInfoResponseDto getUserInfo();
    UserInfoResponseDto createOrUpdateUserInfo(UserInfoRequestDto userInfoRequestDto);
}
