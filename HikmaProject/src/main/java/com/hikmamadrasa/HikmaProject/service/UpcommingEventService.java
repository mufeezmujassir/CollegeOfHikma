package com.hikmamadrasa.HikmaProject.service;

import com.hikmamadrasa.HikmaProject.dto.UpcommingEventDto;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface UpcommingEventService {
    UpcommingEventDto addUpcommingEvent(UpcommingEventDto upcommingEventDto, MultipartFile image);
    UpcommingEventDto updateUpcommingEvent(Long id, UpcommingEventDto upcommingEventDto, MultipartFile image);
    void deleteUpcommingEvent(Long id);

    List<UpcommingEventDto> getAllUpcommingEvent();
}
