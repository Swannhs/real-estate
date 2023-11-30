package com.fortunatis.estateservice.pojo.request;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fortunatis.estateservice.enums.EstateAmountType;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.util.Date;
import java.util.List;
import java.util.Set;
import java.util.UUID;

@Getter
@Setter
public class EstateAddDto implements Serializable {
    String estateAdvertiser;
    String estateType;
    String estateAdvertisePurpose;
    Double rooms;
    Double livingArea;
    String estateAvailabilityPolicy;
    @JsonFormat(pattern = "yyyy-MM-dd")
    Date estateWillBeAvailable;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date estateWillBeAvailableTo;
    EstateAmountType estatePriceType;
    Double estatePrice;
    Double estateAdditionalPrice;
    String estateFloor;
    Integer estateNumberOfFloor;
    Double estateLotArea;
    Double estateFloorSpace;
    Double estateRoomHeight;
    Integer estateYearOfBuilding;
    Integer estateYearOfRenovation;
    String videoUrl;
    String title;
    String description;
    EstateAddContactDto contact;
    EstateAddLocationDto location;
    String country;
    List<EstateAddGalleryDto> estateGalleries;
    Set<UUID> estateFeatures;
    Set<UUID> estateStickers;
}