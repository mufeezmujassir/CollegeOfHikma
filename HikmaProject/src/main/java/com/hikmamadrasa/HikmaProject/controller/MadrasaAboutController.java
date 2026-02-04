package com.hikmamadrasa.HikmaProject.controller;

import com.hikmamadrasa.HikmaProject.dto.MadrasaAboutDto;
import com.hikmamadrasa.HikmaProject.service.MadrasaAboutService;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import tools.jackson.databind.ObjectMapper;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/auth/about")
public class MadrasaAboutController {
    private final MadrasaAboutService madrasaAboutService;
    private final ObjectMapper objectMapper;

    @PostMapping(consumes = "multipart/form-data")
    public ResponseEntity<MadrasaAboutDto> createAbout(
            @RequestPart("about") MadrasaAboutDto dto,
            @RequestPart(value = "image", required = false) MultipartFile image
    ) {
        return new ResponseEntity<>(
                madrasaAboutService.createMadrasaAbout(dto,image),
                HttpStatus.CREATED
        );
    }

    @GetMapping
    public ResponseEntity<List<MadrasaAboutDto>> getAllAbout() {
        return ResponseEntity.ok(madrasaAboutService.getAllMadrasaAbouts());
    }

    @PutMapping(value = "/{id}", consumes = "multipart/form-data")
    public ResponseEntity<MadrasaAboutDto> updateAbout(
            @PathVariable Long id,
            @RequestPart("about") MadrasaAboutDto dto,
            @RequestPart(value = "image", required = false) MultipartFile image
    ) {
       return ResponseEntity.ok(madrasaAboutService.updateMadrasaAbout(id,dto,image));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteAbout(@PathVariable Long id) {
        madrasaAboutService.deleteMadrasaAbout(id);
        return ResponseEntity.ok("About section deleted successfully");
    }
}
