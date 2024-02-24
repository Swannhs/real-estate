package com.fortunatis.estateservice.pojo.response.keycloak;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
public class KeycloakTokenResponseDto implements Serializable {
    @JsonProperty("access_token")
    String accessToken;

    @JsonProperty("expires_in")
    Long expiresIn;

    @JsonProperty("refresh_expires_in")
    Long refreshExpiresIn;

    @JsonProperty("token_type")
    String tokenType;

    @JsonProperty("not-before-policy")
    Long notBeforePolicy;

    @JsonProperty("scope")
    String scope;
}
