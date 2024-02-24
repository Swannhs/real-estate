package com.fortunatis.userservice.pojo.request;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
public class KeycloakUpdateUserRequestDto implements Serializable {
    String firstName;
    String lastName;
}
