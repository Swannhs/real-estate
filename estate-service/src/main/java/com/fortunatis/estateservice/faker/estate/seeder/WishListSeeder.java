package com.fortunatis.estateservice.faker.estate.seeder;

import com.fortunatis.estateservice.faker.estate.factory.WishListFactory;
import com.fortunatis.estateservice.faker.estate.service.SeederService;
import com.fortunatis.estateservice.model.Estate;
import com.fortunatis.estateservice.model.EstateWishList;
import com.fortunatis.estateservice.pojo.request.WishListRequestDto;
import com.fortunatis.estateservice.repository.WishListRepository;
import com.fortunatis.estateservice.service.EstateService;
import com.fortunatis.estateservice.service.WishListService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.util.ObjectUtils;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Component
@RequiredArgsConstructor
@Slf4j
public class WishListSeeder {
    private final SeederService seederService;
    private final EstateService estateService;
    private final WishListService wishListService;
    private final WishListRepository wishListRepository;

    public void run(Integer entries, Boolean clean) {
        if (clean) {
            cleanData();
        }
        seedData(entries);
    }

    public void seedData(Integer numberOfWishLists) {
        List<EstateWishList> estateWishLists = new ArrayList<>();
        for (int i = 0; i < numberOfWishLists; i++) {
            createDummyWishListRequestDto().getEstates().forEach(estateId -> {
                Estate estate = estateService.getEstateByEstateId(estateId);
                UUID userId = seederService.getRandomUserId();
                if (!ObjectUtils.isEmpty(estate) && !wishListService.isExistsByUserIdAndEstateId(userId, estate.getId())) {
                    EstateWishList estateWishList = new EstateWishList();
                    estateWishList.setEstate(estate);
                    estateWishList.setUserId(userId);
                    estateWishLists.add(estateWishList);
                }
            });
        }
        wishListRepository.saveAll(estateWishLists);
        log.info("Created {} wish lists", estateWishLists.size());
    }

    private void cleanData() {
        wishListRepository.deleteAll();
    }

    private WishListRequestDto createDummyWishListRequestDto() {
        WishListFactory wishListFactory = new WishListFactory(seederService);
        return wishListFactory.createWishListRequestDto();
    }
}
