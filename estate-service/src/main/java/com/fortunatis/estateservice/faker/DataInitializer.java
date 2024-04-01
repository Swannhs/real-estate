package com.fortunatis.estateservice.faker;

import com.fortunatis.estateservice.faker.estate.seeder.EstateSeeder;
import com.fortunatis.estateservice.faker.estate.seeder.WishListSeeder;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {
    @Value("${spring.profiles.active}")
    private String activeProfile;
    private final EstateSeeder estateSeeder;
    private final WishListSeeder wishListSeeder;

    @Override
    public void run(String... args) {
        if (!activeProfile.equals("dev")) {
            return;
        }
        estateSeeder.run(0, false);
        wishListSeeder.run(0, false);
    }
}
