package com.hikmamadrasa.HikmaProject.controller;

import com.hikmamadrasa.HikmaProject.dto.SubjectDto;
import com.hikmamadrasa.HikmaProject.service.SubjectService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/auth/subject")
@CrossOrigin(origins = "http://localhost:3000")
@AllArgsConstructor
public class SubjectController {

    private final SubjectService subjectService;

    @GetMapping
    public List<SubjectDto> getAll(){
        return subjectService.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<SubjectDto> getById(@PathVariable Long id){
        SubjectDto dto = subjectService.getAll().stream().filter(s -> s.getId().equals(id)).findFirst().orElse(null);
        return dto != null ? ResponseEntity.ok(dto) : ResponseEntity.notFound().build();
    }

}