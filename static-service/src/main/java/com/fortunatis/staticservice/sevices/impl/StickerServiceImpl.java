package com.fortunatis.staticservice.sevices.impl;

import com.fortunatis.staticservice.repository.EstateStickerRepository;
import com.fortunatis.staticservice.sevices.StickerService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class StickerServiceImpl implements StickerService {
    private final ModelMapper modelMapper;
    private final EstateStickerRepository estateStickerRepository;

}
