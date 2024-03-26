package com.fortunatis.userservice.pojo.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.util.List;

@Getter
@Setter
public class KeycloakClientResponse implements Serializable {
    @JsonProperty("id")
    private String id;

    @JsonProperty("clientId")
    private String clientId;

    @JsonProperty("name")
    private String name;

    @JsonProperty("description")
    private String description;

    @JsonProperty("rootUrl")
    private String rootUrl;

    @JsonProperty("adminUrl")
    private String adminUrl;

    @JsonProperty("baseUrl")
    private String baseUrl;

    @JsonProperty("surrogateAuthRequired")
    private boolean surrogateAuthRequired;

    @JsonProperty("enabled")
    private boolean enabled;

    @JsonProperty("alwaysDisplayInConsole")
    private boolean alwaysDisplayInConsole;

    @JsonProperty("clientAuthenticatorType")
    private String clientAuthenticatorType;

    @JsonProperty("secret")
    private String secret;

    @JsonProperty("redirectUris")
    private List<String> redirectUris;

    @JsonProperty("webOrigins")
    private List<String> webOrigins;
}
