package com.hikmamadrasa.HikmaProject.controller;

import com.hikmamadrasa.HikmaProject.dto.StudentDto;
import com.hikmamadrasa.HikmaProject.service.StudentService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/auth/student")
@AllArgsConstructor
public class StudentController {

    private final StudentService studentService;

    @GetMapping
    public List<StudentDto> getAll(){
        return studentService.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<StudentDto> getById(@PathVariable Long id){
        StudentDto dto = studentService.getAll().stream().filter(s -> s.getId().equals(id)).findFirst().orElse(null);
        return dto != null ? ResponseEntity.ok(dto) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{year}")
    public ResponseEntity<String> deleteByYear(@PathVariable String year) {
        studentService.DeleteStudent(year);
        return ResponseEntity.ok("Students and results deleted successfully");
    }
}