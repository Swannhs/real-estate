package com.fortunatis.estateservice.config;

import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.CacheControl;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.resource.PathResourceResolver;

import java.util.concurrent.TimeUnit;

@Configuration
@RequiredArgsConstructor
public class SpringConfig implements WebMvcConfigurer {
    private final ServiceProperties serviceProperties;

    @Bean
    public ModelMapper modelMapper() {
        return new ModelMapper();
    }

    @Bean
    public WebClient webClient() {
        return WebClient.builder().build();
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
//        Aws s3
        registry
                .addResourceHandler("/public/v1/uploads/admin/**", "public/v1/uploads/users/**")
                .addResourceLocations(
                        serviceProperties.getFileStorage().getDir() + serviceProperties.getFileStorage().getUsersDir(),
                        serviceProperties.getFileStorage().getDir() + serviceProperties.getFileStorage().getAdminDir()
                )
                .setCacheControl(
                        CacheControl
                                .maxAge(2, TimeUnit.HOURS)
                                .cachePublic()
                )
                .resourceChain(true)
                .addResolver(new PathResourceResolver());
    }
}
