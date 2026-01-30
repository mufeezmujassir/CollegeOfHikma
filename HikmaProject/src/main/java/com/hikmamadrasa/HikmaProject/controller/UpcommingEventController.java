package com.hikmamadrasa.HikmaProject.controller;

import com.hikmamadrasa.HikmaProject.dto.UpcommingEventDto;
import com.hikmamadrasa.HikmaProject.entity.UpcommingEvent;
import com.hikmamadrasa.HikmaProject.service.UpcommingEventService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/auth/event")
public class UpcommingEventController {
    private final UpcommingEventService upcommingEventService;

    @PostMapping(consumes = "multipart/form-data")
    public ResponseEntity<UpcommingEventDto> createEvent(@RequestPart("event") UpcommingEventDto dto, @RequestPart(value="image",required = false) MultipartFile file) {
            return new ResponseEntity<>(
                    upcommingEventService.addUpcommingEvent(dto,file), HttpStatus.CREATED
            );
    }
    @PutMapping(value = "/{id}", consumes = "multipart/form-data")
    public ResponseEntity<UpcommingEventDto> updateEvent(@PathVariable("id") Long id, @RequestPart("event") UpcommingEventDto dto, @RequestPart(value="image",required = false) MultipartFile file) {
        return ResponseEntity.ok(upcommingEventService.updateUpcommingEvent(id,dto,file));
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteEvent(@PathVariable("id") Long id) {
        upcommingEventService.deleteUpcommingEvent(id);
        return  ResponseEntity.ok("Event deleted successfully");
    }
    @GetMapping
    public ResponseEntity<List<UpcommingEventDto>> getAllEvents() {
        return ResponseEntity.ok(upcommingEventService.getAllUpcommingEvent());
    }
}
