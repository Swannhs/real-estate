package com.fortunatis.staticservice.repository;

import com.fortunatis.staticservice.model.Feature;
import lombok.RequiredArgsConstructor;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@RequiredArgsConstructor
public class FeaturesRepositoryTest {
    private final FeaturesRepository featuresRepository;

    @Test
    public void findAllByIsActiveTrue() {
        List<Feature> features = featuresRepository.findAllByIsActiveTrue();
        assertThat(features).isNotEmpty();
    }
}
