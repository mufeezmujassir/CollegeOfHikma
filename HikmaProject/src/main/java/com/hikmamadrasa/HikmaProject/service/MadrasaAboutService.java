package com.hikmamadrasa.HikmaProject.service;


import com.hikmamadrasa.HikmaProject.dto.MadrasaAboutDto;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface MadrasaAboutService {

    MadrasaAboutDto createMadrasaAbout(MadrasaAboutDto madrasaAboutDto, MultipartFile image);
    MadrasaAboutDto getMadrasaAboutById(Long id);
    List<MadrasaAboutDto> getAllMadrasaAbouts();
    MadrasaAboutDto updateMadrasaAbout(Long id,MadrasaAboutDto madrasaAboutDto , MultipartFile image);
    void deleteMadrasaAbout(Long id);
}
