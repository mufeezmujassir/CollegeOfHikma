package com.hikmamadrasa.HikmaProject.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
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

    @JsonProperty("EventDate")
    private String EventDate;

    private byte[] image;

    @JsonProperty("isActivate")
    private boolean isActivate;

    @JsonProperty("isPopup")
    private boolean isPopup;
}
