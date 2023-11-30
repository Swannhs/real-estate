package com.fortunatis.estateservice.pojo.request;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.UUID;

@Getter
@Setter
@JsonIgnoreProperties(ignoreUnknown = true)
public class SearchFilterDto {
    private Integer minRoomNumber;
    private Integer maxRoomNumber;

    private Double livingAreaStart;
    private Double livingAreaEnd;

    private Double lotAreaStart;
    private Double lotAreaEnd;

    private Double floorSpaceStart;
    private Double floorSpaceEnd;

    private Integer estateYearOfBuildingStart;
    private Integer estateYearOfBuildingEnd;

    private List<String> estateAdvertiser;

    private List<UUID> estateFeatures;
}
