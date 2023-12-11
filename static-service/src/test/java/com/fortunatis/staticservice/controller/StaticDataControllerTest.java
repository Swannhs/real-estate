package com.fortunatis.staticservice.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fortunatis.staticservice.pojo.response.FeaturesResponseDto;
import com.fortunatis.staticservice.sevices.StaticDataService;
import org.junit.Test;
import org.junit.jupiter.api.BeforeEach;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.Collections;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class StaticDataControllerTest {
    private MockMvc mockMvc;
    @Mock
    private StaticDataService staticDataService;
    @InjectMocks
    private StaticDataController staticDataController;
    private final ObjectMapper objectMapper = new ObjectMapper();

    @BeforeEach
    public void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(staticDataController).build();
    }

    @Test
    public void testGetPublicFeatures() throws Exception {
        when(staticDataService.getPublicFeatures()).thenReturn(Collections.singletonList(new FeaturesResponseDto()));
        mockMvc.perform(get("/public/api/v1/static/features"))
                .andExpect(status().isOk());
    }
}
