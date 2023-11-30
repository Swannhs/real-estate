package com.fortunatis.estateservice.pojo.response;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
public class EstateResponseContactDto implements Serializable {
    String name;
    String phone;
    String email;
    Boolean displayAsPublic;
}