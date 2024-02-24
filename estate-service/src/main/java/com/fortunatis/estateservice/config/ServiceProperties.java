package com.fortunatis.estateservice.config;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Component
@ConfigurationProperties(prefix = "service.param")
public class ServiceProperties {
    private FileStorage fileStorage;

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class FileStorage {
        private String dir;
        private String usersDir;
        private String adminDir;
    }
}
