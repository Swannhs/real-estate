package com.fortunatis.estateservice.pojo.response;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
public class FileStoreResponseDto implements Serializable {
    private String fileOriginalName;
    private String fileModifiedName;
    private Long fileSize;
    private String fileType;
    private String fileExtension;
    private Boolean isUploadSuccess;
    private String message;
}
