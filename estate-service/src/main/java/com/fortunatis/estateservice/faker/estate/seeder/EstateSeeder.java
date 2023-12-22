package com.fortunatis.estateservice.faker.estate.seeder;

import com.fortunatis.estateservice.faker.estate.factory.EstateFactory;
import com.fortunatis.estateservice.pojo.request.EstateAddDto;
import com.fortunatis.estateservice.pojo.response.EstateResponseDto;
import com.fortunatis.estateservice.repository.EstateRepository;
import com.fortunatis.estateservice.service.EstateService;
import com.fortunatis.estateservice.service.StaticApiService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class EstateSeeder {
    private final StaticApiService staticApiService;
    private final EstateService estateService;
    private final EstateRepository estateRepository;

    public void seedData(Integer numberOfEstates) {
        for (int i = 0; i < numberOfEstates; i++) {
            EstateAddDto estateAddDto = createDummyEstateAddDto();
            EstateResponseDto createdEstate = estateService.createEstate(estateAddDto);
            printCreatedEstate(createdEstate);
        }
    }

    public void cleanData() {
        estateRepository.deleteAll();
    }

    private EstateAddDto createDummyEstateAddDto() {
        EstateFactory estateFactory = new EstateFactory(staticApiService);
        return estateFactory.createDummyEstateAddDto();
    }

    private void printCreatedEstate(EstateResponseDto createdEstate) {
        log.info("Created estate: {}", createdEstate.getId());
    }
}
