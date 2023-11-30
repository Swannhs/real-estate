package com.fortunatis.estateservice.pojo.response;

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
public class EstateResponseDto implements Serializable {
    UUID id;
    String estateAdvertiser;
    String estateType;
    String estateAdvertisePurpose;
    Double rooms;
    Double livingArea;
    String estateAvailabilityPolicy;
    Date estateWillBeAvailable;
    Date estateWillBeAvailableTo;
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
    Date creationDate;
    Date lastModified;
    String userId;
    EstateResponseContactDto contact;
    EstateResponseLocationDto location;
    String country;
    List<EstateResponseGalleryDto> estateGalleries;
    Set<UUID> estateFeatures;
    Set<UUID> estateStickers;
}