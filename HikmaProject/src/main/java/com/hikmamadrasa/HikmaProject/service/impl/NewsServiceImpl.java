package com.hikmamadrasa.HikmaProject.service.impl;

import com.hikmamadrasa.HikmaProject.dto.NewsDto;
import com.hikmamadrasa.HikmaProject.entity.News;
import com.hikmamadrasa.HikmaProject.entity.NewsImage;
import com.hikmamadrasa.HikmaProject.exception.ResourceNotFoundException;
import com.hikmamadrasa.HikmaProject.mapper.NewsMapper;
import com.hikmamadrasa.HikmaProject.repository.NewsImageRepository;
import com.hikmamadrasa.HikmaProject.repository.NewsRepository;
import com.hikmamadrasa.HikmaProject.service.NewsService;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class NewsServiceImpl implements NewsService {

    private final NewsRepository newsRepository;
    private final NewsImageRepository newsImageRepository;

    @Override
    @Transactional
    public NewsDto createNews(NewsDto newsDto, List<MultipartFile> images) {
        News news=NewsMapper.mapToEntity(newsDto);

        // Add images (max 5)
        if (images != null && !images.isEmpty()) {
            int imageCount = Math.min(images.size(), 5);
            for (int i = 0; i < imageCount; i++) {
                MultipartFile imageFile = images.get(i);
                if (!imageFile.isEmpty()) {
                    try {
                        NewsImage newsImage = new NewsImage();
                        newsImage.setImageData(imageFile.getBytes());
                        news.addImage(newsImage);
                    } catch (IOException e) {
                        throw new RuntimeException("Failed to upload image", e);
                    }
                }
            }
        }

        News savedNews = newsRepository.save(news);
        return NewsMapper.mapToDto(savedNews);
    }

    @Override
    public NewsDto getNewsById(Long id) {
        News news=newsRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("News Not found"));
        return NewsMapper.mapToDto(news);
    }

    @Override
    public List<NewsDto> getAllNews() {
        return newsRepository.findAll().
                stream().map(NewsMapper::mapToDto).collect(Collectors.toList());
    }

    @Override
    public NewsDto updateNews(Long id, NewsDto newsDto, List<MultipartFile> newImages, List<Long> imageIdsToDelete) {
        News news = newsRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("News not found with id: " + id));

        // Update basic fields
        news.setTitle(newsDto.getTitle());
        news.setContent(newsDto.getContent());
        news.setPublishDate(newsDto.getPublishDate());

        // Delete specified images
        if (imageIdsToDelete != null && !imageIdsToDelete.isEmpty()) {
            List<NewsImage> imagesToRemove = news.getImages().stream()
                    .filter(img -> imageIdsToDelete.contains(img.getId()))
                    .collect(Collectors.toList());

            for (NewsImage image : imagesToRemove) {
                news.removeImage(image);
                newsImageRepository.delete(image);
            }
        }

        // Add new images (respecting max 5 total)
        if (newImages != null && !newImages.isEmpty()) {
            int currentImageCount = news.getImages().size();
            int availableSlots = 5 - currentImageCount;
            int imagesToAdd = Math.min(newImages.size(), availableSlots);

            for (int i = 0; i < imagesToAdd; i++) {
                MultipartFile imageFile = newImages.get(i);
                if (!imageFile.isEmpty()) {
                    try {
                        NewsImage newsImage = new NewsImage();
                        newsImage.setImageData(imageFile.getBytes());
                        news.addImage(newsImage);
                    } catch (IOException e) {
                        throw new RuntimeException("Failed to upload image", e);
                    }
                }
            }
        }

        News updatedNews = newsRepository.save(news);
        return NewsMapper.mapToDto(updatedNews);
    }

    @Override
    public void deleteNews(Long id) {
        News news = newsRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("News not found with id: " + id));
        newsRepository.delete(news);
    }
}
