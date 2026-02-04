package com.hikmamadrasa.HikmaProject.controller;

import com.hikmamadrasa.HikmaProject.dto.StaffDto;
import com.hikmamadrasa.HikmaProject.service.StaffService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/auth/staff")
public class StaffController {

    private final StaffService staffService;

    @PostMapping(consumes = "multipart/form-data")
    public ResponseEntity<StaffDto> createStaff(
            @RequestPart("staff") StaffDto staffDto,
            @RequestPart(value = "image", required = false) MultipartFile image
    ) {
        return new ResponseEntity<>(
                staffService.createStaff(staffDto, image),
                HttpStatus.CREATED
        );
    }

    @GetMapping
    public ResponseEntity<List<StaffDto>> getAllStaff() {
        return ResponseEntity.ok(staffService.getAllStaff());
    }

    @GetMapping("/{id}")
    public ResponseEntity<StaffDto> getStaffById(@PathVariable Long id) {
        return ResponseEntity.ok(staffService.getStaffById(id));
    }

    @PutMapping(value = "/{id}", consumes = "multipart/form-data")
    public ResponseEntity<StaffDto> updateStaff(
            @PathVariable Long id,
            @RequestPart("staff") StaffDto staffDto,
            @RequestPart(value = "image", required = false) MultipartFile image
    ) {
        return ResponseEntity.ok(staffService.updateStaff(id, staffDto, image));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteStaff(@PathVariable Long id) {
        staffService.deleteStaff(id);
        return ResponseEntity.ok("Staff deleted successfully");
    }
}
