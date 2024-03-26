package com.fortunatis.userservice.faker.user.seeder;

import com.fortunatis.userservice.enums.UserRole;
import com.fortunatis.userservice.faker.user.factory.UserFactory;
import com.fortunatis.userservice.faker.user.service.SeederService;
import com.fortunatis.userservice.pojo.request.KeycloakCreateUserRequestDto;
import com.fortunatis.userservice.pojo.request.KeycloakUserCredentialsRequestDto;
import com.fortunatis.userservice.service.KeycloakService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class UserSeeder {
    private final UserFactory userFactory;
    private final SeederService seederService;
    private final KeycloakService keycloakService;

    public void run() {
        if (shouldSeed()) {
            log.info("Seeding users...");
            seedData();
        }
    }

    public void seedData() {
//        ADMIN
        KeycloakCreateUserRequestDto userRequestDto = userFactory.generateUserDetails("alan@fortunatis.ch");
        KeycloakUserCredentialsRequestDto userCredentialsRequestDto = userFactory.generateUserCredentials("alan");
        seederService.createKeycloakUser(userRequestDto, userCredentialsRequestDto, UserRole.ADMIN);
//        USER
        userRequestDto = userFactory.generateUserDetails("palash@forutnatis.ch");
        userCredentialsRequestDto = userFactory.generateUserCredentials("palash");
        seederService.createKeycloakUser(userRequestDto, userCredentialsRequestDto, UserRole.USER);
//        USER
        userRequestDto = userFactory.generateUserDetails("swann@fortunatis.ch");
        userCredentialsRequestDto = userFactory.generateUserCredentials("swann");
        seederService.createKeycloakUser(userRequestDto, userCredentialsRequestDto, UserRole.USER);
    }

    public Boolean shouldSeed() {
        return keycloakService.getAllKeycloakUsers().isEmpty();
    }
}
