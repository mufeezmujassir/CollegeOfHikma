package com.hikmamadrasa.HikmaProject.service;

import com.hikmamadrasa.HikmaProject.dto.HeroSliderDto;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface HeroSliderService {
    HeroSliderDto createHeroSlider(HeroSliderDto heroSliderDto, MultipartFile image);
    HeroSliderDto getHeroSliderById(Long id);
    List<HeroSliderDto> getAllHeroSliders();
    HeroSliderDto updateHeroSliderById(Long id, HeroSliderDto heroSliderDto, MultipartFile image);
    void deleteHeroSliderById(Long id);
}
