package com.fortunatis.userservice.pojo.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

@Getter
@Setter
public class KeycloakCreateUserRequestDto implements Serializable {
    @JsonProperty("username")
    private String username;

    @JsonProperty("firstName")
    private String firstName;

    @JsonProperty("lastName")
    private String lastName;

    @JsonProperty("email")
    private String email;

    @JsonProperty("enabled")
    private Boolean enabled;

    @JsonProperty("emailVerified")
    private Boolean emailVerified;

    @JsonProperty("access")
    private Map<String, Boolean> access;
}