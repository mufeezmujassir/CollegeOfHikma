package com.hikmamadrasa.HikmaProject.entity;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "staff")
public class Staff {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "staff_name", nullable = false)
    private String staffName;

    @Column(name = "staff_email", nullable = false, unique = true)
    private String staffEmail;

    @Column(name = "staff_qualification")
    private String staffQualification;

    @Column(name = "staff_join_date")
    private String staffJoinDate;

    @Lob
    @Column(name = "staff_image", columnDefinition = "LONGBLOB")
    private byte[] staffImage;
}
