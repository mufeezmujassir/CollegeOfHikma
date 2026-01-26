package com.hikmamadrasa.HikmaProject.mapper;

import com.hikmamadrasa.HikmaProject.dto.NewsDto;
import com.hikmamadrasa.HikmaProject.dto.NewsImageDto;
import com.hikmamadrasa.HikmaProject.entity.News;
import com.hikmamadrasa.HikmaProject.entity.NewsImage;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class NewsMapper {

    public static NewsDto mapToDto(News news) {
        NewsDto dto = new NewsDto();
        dto.setId(news.getId());
        dto.setTitle(news.getTitle());
        dto.setContent(news.getContent());
        dto.setPublishDate(news.getPublishDate());

        if (news.getImages() != null) {
            dto.setImages(news.getImages().stream()
                    .map(NewsMapper::mapImageToDto)
                    .collect(Collectors.toList()));
        } else {
            dto.setImages(new ArrayList<>());
        }

        return dto;
    }

    public static News mapToEntity(NewsDto dto) {
        News news = new News();
        news.setId(dto.getId());
        news.setTitle(dto.getTitle());
        news.setContent(dto.getContent());
        news.setPublishDate(dto.getPublishDate());
        news.setImages(new ArrayList<>());
        return news;
    }

    public static NewsImageDto mapImageToDto(NewsImage image) {
        NewsImageDto dto = new NewsImageDto();
        dto.setId(image.getId());
        dto.setImageData(image.getImageData());
        return dto;
    }

    public static NewsImage mapImageToEntity(NewsImageDto dto) {
        NewsImage image = new NewsImage();
        image.setId(dto.getId());
        image.setImageData(dto.getImageData());
        return image;
    }
}