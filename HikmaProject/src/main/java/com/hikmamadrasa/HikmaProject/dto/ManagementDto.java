package com.hikmamadrasa.HikmaProject.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ManagementDto {

    private Long id;
    private String name;
    private String position;
    private String message;
    private byte[] image;
}
