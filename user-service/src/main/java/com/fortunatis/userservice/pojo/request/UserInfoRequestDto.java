package com.fortunatis.userservice.pojo.request;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
public class UserInfoRequestDto implements Serializable {
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
