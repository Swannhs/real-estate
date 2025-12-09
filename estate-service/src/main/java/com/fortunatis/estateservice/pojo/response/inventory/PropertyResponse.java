package com.fortunatis.estateservice.pojo.response.inventory;

import lombok.Builder;
import lombok.Getter;

import java.util.List;
import java.util.UUID;

@Getter
@Builder
public class PropertyResponse {
    private UUID id;
    private String title;
    private String description;
    private String propertyType;
    private String status;
    private Integer bedrooms;
    private Integer bathrooms;
    private Double areaSqft;
    private String timezone;
    private LocationResponse location;
    private List<UnitResponse> units;
}
