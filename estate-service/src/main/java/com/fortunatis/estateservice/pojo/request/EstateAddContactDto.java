package com.fortunatis.estateservice.pojo.request;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
public class EstateAddContactDto implements Serializable {
    String name;
    String phone;
    String email;
    Boolean displayAsPublic;
}