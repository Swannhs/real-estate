package com.fortunatis.userservice.pojo.request;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

@Getter
@Setter
public class KeycloakCreateUserRequestDto implements Serializable {
    private String username;
    private Boolean enabled;
    private List<String> realmRoles;
    private Map<String, List<String>> attributes;
}
