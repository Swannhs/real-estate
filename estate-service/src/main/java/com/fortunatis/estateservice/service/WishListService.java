package com.fortunatis.estateservice.service;

import com.fortunatis.estateservice.pojo.request.WishListRequestDto;
import com.fortunatis.estateservice.pojo.response.EstateResponseDto;
import com.fortunatis.estateservice.pojo.response.WishListEstateIdsResponseDto;
import org.springframework.data.domain.Page;

import java.util.UUID;

public interface WishListService {
    void addEstateToWishList(WishListRequestDto wishListRequestDto);
    void deleteEstateFromWishList(UUID estateId);
    WishListEstateIdsResponseDto getWishlistEstateIdsByUser();
    Page<EstateResponseDto> getWishlistEstatesByUser(Integer page, Integer size, String orderBy, String desc);
    Boolean isExistsByUserIdAndEstateId(UUID userId, UUID estateId);
}
