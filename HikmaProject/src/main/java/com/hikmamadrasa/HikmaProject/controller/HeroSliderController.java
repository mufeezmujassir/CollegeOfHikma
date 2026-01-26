package com.hikmamadrasa.HikmaProject.controller;

import com.hikmamadrasa.HikmaProject.dto.HeroSliderDto;
import com.hikmamadrasa.HikmaProject.service.HeroSliderService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/auth/hero")
@CrossOrigin(origins = "http://localhost:3000")

public class HeroSliderController {

    private final HeroSliderService heroSliderService;

    @PostMapping(consumes = "multipart/form-data")
    public ResponseEntity<HeroSliderDto> createHeroSlider(@RequestPart("hero") HeroSliderDto heroSliderDto, @RequestPart(value="image",required = false) MultipartFile image) {
        return new ResponseEntity<>(
                heroSliderService.createHeroSlider(heroSliderDto,image),
                HttpStatus.CREATED
        );
    }
    @GetMapping("/{id}")
    public ResponseEntity<HeroSliderDto> getHeroSliderById(@PathVariable Long id) {
        return ResponseEntity.ok(heroSliderService.getHeroSliderById(id));


    }
    @GetMapping
    public ResponseEntity<List<HeroSliderDto>> getAllHeroSliders() {
        return ResponseEntity.ok(heroSliderService.getAllHeroSliders());
    }

    @PutMapping("/{id}")
    public ResponseEntity<HeroSliderDto> UpdateHeroSlider(@PathVariable Long id,@RequestPart("hero") HeroSliderDto herodto, @RequestPart(value="image",required = false) MultipartFile image) {
        return ResponseEntity.ok(heroSliderService.updateHeroSliderById(id,herodto,image));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteHeroSlider(@PathVariable Long id){
        heroSliderService.deleteHeroSliderById(id);
        return ResponseEntity.ok("Deleted Hero Slider with id: " + id);
    }
}
