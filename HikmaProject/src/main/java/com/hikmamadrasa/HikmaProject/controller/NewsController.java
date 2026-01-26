package com.hikmamadrasa.HikmaProject.controller;

import com.hikmamadrasa.HikmaProject.dto.NewsDto;
import com.hikmamadrasa.HikmaProject.service.NewsService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import tools.jackson.databind.ObjectMapper;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/auth/news")
@CrossOrigin(origins = "http://localhost:3000")
public class NewsController {

    private final NewsService newsService;
    private final ObjectMapper objectMapper;

    @PostMapping(consumes = "multipart/form-data")
    public ResponseEntity<NewsDto> createNews(
            @RequestPart("news") String newsJson,
            @RequestPart(value = "images", required = false) List<MultipartFile> images
    ) {
        try {
            NewsDto newsDto = objectMapper.readValue(newsJson, NewsDto.class);
            return new ResponseEntity<>(
                    newsService.createNews(newsDto, images),
                    HttpStatus.CREATED
            );
        } catch (Exception e) {
            throw new RuntimeException("Failed to create news", e);
        }
    }

    @GetMapping
    public ResponseEntity<List<NewsDto>> getAllNews() {
        return ResponseEntity.ok(newsService.getAllNews());
    }

    @GetMapping("/{id}")
    public ResponseEntity<NewsDto> getNewsById(@PathVariable Long id) {
        return ResponseEntity.ok(newsService.getNewsById(id));
    }

    @PutMapping(value = "/{id}", consumes = "multipart/form-data")
    public ResponseEntity<NewsDto> updateNews(
            @PathVariable Long id,
            @RequestPart("news") String newsJson,
            @RequestPart(value = "images", required = false) List<MultipartFile> newImages,
            @RequestPart(value = "imageIdsToDelete", required = false) String imageIdsToDeleteJson
    ) {
        try {
            NewsDto newsDto = objectMapper.readValue(newsJson, NewsDto.class);
            List<Long> imageIdsToDelete = null;

            if (imageIdsToDeleteJson != null && !imageIdsToDeleteJson.isEmpty()) {
                imageIdsToDelete = objectMapper.readValue(
                        imageIdsToDeleteJson,
                        objectMapper.getTypeFactory().constructCollectionType(List.class, Long.class)
                );
            }

            return ResponseEntity.ok(newsService.updateNews(id, newsDto, newImages, imageIdsToDelete));
        } catch (Exception e) {
            throw new RuntimeException("Failed to update news", e);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteNews(@PathVariable Long id) {
        newsService.deleteNews(id);
        return ResponseEntity.ok("News deleted successfully");
    }
}