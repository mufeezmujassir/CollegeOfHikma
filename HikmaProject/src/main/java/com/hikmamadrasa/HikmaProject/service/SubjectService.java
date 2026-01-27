package com.hikmamadrasa.HikmaProject.service;

import com.hikmamadrasa.HikmaProject.dto.SubjectDto;

import java.util.List;

public interface SubjectService {
    SubjectDto save(SubjectDto dto);
    List<SubjectDto> getAll();

}
