package com.fortunatis.estateservice.pojo.request;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
public class EstateAddLocationDto implements Serializable {
    String lat;
    String lng;
    String streetNo;
    String zipCode;
    String city;
    String addressLine1;
    String searchKeywords;
}