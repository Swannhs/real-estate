package com.fortunatis.estateservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class EstateServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(EstateServiceApplication.class, args);
    }

}
