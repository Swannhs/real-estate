package com.fortunatis.staticservice.pojo.response;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
public class UserResponseDto implements Serializable {
    private String id;
    private String username;
    private boolean enabled;
    private boolean totp;
    private String email;
    private AccessDTO access;
    private long createdTimestamp;
    private boolean emailVerified;
    private String firstName;
    private String lastName;
    private String[] disableableCredentialTypes;
    private String[] requiredActions;
    private long notBefore;

    @Getter
    @Setter
    public static class AccessDTO {
        private boolean view;
        private boolean mapRoles;
        private boolean impersonate;
        private boolean manage;
        private boolean manageGroupMembership;
    }
}
