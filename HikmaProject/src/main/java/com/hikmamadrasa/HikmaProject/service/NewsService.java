package com.hikmamadrasa.HikmaProject.service;

import com.hikmamadrasa.HikmaProject.dto.NewsDto;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface NewsService {
    NewsDto createNews(NewsDto newsDto, List<MultipartFile> images);
    NewsDto getNewsById(Long id);
    List<NewsDto> getAllNews();
    NewsDto updateNews(Long id, NewsDto newsDto, List<MultipartFile> newImages, List<Long> imageIdsToDelete);
    void deleteNews(Long id);
}
