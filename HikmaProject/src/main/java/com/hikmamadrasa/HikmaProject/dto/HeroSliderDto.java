package com.hikmamadrasa.HikmaProject.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class HeroSliderDto {
    private Long id;
    private String thought;
    private byte[] image;

}
