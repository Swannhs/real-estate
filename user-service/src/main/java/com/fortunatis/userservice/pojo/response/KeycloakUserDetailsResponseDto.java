package com.fortunatis.userservice.pojo.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class KeycloakUserDetailsResponseDto {
    private String id;

    @JsonProperty("createdTimestamp")
    private long createdTimestamp;

    private String username;
    private boolean enabled;
    private boolean totp;

    @JsonProperty("emailVerified")
    private boolean emailVerified;

    @JsonProperty("firstName")
    private String firstName;

    @JsonProperty("lastName")
    private String lastName;

    private String email;

    @JsonProperty("disableableCredentialTypes")
    private String[] disableableCredentialTypes;

    @JsonProperty("requiredActions")
    private String[] requiredActions;

    @JsonProperty("notBefore")
    private int notBefore;

    private Access access;

    @Getter
    @Setter
    public static class Access {
        @JsonProperty("manageGroupMembership")
        private Boolean manageGroupMembership;
        private Boolean view;
        private Boolean mapRoles;
        private Boolean impersonate;
        private Boolean manage;
    }
}
