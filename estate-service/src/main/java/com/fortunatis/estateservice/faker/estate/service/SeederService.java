package com.fortunatis.estateservice.faker.estate.service;

import java.util.List;
import java.util.UUID;

public interface SeederService {
    String getRandomAdvertiser();
    String getRandomAdvertisePurpose();
    String getRandomEstateType();
    List<UUID> getRandomFeatures();
    UUID getRandomUserId();
    UUID getRandomEstateId();
}
