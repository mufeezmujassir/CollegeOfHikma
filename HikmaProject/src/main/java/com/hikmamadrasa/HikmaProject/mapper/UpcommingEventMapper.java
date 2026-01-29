package com.hikmamadrasa.HikmaProject.mapper;

import com.hikmamadrasa.HikmaProject.dto.UpcommingEventDto;
import com.hikmamadrasa.HikmaProject.entity.UpcommingEvent;

public class UpcommingEventMapper {

    public static UpcommingEventDto mapToDto(UpcommingEvent event){
        return new UpcommingEventDto(
                event.getId(),
                event.getTitle(),
                event.getDescription(),
                event.getEventDate(),
                event.getImage(),
                event.isActivate(),
                event.isPopup()
        );
    }

    public static UpcommingEvent mapToEntity(UpcommingEventDto dto){
        return new UpcommingEvent(
                dto.getId(),
                dto.getTitle(),
                dto.getDescription(),
                dto.getEventDate(),
                dto.getImage(),
                dto.isActivate(),
                dto.isPopup()
        );
    }
}
