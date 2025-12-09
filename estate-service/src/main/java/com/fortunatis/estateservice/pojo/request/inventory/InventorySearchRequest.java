package com.fortunatis.estateservice.pojo.request.inventory;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class InventorySearchRequest {
    private String city;
    private String state;
    private String propertyType;
    private LocalDate checkIn;
    private LocalDate checkOut;
    private Integer guests;
}
