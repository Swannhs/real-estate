package com.fortunatis.userservice.pojo.response;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.util.UUID;

@Getter
@Setter
public class UserInfoResponseDto implements Serializable {
    UUID id;
    UUID userId;
    String firstName;
    String lastName;
    String phoneNumber;
    String profilePicturePath;
    Boolean verifiedAccount;
    String intro;
    String facebookLink;
    String twitterLink;
    String youtubeLink;
    String instagramLink;
}
