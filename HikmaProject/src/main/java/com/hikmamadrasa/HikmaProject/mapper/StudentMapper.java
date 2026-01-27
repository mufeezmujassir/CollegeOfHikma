package com.hikmamadrasa.HikmaProject.mapper;

import com.hikmamadrasa.HikmaProject.dto.StudentDto;
import com.hikmamadrasa.HikmaProject.entity.Student;

public class StudentMapper {

    public static StudentDto mapToDto(Student student) {
        return new StudentDto(
                student.getId(),
                student.getIndexNumber(),
                student.getName(),
                student.getYear(),
                student.getSemester()
        );
    }

    public static Student mapToEntity(StudentDto dto){
        return new Student(
                dto.getId(),
                dto.getIndexNumber(),
                dto.getName(),
                dto.getYear(),
                dto.getSemester()
        );
    }
}
