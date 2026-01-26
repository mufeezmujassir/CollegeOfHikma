package com.hikmamadrasa.HikmaProject.service;

import com.hikmamadrasa.HikmaProject.dto.ManagementDto;
import com.hikmamadrasa.HikmaProject.entity.Managment;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ManagementService {
    ManagementDto createManagementMessage(ManagementDto managementDto, MultipartFile image);
    List<ManagementDto> getAllManagementMessage();
    ManagementDto updateManagementMessage(Long id,ManagementDto managementDto, MultipartFile image);
    void deleteManagementMessage(Long id);
}
