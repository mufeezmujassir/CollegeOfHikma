package com.hikmamadrasa.HikmaProject.mapper;

import com.hikmamadrasa.HikmaProject.dto.StaffDto;
import com.hikmamadrasa.HikmaProject.entity.Staff;

public class StaffMapper {

    public static StaffDto mapToDto(Staff staff) {
        return new StaffDto(
                staff.getId(),
                staff.getStaffName(),
                staff.getStaffEmail(),
                staff.getStaffQualification(),
                staff.getStaffJoinDate(),
                staff.getStaffImage()
        );
    }

    public static Staff mapToEntity(StaffDto dto) {
        return new Staff(
                dto.getId(),
                dto.getStaffName(),
                dto.getStaffEmail(),
                dto.getStaffQualification(),
                dto.getStaffJoinDate(),
                dto.getStaffImage()
        );
    }
}
