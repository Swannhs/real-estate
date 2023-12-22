package com.fortunatis.estateservice.faker.estate.factory;

import com.fortunatis.estateservice.enums.EstateAmountType;
import com.fortunatis.estateservice.pojo.request.EstateAddContactDto;
import com.fortunatis.estateservice.pojo.request.EstateAddDto;
import com.fortunatis.estateservice.pojo.request.EstateAddGalleryDto;
import com.fortunatis.estateservice.pojo.request.EstateAddLocationDto;
import com.fortunatis.estateservice.pojo.response.staticService.FeaturesResponseDto;
import com.fortunatis.estateservice.pojo.response.staticService.StaticDataResponseDto;
import com.fortunatis.estateservice.service.StaticApiService;
import com.github.javafaker.Faker;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.UUID;
import java.util.concurrent.TimeUnit;

@Component
@RequiredArgsConstructor
public class EstateFactory {
    private static final Faker faker = new Faker();
    private final StaticApiService staticApiService;

    public EstateAddDto createDummyEstateAddDto() {
        EstateAddDto estateAddDto = new EstateAddDto();

        estateAddDto.setEstateAdvertiser(getRandomAdvertiser());
        estateAddDto.setEstateType(getRandomEstateType());
        estateAddDto.setEstateAdvertisePurpose(getRandomAdvertisePurpose());
        estateAddDto.setRooms(faker.number().randomDouble(1, 1, 10));
        estateAddDto.setLivingArea(faker.number().randomDouble(2, 50, 500));
        estateAddDto.setEstateAvailabilityPolicy(faker.lorem().sentence());
        estateAddDto.setEstateWillBeAvailable(faker.date().future(30, TimeUnit.DAYS));
        estateAddDto.setEstateWillBeAvailableTo(faker.date().future(60, TimeUnit.DAYS));
        estateAddDto.setEstatePriceType(EstateAmountType.CHF);
        estateAddDto.setEstatePrice(faker.number().randomDouble(2, 10000, 1000000));
        estateAddDto.setEstateAdditionalPrice(faker.number().randomDouble(2, 1000, 10000));
        estateAddDto.setEstateFloor(faker.lorem().word());
        estateAddDto.setEstateNumberOfFloor(faker.number().numberBetween(1, 10));
        estateAddDto.setEstateLotArea(faker.number().randomDouble(2, 100, 1000));
        estateAddDto.setEstateFloorSpace(faker.number().randomDouble(2, 50, 500));
        estateAddDto.setEstateRoomHeight(faker.number().randomDouble(2, 2, 5));
        estateAddDto.setEstateYearOfBuilding(faker.number().numberBetween(1950, 2020));
        estateAddDto.setEstateYearOfRenovation(faker.number().numberBetween(2000, 2022));
        estateAddDto.setVideoUrl(faker.internet().url());
        estateAddDto.setTitle(faker.lorem().sentence());
        estateAddDto.setDescription(faker.lorem().paragraph());
        estateAddDto.setCountry(faker.address().country());

        // Create random contact and location data
        EstateAddContactDto contact = new EstateAddContactDto();
        contact.setName(faker.name().fullName());
        contact.setPhone(faker.phoneNumber().cellPhone());
        contact.setEmail(faker.internet().emailAddress());
        contact.setDisplayAsPublic(faker.random().nextBoolean());
        estateAddDto.setContact(contact);

        EstateAddLocationDto location = new EstateAddLocationDto();
        location.setLat(faker.address().latitude());
        location.setLng(faker.address().longitude());
        location.setStreetNo(faker.address().streetAddressNumber());
        location.setZipCode(faker.address().zipCode());
        location.setCity(faker.address().city());
        location.setAddressLine1(faker.address().streetAddress());
        location.setSearchKeywords(String.valueOf(faker.lorem().words(3)));
        estateAddDto.setLocation(location);

        // Dummy estate gallery (one image)
        EstateAddGalleryDto gallery = new EstateAddGalleryDto();
        gallery.setOriginalImageName(faker.file().fileName());
        gallery.setCompressedImageName(faker.file().fileName());
        gallery.setIsFeaturedImage(true);
        estateAddDto.setEstateGalleries(List.of(gallery));

        // Dummy estate features
        estateAddDto.setEstateFeatures(getRandomFeatures());

        return estateAddDto;
    }

    private String getRandomAdvertiser() {
        String[] advertiserKeywords = staticApiService.getAdvertisers().stream().map(StaticDataResponseDto::getKeyword).toArray(String[]::new);

        return advertiserKeywords[new Random().nextInt(advertiserKeywords.length)];
    }

    private String getRandomAdvertisePurpose() {
        String[] estateAdvertisePurposes = staticApiService.getAdvertisePurpose().stream().map(StaticDataResponseDto::getKeyword).toArray(String[]::new);

        return estateAdvertisePurposes[new Random().nextInt(estateAdvertisePurposes.length)];
    }

    private String getRandomEstateType() {
        String[] estateTypes = staticApiService.getEstateCategories().stream().map(StaticDataResponseDto::getKeyword).toArray(String[]::new);

        return estateTypes[new Random().nextInt(estateTypes.length)];
    }

    private List<UUID> getRandomFeatures() {
        List<UUID> features = new ArrayList<>();
        List<FeaturesResponseDto> estateFeatures = staticApiService.getEstateFeatures();
        for (int i = 0; i < new Random().nextInt(3, 8); i++) {
            features.add(estateFeatures.get(new Random().nextInt(estateFeatures.size())).getId());
        }
        return features;
    }
}