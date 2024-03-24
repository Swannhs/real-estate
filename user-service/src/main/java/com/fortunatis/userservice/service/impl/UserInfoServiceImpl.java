package com.fortunatis.userservice.service.impl;

import com.fortunatis.userservice.model.UserInfo;
import com.fortunatis.userservice.pojo.request.KeycloakUpdateUserRequestDto;
import com.fortunatis.userservice.pojo.request.UserInfoRequestDto;
import com.fortunatis.userservice.pojo.response.KeycloakUserDetailsResponseDto;
import com.fortunatis.userservice.pojo.response.UserInfoResponseDto;
import com.fortunatis.userservice.repository.UserInfoRepository;
import com.fortunatis.userservice.service.KeycloakService;
import com.fortunatis.userservice.service.UserInfoService;
import com.fortunatis.userservice.service.UserService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserInfoServiceImpl implements UserInfoService {
    private final ModelMapper modelMapper;
    private final UserInfoRepository userInfoRepository;
    private final UserService userService;
    private final KeycloakService keycloakService;

    @Override
    public UserInfoResponseDto getUserInfo() {
        UUID userId = userService.getUserId();
        if (userId == null) {
            throw new EntityNotFoundException("User not found");
        }
        UserInfo userInfo = userInfoRepository.findByUserId(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));
        KeycloakUserDetailsResponseDto keycloakUserDetailsResponseDto = keycloakService.getUserById(userId);
        UserInfoResponseDto userInfoResponseDto = modelMapper.map(userInfo, UserInfoResponseDto.class);
        userInfoResponseDto.setFirstName(keycloakUserDetailsResponseDto.getFirstName());
        userInfoResponseDto.setLastName(keycloakUserDetailsResponseDto.getLastName());
        return userInfoResponseDto;
    }

    @Override
    public UserInfoResponseDto createOrUpdateUserInfo(UserInfoRequestDto userInfoRequestDto) {
        UUID userId = userService.getUserId();
        UserInfo userInfo = userInfoRepository.findByUserId(userId).orElse(new UserInfo());
        modelMapper.map(userInfoRequestDto, userInfo);
        userInfo.setUserId(userId);
        KeycloakUpdateUserRequestDto keycloakUpdateUserRequestDto = new KeycloakUpdateUserRequestDto();
        keycloakUpdateUserRequestDto.setFirstName(userInfoRequestDto.getFirstName());
        keycloakUpdateUserRequestDto.setLastName(userInfoRequestDto.getLastName());
        keycloakService.updateUser(userId, keycloakUpdateUserRequestDto);
        UserInfoResponseDto responseDto = modelMapper.map(userInfoRepository.save(userInfo), UserInfoResponseDto.class);
        responseDto.setFirstName(keycloakUpdateUserRequestDto.getFirstName());
        responseDto.setLastName(keycloakUpdateUserRequestDto.getLastName());
        return responseDto;
    }
}
