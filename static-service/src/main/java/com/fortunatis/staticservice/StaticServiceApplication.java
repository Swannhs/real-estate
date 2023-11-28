package com.fortunatis.staticservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class StaticServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(StaticServiceApplication.class, args);
    }

}
