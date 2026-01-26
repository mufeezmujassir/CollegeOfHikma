package com.hikmamadrasa.HikmaProject.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="hero_slider")
public class HeroSlider {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 1000)
    private String thought;


    @Lob
    @Column(name = "image", columnDefinition = "LONGBLOB")
    private byte[] image;
}
