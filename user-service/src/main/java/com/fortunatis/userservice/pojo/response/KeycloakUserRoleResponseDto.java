package com.fortunatis.userservice.pojo.response;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
public class KeycloakUserRoleResponseDto implements Serializable {
    String id;
    String name;
    String description;
    Boolean composite;
    Boolean clientRole;
    String containerId;
}
