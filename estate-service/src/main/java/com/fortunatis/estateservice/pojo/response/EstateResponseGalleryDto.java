package com.fortunatis.estateservice.pojo.response;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.util.Date;

@Getter
@Setter
public class EstateResponseGalleryDto implements Serializable {
    String originalImageName;
    String compressedImageName;
    String blurredImageName;
    Date creationDate;
    Boolean isFeaturedImage;
}