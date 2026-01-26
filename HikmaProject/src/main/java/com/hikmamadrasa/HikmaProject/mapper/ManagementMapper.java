package com.hikmamadrasa.HikmaProject.mapper;

import com.hikmamadrasa.HikmaProject.dto.ManagementDto;
import com.hikmamadrasa.HikmaProject.entity.Managment;

public class ManagementMapper {
    public static ManagementDto mapToDto(Managment manage) {
        return new ManagementDto(
                manage.getId(),
                manage.getName(),
                manage.getPosition(),
                manage.getMessage(),
                manage.getImage()
        );
    }

    public static Managment mapToEntity(ManagementDto dto) {
        return new Managment(
                dto.getId(),
                dto.getName(),
                dto.getPosition(),
                dto.getMessage(),
                dto.getImage()
        );
    }
}
