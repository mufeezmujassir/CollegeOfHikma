package com.hikmamadrasa.HikmaProject.controller;

import com.hikmamadrasa.HikmaProject.dto.ManagementDto;
import com.hikmamadrasa.HikmaProject.service.ManagementService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("api/auth/message")
@AllArgsConstructor
public class ManagementController {
    private final ManagementService managementService;

    @PostMapping(consumes = "multipart/form-data")
    public ResponseEntity<ManagementDto> createManagementMessage(@RequestPart("message") ManagementDto dto,
                                                                 @RequestPart(value="image",required = false)MultipartFile image) {
        return new ResponseEntity<>(
                managementService.createManagementMessage(dto,image),
        HttpStatus.CREATED
                );
    }
    @GetMapping
    public ResponseEntity<List<ManagementDto>> getManagementMessages() {
        return ResponseEntity.ok(managementService.getAllManagementMessage());
    }

    @PutMapping(value="/{id}",consumes = "multipart/form-data")
    public ResponseEntity<ManagementDto> updateMessage(@PathVariable Long id, @RequestPart("message") ManagementDto dto, @RequestPart(value="image",required = false) MultipartFile image) {
        return ResponseEntity.ok(managementService.updateManagementMessage(id,dto,image));
    }

    @DeleteMapping(value="/{id}")
    public ResponseEntity<String> deleteMessage(@PathVariable Long id) {
        managementService.deleteManagementMessage(id);
        return ResponseEntity.ok("Message Deleted Successfully");
    }

}
