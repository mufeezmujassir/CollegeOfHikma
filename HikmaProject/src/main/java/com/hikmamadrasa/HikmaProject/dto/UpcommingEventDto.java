package com.hikmamadrasa.HikmaProject.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor


public class UpcommingEventDto {

    private Long id;
    private String title;
    private String description;
    private String EventDate;
    private byte[] image;
    private boolean isActivate;
    private boolean isPopup;
}
