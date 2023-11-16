package com.fortunatis.staticservice.seeder;

import com.fortunatis.staticservice.model.Feature;
import com.fortunatis.staticservice.repository.FeaturesRepository;
import com.github.javafaker.Faker;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

@Component
@Profile("dev")
@RequiredArgsConstructor
public class FeaturesSeeder implements CommandLineRunner {
    private final FeaturesRepository featuresRepository;
    private final Faker faker = new Faker();

    @Override
    public void run(String... args) {
        if (featuresRepository.count() == 0) {
            for (int i = 0; i < 10; i++) {
                Feature feature = new Feature();
                feature.setFeaturesTitle(faker.lorem().sentence());
                feature.setFeaturesTitleFr(faker.lorem().sentence());
                feature.setFeaturesTitleIt(faker.lorem().sentence());
                feature.setFeaturesTitleDe(faker.lorem().sentence());
                feature.setIsActive(true);
                featuresRepository.save(feature);
            }
        }
    }
}
