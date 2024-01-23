package com.fortunatis.estateservice.faker;

import com.fortunatis.estateservice.faker.estate.seeder.EstateSeeder;
import com.fortunatis.estateservice.faker.estate.seeder.WishListSeeder;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {
    private final EstateSeeder estateSeeder;
    private final WishListSeeder wishListSeeder;

    @Override
    public void run(String... args) {
        estateSeeder.run(0, false);
        wishListSeeder.run(0, false);
    }
}
