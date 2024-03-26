package com.fortunatis.userservice.pojo.request;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
public class KeycloakUserCredentialsRequestDto implements Serializable {
    private String type;
    private String value;
    private Boolean temporary;
}
