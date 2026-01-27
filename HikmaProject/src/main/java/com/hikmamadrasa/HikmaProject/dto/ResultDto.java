package com.hikmamadrasa.HikmaProject.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

public class ResultDto {
    private Long id;
    private Long subjectId;
    private Long studentId;
    private Integer mark;
    private String grade;
}
