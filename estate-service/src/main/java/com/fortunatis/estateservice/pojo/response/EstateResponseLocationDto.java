package com.fortunatis.estateservice.pojo.response;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
public class EstateResponseLocationDto implements Serializable {
    String lat;
    String lng;
    String streetNo;
    String zipCode;
    String city;
    String addressLine1;
}