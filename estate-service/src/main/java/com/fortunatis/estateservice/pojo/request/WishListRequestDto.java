package com.fortunatis.estateservice.pojo.request;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
public class WishListRequestDto implements Serializable {
    List<UUID> estates;
}
