package com.hikmamadrasa.HikmaProject.mapper;


import com.hikmamadrasa.HikmaProject.dto.MadrasaAboutDto;
import com.hikmamadrasa.HikmaProject.entity.MadrasaAbout;

public class MadrasaMapper {

    public static MadrasaAboutDto mapToDto(MadrasaAbout madrasaAbout) {
        return new MadrasaAboutDto(
                madrasaAbout.getId(),
                madrasaAbout.getTitle(),
                madrasaAbout.getDescription(),
                madrasaAbout.getImage()
        );
    }

    public static MadrasaAbout mapToEntity(MadrasaAboutDto dto) {
        return new MadrasaAbout(
                dto.getId(),
                dto.getTitle(),
                dto.getDescription(),
                dto.getImage()
        );
    }

}
