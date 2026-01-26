package com.hikmamadrasa.HikmaProject.entity;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="student")


public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="index_no",nullable=false,unique=true)
    private String indexno;

    @Column(name="student_name",nullable=false)
    private String studentname;

}
