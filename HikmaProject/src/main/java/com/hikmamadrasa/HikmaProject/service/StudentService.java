package com.hikmamadrasa.HikmaProject.service;

import com.hikmamadrasa.HikmaProject.dto.StudentDto;

import java.util.List;

public interface StudentService {
    StudentDto save(StudentDto dto);
    List<StudentDto> getAll();
    void DeleteStudent(String year);
}
