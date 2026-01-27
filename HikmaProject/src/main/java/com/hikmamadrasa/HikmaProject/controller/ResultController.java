package com.hikmamadrasa.HikmaProject.controller;


import com.hikmamadrasa.HikmaProject.dto.ResultDto;
import com.hikmamadrasa.HikmaProject.service.ResultService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/auth/result")
@CrossOrigin(origins = "http://localhost:3000")
@AllArgsConstructor
public class ResultController {

    private final ResultService resultService;

    @PostMapping
    public ResponseEntity<String> uploadExcel(@RequestParam("file") MultipartFile file) {
        resultService.uploadExcel(file);
        return ResponseEntity.ok("Upload completed");
    }
    @GetMapping
    public List<ResultDto> getAll(){
        return resultService.getAll();
    }

}
