package com.fortunatis.estateservice.config;

import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.CacheControl;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.resource.PathResourceResolver;

import java.util.concurrent.TimeUnit;

@Configuration
@RequiredArgsConstructor
public class S3Config implements WebMvcConfigurer {
    private final ServiceProperties serviceProperties;
    @Value("${cloud.aws.credentials.accessKey}")
    private String accessKeyId;
    @Value("${cloud.aws.credentials.secretKey}")
    private String accessKeySecret;
    @Value("${cloud.aws.region.static}")
    private String s3RegionName;
    @Value("${cloud.aws.s3.bucket}")
    private String bucketName;

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry
                .addResourceHandler("/uploads/admin/**", "/uploads/users/**")
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

    @Bean
    public AmazonS3 getAmazonS3Client() {
        AWSCredentials awsCredentials = new BasicAWSCredentials(accessKeyId, accessKeySecret);
        return AmazonS3ClientBuilder
                .standard()
                .withCredentials(new AWSStaticCredentialsProvider(awsCredentials))
                .withRegion(s3RegionName)
                .build();
    }
}
