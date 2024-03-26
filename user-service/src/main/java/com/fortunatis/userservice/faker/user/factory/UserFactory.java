package com.fortunatis.userservice.faker.user.factory;

import com.fortunatis.userservice.faker.user.service.SeederService;
import com.fortunatis.userservice.pojo.request.KeycloakCreateUserRequestDto;
import com.fortunatis.userservice.pojo.request.KeycloakUserCredentialsRequestDto;
import com.github.javafaker.Faker;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Map;

@Component
@RequiredArgsConstructor
public class UserFactory {
    private static final Faker faker = new Faker();
    private final SeederService seederService;

    public KeycloakCreateUserRequestDto generateUserDetails(String email) {
        KeycloakCreateUserRequestDto user = new KeycloakCreateUserRequestDto();
        user.setUsername(email);
        user.setFirstName(faker.name().firstName());
        user.setLastName(faker.name().lastName());
        user.setEmail(email);
        user.setEnabled(true);
        user.setEmailVerified(true);
        Map<String, Boolean> access = Map.of(
                "manageGroupMembership", true,
                "view", true,
                "impersonate", false,
                "manage", true
        );
        return user;
    }

    public KeycloakUserCredentialsRequestDto generateUserCredentials(String password) {
        KeycloakUserCredentialsRequestDto credentials = new KeycloakUserCredentialsRequestDto();
        credentials.setTemporary(false);
        credentials.setType("password");
        credentials.setValue(password);
        return credentials;
    }
}
