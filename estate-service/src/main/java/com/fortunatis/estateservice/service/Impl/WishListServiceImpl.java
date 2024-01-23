package com.fortunatis.estateservice.service.Impl;

import com.fortunatis.estateservice.model.Estate;
import com.fortunatis.estateservice.model.EstateWishList;
import com.fortunatis.estateservice.pojo.request.WishListRequestDto;
import com.fortunatis.estateservice.pojo.response.EstateResponseDto;
import com.fortunatis.estateservice.pojo.response.WishListEstateIdsResponseDto;
import com.fortunatis.estateservice.repository.WishListRepository;
import com.fortunatis.estateservice.service.EstateService;
import com.fortunatis.estateservice.service.UserService;
import com.fortunatis.estateservice.service.WishListService;
import com.fortunatis.estateservice.utils.UtilityService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class WishListServiceImpl implements WishListService {
    private final ModelMapper modelMapper;
    private final WishListRepository wishListRepository;
    private final UserService userService;
    private final EstateService estateService;

    @Override
    public void addEstateToWishList(WishListRequestDto wishListRequestDto) {
        if (!ObjectUtils.isEmpty(wishListRequestDto.getEstates())) {
            List<EstateWishList> estateWishLists = new ArrayList<>();
            wishListRequestDto.getEstates().forEach(estateId -> {
                Estate estate = estateService.getEstateByEstateId(estateId);
                if (!ObjectUtils.isEmpty(estate) && !isExistsByUserIdAndEstateId(userService.getUserId(), estate.getId())) {
                    EstateWishList estateWishList = new EstateWishList();
                    estateWishList.setEstate(estate);
                    estateWishList.setUserId(userService.getUserId());
                    estateWishLists.add(estateWishList);
                }
            });
            wishListRepository.saveAll(estateWishLists);
        }
    }

    @Override
    public void deleteEstateFromWishList(UUID estateId) {
        try {
            wishListRepository.deleteByUserIdAndEstateId(userService.getUserId(), estateId);
        } catch (Exception e) {
            log.error("Failed to delete estate from wishlist", e);
            throw new RuntimeException("Failed to delete estate from wishlist");
        }
    }

    @Override
    public WishListEstateIdsResponseDto getWishlistEstateIdsByUser() {
        List<EstateWishList> estateWishLists = wishListRepository.findAllByUserId(userService.getUserId());
        if (!ObjectUtils.isEmpty(estateWishLists)) {
            return new WishListEstateIdsResponseDto(estateWishLists.stream().map(estateWishList -> estateWishList.getEstate().getId()).toList());
        }
        return new WishListEstateIdsResponseDto();
    }

    @Override
    public Page<EstateResponseDto> getWishlistEstatesByUser(Integer page, Integer size, String orderBy, String desc) {
        Pageable pageable = PageRequest.of(page, UtilityService.preventEntitySize(size), Sort.Direction.fromString(desc), orderBy);
        return wishListRepository.findAllEstateByUserId(userService.getUserId(), pageable)
                .map(estate -> modelMapper.map(estate, EstateResponseDto.class));
    }

    public Boolean isExistsByUserIdAndEstateId(UUID userId, UUID estateId) {
        return wishListRepository.existsByUserIdAndEstateId(userId, estateId);
    }
}
