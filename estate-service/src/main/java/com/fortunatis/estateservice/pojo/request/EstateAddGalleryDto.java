package com.fortunatis.estateservice.pojo.request;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
public class EstateAddGalleryDto implements Serializable {
    String originalImageName;
    String compressedImageName;
    Boolean isFeaturedImage;
}