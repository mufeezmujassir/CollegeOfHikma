package com.hikmamadrasa.HikmaProject.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class StaffDto {

    private Long id;
    private String staffName;
    private String staffEmail;
    private String staffQualification;
    private String staffJoinDate;
    private byte[] staffImage;
}
