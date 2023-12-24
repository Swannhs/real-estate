package com.fortunatis.estateservice.faker.estate.service.impl;

import com.fortunatis.estateservice.faker.estate.service.SeederService;
import com.fortunatis.estateservice.model.Estate;
import com.fortunatis.estateservice.pojo.response.staticService.FeaturesResponseDto;
import com.fortunatis.estateservice.pojo.response.staticService.StaticDataResponseDto;
import com.fortunatis.estateservice.repository.EstateRepository;
import com.fortunatis.estateservice.service.StaticApiService;
import com.fortunatis.estateservice.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class SeederServiceImpl implements SeederService {
    private final StaticApiService staticApiService;
    private final UserService userService;
    private final EstateRepository estateRepository;

    @Override
    public String getRandomAdvertiser() {
        String[] advertiserKeywords = staticApiService.getAdvertisers().stream().map(StaticDataResponseDto::getKeyword).toArray(String[]::new);

        return advertiserKeywords[new Random().nextInt(advertiserKeywords.length)];
    }

    @Override
    public String getRandomAdvertisePurpose() {
        String[] estateAdvertisePurposes = staticApiService.getAdvertisePurpose().stream().map(StaticDataResponseDto::getKeyword).toArray(String[]::new);

        return estateAdvertisePurposes[new Random().nextInt(estateAdvertisePurposes.length)];
    }

    @Override
    public String getRandomEstateType() {
        String[] estateTypes = staticApiService.getEstateCategories().stream().map(StaticDataResponseDto::getKeyword).toArray(String[]::new);

        return estateTypes[new Random().nextInt(estateTypes.length)];
    }

    @Override
    public List<UUID> getRandomFeatures() {
        List<UUID> features = new ArrayList<>();
        List<FeaturesResponseDto> estateFeatures = staticApiService.getEstateFeatures();
        for (int i = 0; i < new Random().nextInt(3, 8); i++) {
            features.add(estateFeatures.get(new Random().nextInt(estateFeatures.size())).getId());
        }
        return features;
    }

    @Override
    public UUID getRandomUserId() {
        List<UUID> userIds = userService.getUserIds();
        return userIds.get(new Random().nextInt(userIds.size()));
    }

    @Override
    public UUID getRandomEstateId() {
        Page<Estate> estates = estateRepository.findAll(
                PageRequest.of(0, 100)
        );
        if (!estates.isEmpty()) {
            int randomIndex = (int) (Math.random() * estates.getSize());
            Estate randomEstate = estates.getContent().get(randomIndex);
            return randomEstate.getId();
        }
        return null;
    }
}
