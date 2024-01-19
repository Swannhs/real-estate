package com.fortunatis.staticservice.pojo.response;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
public class EstateStickerResponseDto implements Serializable {
    UUID id;
    String stickerName;
    String stickerStyle;
    Integer searchPriority;
    List<String> features;
}