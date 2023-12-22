package com.fortunatis.estateservice.faker;

import com.fortunatis.estateservice.faker.estate.seeder.EstateSeeder;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {
    private final EstateSeeder estateSeeder;

    @Override
    public void run(String... args) {
//        estateSeeder.cleanData();
//        estateSeeder.seedData(1000);
    }
}
