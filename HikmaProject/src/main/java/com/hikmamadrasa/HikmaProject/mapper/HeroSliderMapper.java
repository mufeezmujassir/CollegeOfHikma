package com.hikmamadrasa.HikmaProject.mapper;

import com.hikmamadrasa.HikmaProject.dto.HeroSliderDto;
import com.hikmamadrasa.HikmaProject.entity.HeroSlider;

public class HeroSliderMapper {

    public static HeroSliderDto mapToDto(HeroSlider hero) {
        return new HeroSliderDto(
                hero.getId(),
                hero.getThought(),

                hero.getImage()
        );
    }

    public static HeroSlider mapToEntity(HeroSliderDto dto) {
        return new HeroSlider(
                dto.getId(),
                dto.getThought(),

                dto.getImage()
        );
    }
}
