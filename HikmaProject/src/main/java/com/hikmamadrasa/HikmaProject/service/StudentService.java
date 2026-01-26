package com.hikmamadrasa.HikmaProject.service;

import com.hikmamadrasa.HikmaProject.dto.StudentDto;

import java.util.List;

public interface StudentService {

    StudentDto createStudent(StudentDto studentDto);
    StudentDto getStudentById(long id);
    List<StudentDto> getAllStudents();

    StudentDto updateStudent( Long id,StudentDto updatedstudent);
    void deleteStudent(long id);
}
