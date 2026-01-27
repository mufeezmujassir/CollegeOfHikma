package com.hikmamadrasa.HikmaProject.service.impl;

import com.hikmamadrasa.HikmaProject.dto.SubjectDto;
import com.hikmamadrasa.HikmaProject.entity.Subject;
import com.hikmamadrasa.HikmaProject.mapper.SubjectMapper;
import com.hikmamadrasa.HikmaProject.repository.SubjectRepository;
import com.hikmamadrasa.HikmaProject.service.SubjectService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class SubjectServiceImpl implements SubjectService {

    private final SubjectRepository subjectRepository;

    @Override
    public SubjectDto save(SubjectDto dto) {
        Subject subject = SubjectMapper.mapToEntity(dto);
        return SubjectMapper.mapToDto(subjectRepository.save(subject));
    }

    @Override
    public List<SubjectDto> getAll() {
        return subjectRepository.findAll().stream().map(SubjectMapper::mapToDto).collect(Collectors.toList());
    }
}