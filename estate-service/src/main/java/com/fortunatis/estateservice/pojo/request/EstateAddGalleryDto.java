package com.fortunatis.estateservice.pojo.request;

import lombok.Getter;
import lombok.Setter;
import lombok.Value;

import java.io.Serializable;
import java.util.UUID;

@Getter
@Setter
public class EstateAddGalleryDto implements Serializable {
    String originalImageName;
    String compressedImageName;
    String blurredImageName;
    Boolean isFeaturedImage;
}