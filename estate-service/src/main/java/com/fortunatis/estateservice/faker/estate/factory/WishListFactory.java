package com.fortunatis.estateservice.faker.estate.factory;

import com.fortunatis.estateservice.faker.estate.service.SeederService;
import com.fortunatis.estateservice.pojo.request.WishListRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.UUID;

@Component
@RequiredArgsConstructor
public class WishListFactory {
    private final SeederService seederService;

    public WishListRequestDto createWishListRequestDto() {
        WishListRequestDto wishListRequestDto = new WishListRequestDto();
        List<UUID> estates = new ArrayList<>();
        for (int i = 0; i < new Random().nextInt(1, 4); i++) {
            UUID estateId = seederService.getRandomEstateId();
            if (!estates.contains(estateId)) {
                estates.add(estateId);
            }
        }
        wishListRequestDto.setEstates(estates);
        return wishListRequestDto;
    }
}
