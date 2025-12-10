package com.fortunatis.estateservice.pojo.request.inventory;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class PropertyCreateRequest {
    private String title;
    private String description;
    private String propertyType;
    private String status;
    private Integer bedrooms;
    private Integer bathrooms;
    private Double areaSqft;
    private String timezone;
    private LocationRequest location;
    private List<UnitCreateRequest> units;
}
