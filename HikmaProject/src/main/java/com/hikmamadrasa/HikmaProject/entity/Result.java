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
@Entity(name="result")

public class Result {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;


    @Column(name="student_id",nullable=false)
    private  String student_id;

    @Column(name="subject_name",nullable=false)
    private String subject_name;

    @Column(name="grade",nullable=false)
    private String grade;

    @Column(name="exam_year",nullable = false)
    private String exam_year;


}
