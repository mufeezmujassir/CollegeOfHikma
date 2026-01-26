package com.hikmamadrasa.HikmaProject.controller;


import com.hikmamadrasa.HikmaProject.dto.StudentDto;
import com.hikmamadrasa.HikmaProject.mapper.StudentMapper;
import com.hikmamadrasa.HikmaProject.service.StudentService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/student")
public class StudentController {
    private StudentService studentService;

    //build to add the student to the system
    @PostMapping
    public ResponseEntity<StudentDto> createStudent(@RequestBody StudentDto studentDto) {
        StudentDto savedStudent=studentService.createStudent(studentDto);
        return new ResponseEntity<>(savedStudent, HttpStatus.CREATED);
    }

    @GetMapping("{id}")
    public ResponseEntity<StudentDto> getStudentById(@PathVariable("id") long stid) {
       StudentDto studentDto= studentService.getStudentById(stid);
       return ResponseEntity.ok(studentDto);
    }

    @GetMapping
    public ResponseEntity<List<StudentDto>> getAllStudents() {
        List<StudentDto> students=studentService.getAllStudents();
        return ResponseEntity.ok(students);
    }

    @PutMapping("{id}")
    public ResponseEntity<StudentDto> updateStudent( @PathVariable("id") Long id,@RequestBody StudentDto studentDto) {
            StudentDto savedStudent=studentService.updateStudent(id, studentDto);
            return ResponseEntity.ok(savedStudent);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteStudent(@PathVariable("id") long stid) {
        studentService.deleteStudent(stid);
        return ResponseEntity.ok("Student deleted successfully");
    }

}
