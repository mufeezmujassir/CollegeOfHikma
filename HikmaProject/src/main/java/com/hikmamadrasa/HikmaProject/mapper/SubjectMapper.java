package com.hikmamadrasa.HikmaProject.mapper;

import com.hikmamadrasa.HikmaProject.dto.SubjectDto;
import com.hikmamadrasa.HikmaProject.entity.Subject;

public class SubjectMapper {

    public static SubjectDto mapToDto(Subject subject) {
        return new SubjectDto(
                subject.getId(),
                subject.getSubjectName()
        );
    }
    public static Subject mapToEntity(SubjectDto dto) {
        return new Subject(
                dto.getId(),
                dto.getSubjectName()
        );
    }
}
