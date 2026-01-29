package com.hikmamadrasa.HikmaProject.service.impl;

import com.hikmamadrasa.HikmaProject.dto.StudentDto;
import com.hikmamadrasa.HikmaProject.entity.Student;
import com.hikmamadrasa.HikmaProject.mapper.StudentMapper;
import com.hikmamadrasa.HikmaProject.repository.ResultRepository;
import com.hikmamadrasa.HikmaProject.repository.StudentRepository;
import com.hikmamadrasa.HikmaProject.service.StudentService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
import jakarta.transaction.Transactional;

@Service
@AllArgsConstructor
public class StudentServiceImpl implements StudentService {

    private final StudentRepository studentRepository;
    private final ResultRepository resultRepository;
    @Override
    public StudentDto save(StudentDto dto) {
        Student student = StudentMapper.mapToEntity(dto);
        return StudentMapper.mapToDto(studentRepository.save(student));
    }

    @Override
    public List<StudentDto> getAll() {
        return studentRepository.findAll().stream().map(StudentMapper::mapToDto).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public void DeleteStudent(String year) {
            List<Student> students = studentRepository.findAllByYear(year);
            if(students.isEmpty()){
                return;
            }
            List<Long> studentIds = students.stream().map(Student::getId).toList();
            resultRepository.deleteByStudentIds(studentIds);
            studentRepository.deleteByYear(year);

    }
}