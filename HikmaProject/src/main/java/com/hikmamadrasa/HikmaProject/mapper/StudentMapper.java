package com.hikmamadrasa.HikmaProject.mapper;

import com.hikmamadrasa.HikmaProject.dto.StudentDto;
import com.hikmamadrasa.HikmaProject.entity.Student;

public class StudentMapper {


    public static StudentDto mapToStudentDto(Student student) {
        return new StudentDto(
                student.getId(),
                student.getIndexno(),
                student.getStudentname()
        );
    }

    public static Student mapToStudent(StudentDto studentDto) {
        return new Student(
                studentDto.getId(),
                studentDto.getIndexno(),
                studentDto.getStudentname()

        );
    }
}
