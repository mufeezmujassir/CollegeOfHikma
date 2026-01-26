package com.hikmamadrasa.HikmaProject.service.impl;

import com.hikmamadrasa.HikmaProject.dto.StudentDto;
import com.hikmamadrasa.HikmaProject.entity.Student;
import com.hikmamadrasa.HikmaProject.exception.ResourceNotFoundException;
import com.hikmamadrasa.HikmaProject.mapper.StudentMapper;
import com.hikmamadrasa.HikmaProject.repository.StudentRepository;
import com.hikmamadrasa.HikmaProject.service.StudentService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class StudentServiceImpl implements StudentService {

    private StudentRepository studentRepository;
    @Override
    public StudentDto createStudent(StudentDto studentDto) {
        Student student = StudentMapper.mapToStudent(studentDto);
        Student savedStudent = studentRepository.save(student);

        return StudentMapper.mapToStudentDto(savedStudent);
    }

    @Override
    public StudentDto getStudentById(long id) {
        Student student=studentRepository.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException("Student is not exist with given id: "+id));

        return StudentMapper.mapToStudentDto(student);

    }

    @Override
    public List<StudentDto> getAllStudents() {
        List<Student> students=studentRepository.findAll();
        return students.stream().map((student)->StudentMapper.mapToStudentDto(student)).collect(Collectors.toList());
    }

    @Override
    public StudentDto updateStudent(Long id, StudentDto updatedstudent) {
        Student student=studentRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("Student is not exist with given id: "+id));
        student.setIndexno(updatedstudent.getIndexno());
        student.setStudentname(updatedstudent.getStudentname());

        Student updateedEmployeeObj=studentRepository.save(student);
        return StudentMapper.mapToStudentDto(updateedEmployeeObj);
    }

    @Override
    public void deleteStudent(long id) {
        Student student=studentRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("Student is not exist with given id: "+id));
        studentRepository.deleteById(id);
    }
}
