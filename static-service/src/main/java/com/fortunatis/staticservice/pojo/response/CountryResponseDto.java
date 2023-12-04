package com.fortunatis.staticservice.pojo.response;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
public class CountryResponseDto implements Serializable {
    Long id;
    String countryName;
    String countryCode;
    String alpha2;
    String region;
    String subRegion;
}