package com.hikmamadrasa.HikmaProject.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class NewsImageDto {
    private Long id;
    private byte[] imageData;
}
