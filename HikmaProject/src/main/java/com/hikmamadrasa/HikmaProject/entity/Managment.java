package com.hikmamadrasa.HikmaProject.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "managementMessage")
public class Managment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String position;
    @Lob
    @Column(columnDefinition = "TEXT")
    private String message;

    @Lob
    @Column(name="management_Image",columnDefinition="LONGBLOB")
    private byte[] image;
}
