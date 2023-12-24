package com.fortunatis.estateservice.faker.estate.seeder;

import com.fortunatis.estateservice.faker.estate.factory.EstateFactory;
import com.fortunatis.estateservice.faker.estate.service.SeederService;
import com.fortunatis.estateservice.model.Estate;
import com.fortunatis.estateservice.model.EstateContact;
import com.fortunatis.estateservice.model.EstateGallery;
import com.fortunatis.estateservice.model.EstateLocation;
import com.fortunatis.estateservice.pojo.request.EstateAddDto;
import com.fortunatis.estateservice.pojo.request.EstateAddGalleryDto;
import com.fortunatis.estateservice.repository.EstateRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
@RequiredArgsConstructor
@Slf4j
public class EstateSeeder {
    private final ModelMapper modelMapper;
    private final SeederService seederService;
    private final EstateRepository estateRepository;

    public void run(Integer entries, Boolean clean) {
        if (clean) {
            cleanData();
        }
        seedData(entries);
    }

    public void seedData(Integer numberOfEstates) {
        List<Estate> estates = new ArrayList<>();
        for (int i = 0; i < numberOfEstates; i++) {
            EstateAddDto estateAddDto = createDummyEstateAddDto();
            Estate estate = modelMapper.map(estateAddDto, Estate.class);

            EstateContact estateContact = modelMapper.map(estateAddDto.getContact(), EstateContact.class);
            estate.setContact(estateContact);

            EstateLocation estateLocation = modelMapper.map(estateAddDto.getLocation(), EstateLocation.class);
            estate.setLocation(estateLocation);

            if (!estateAddDto.getEstateGalleries().isEmpty()) {
                List<EstateGallery> estateGalleries = new ArrayList<>();
                for (EstateAddGalleryDto estateImageDTO : estateAddDto.getEstateGalleries()) {
                    EstateGallery estateGallery = modelMapper.map(estateImageDTO, EstateGallery.class);
                    estateGallery.setGalleryEstate(estate);
                    estateGalleries.add(estateGallery);
                }
                estate.setEstateGalleries(estateGalleries);
            }
            estate.setUserId(seederService.getRandomUserId());
            estates.add(estate);
        }
        estateRepository.saveAll(estates);
        log.info("Created {} estates", estates.size());
    }

    public void cleanData() {
        estateRepository.deleteAll();
    }

    private EstateAddDto createDummyEstateAddDto() {
        EstateFactory estateFactory = new EstateFactory(seederService);
        return estateFactory.createDummyEstateAddDto();
    }
}
