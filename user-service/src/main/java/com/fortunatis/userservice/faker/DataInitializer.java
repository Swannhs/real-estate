package com.fortunatis.userservice.faker;

import com.fortunatis.userservice.faker.user.seeder.UserSeeder;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {
    private final UserSeeder userSeeder;

    @Override
    public void run(String... args) throws Exception {
        userSeeder.run();
    }
}
