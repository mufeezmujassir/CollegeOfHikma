package com.hikmamadrasa.HikmaProject.service.impl;

import com.hikmamadrasa.HikmaProject.dto.StaffDto;
import com.hikmamadrasa.HikmaProject.entity.Staff;
import com.hikmamadrasa.HikmaProject.exception.ResourceNotFoundException;
import com.hikmamadrasa.HikmaProject.mapper.StaffMapper;
import com.hikmamadrasa.HikmaProject.repository.StaffRepository;
import com.hikmamadrasa.HikmaProject.service.StaffService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class StaffServiceImpl implements StaffService {

    private final StaffRepository staffRepository;

    @Override
    public StaffDto createStaff(StaffDto staffDto, MultipartFile image) {
        Staff staff = StaffMapper.mapToEntity(staffDto);

        try {
            if (image != null && !image.isEmpty()) {
                staff.setStaffImage(image.getBytes());
            }
        } catch (IOException e) {
            throw new RuntimeException("Image upload failed", e);
        }

        Staff saved = staffRepository.save(staff);
        return StaffMapper.mapToDto(saved);
    }

    @Override
    public StaffDto getStaffById(Long id) {
        Staff staff = staffRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Staff not found with id: " + id));

        return StaffMapper.mapToDto(staff);
    }

    @Override
    public List<StaffDto> getAllStaff() {
        return staffRepository.findAll()
                .stream()
                .map(StaffMapper::mapToDto)
                .collect(Collectors.toList());
    }

    @Override
    public StaffDto updateStaff(Long id, StaffDto staffDto, MultipartFile image) {
        Staff staff = staffRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Staff not found with id: " + id));

        staff.setStaffName(staffDto.getStaffName());
        staff.setStaffEmail(staffDto.getStaffEmail());
        staff.setStaffQualification(staffDto.getStaffQualification());
        staff.setStaffJoinDate(staffDto.getStaffJoinDate());

        try {
            if (image != null && !image.isEmpty()) {
                staff.setStaffImage(image.getBytes());
            }
        } catch (IOException e) {
            throw new RuntimeException("Image update failed", e);
        }

        return StaffMapper.mapToDto(staffRepository.save(staff));
    }

    @Override
    public void deleteStaff(Long id) {
        Staff staff = staffRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Staff not found with id: " + id));

        staffRepository.delete(staff);
    }
}
