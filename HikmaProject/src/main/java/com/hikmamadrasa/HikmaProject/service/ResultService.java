package com.hikmamadrasa.HikmaProject.service;

import com.hikmamadrasa.HikmaProject.dto.ResultDto;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ResultService {
    ResultDto save (ResultDto dto);
    List<ResultDto> getAll();
    void uploadExcel(MultipartFile file);
    ResultDto getResultSpecific(String indexNumber,String name);
}
