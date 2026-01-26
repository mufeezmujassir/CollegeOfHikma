package com.hikmamadrasa.HikmaProject.dto;

import lombok.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class NewsDto {
    private Long id;
    private String title;
    private String content;
    private LocalDate publishDate;
    private List<NewsImageDto> images = new ArrayList<>();
}
