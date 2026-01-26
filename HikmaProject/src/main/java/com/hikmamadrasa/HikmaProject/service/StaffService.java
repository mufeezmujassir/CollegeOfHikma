package com.hikmamadrasa.HikmaProject.service;

import com.hikmamadrasa.HikmaProject.dto.StaffDto;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface StaffService {

    StaffDto createStaff(StaffDto staffDto, MultipartFile image);
    StaffDto getStaffById(Long id);
    List<StaffDto> getAllStaff();
    StaffDto updateStaff(Long id, StaffDto staffDto, MultipartFile image);
    void deleteStaff(Long id);
}
