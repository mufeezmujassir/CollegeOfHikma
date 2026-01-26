package com.hikmamadrasa.HikmaProject.service.impl;

import com.hikmamadrasa.HikmaProject.dto.MadrasaAboutDto;
import com.hikmamadrasa.HikmaProject.entity.MadrasaAbout;
import com.hikmamadrasa.HikmaProject.mapper.MadrasaMapper;
import com.hikmamadrasa.HikmaProject.repository.MadrsaAboutRepository;
import com.hikmamadrasa.HikmaProject.service.MadrasaAboutService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class MadrasaAboutServiceImpl implements MadrasaAboutService {
    private final MadrsaAboutRepository madrsaAboutRepository;

    @Override
    public MadrasaAboutDto createMadrasaAbout(MadrasaAboutDto madrasaAboutDto, MultipartFile image) {
        MadrasaAbout madrasaabout= MadrasaMapper.mapToEntity(madrasaAboutDto);
        try{
            if(image!=null && !image.isEmpty()){
                madrasaabout.setImage(image.getBytes());
            }
        }catch(Exception e){
            throw new RuntimeException("Failed to upload the image ");
        }
        MadrasaAbout saved=madrsaAboutRepository.save(madrasaabout);

        return MadrasaMapper.mapToDto(saved);
    }

    @Override
    public MadrasaAboutDto getMadrasaAboutById(Long id) {
        MadrasaAbout madrasaAbout=madrsaAboutRepository.findById(id).orElseThrow(()-> new RuntimeException(("Could not find madrasa about with id " + id)));
        return MadrasaMapper.mapToDto(madrasaAbout);
    }

    @Override
    public List<MadrasaAboutDto> getAllMadrasaAbouts() {
        return madrsaAboutRepository.findAll().stream().map(MadrasaMapper::mapToDto).collect(Collectors.toList());
    }

    @Override
    public MadrasaAboutDto updateMadrasaAbout(Long id,MadrasaAboutDto madrasaAboutDto, MultipartFile image) {
        MadrasaAbout madrasaAbout=madrsaAboutRepository.findById(id).orElseThrow(()-> new RuntimeException(("Could not find madrasa about with id " + id)));
        madrasaAbout.setId(madrasaAbout.getId());
        madrasaAbout.setTitle(madrasaAboutDto.getTitle());
        madrasaAbout.setDescription(madrasaAboutDto.getDescription());
        try{
            if(image!=null && !image.isEmpty()){
                madrasaAbout.setImage(image.getBytes());
            }
        }
        catch(Exception e){
            throw new RuntimeException("Failed to upload the image ");
        }
        return MadrasaMapper.mapToDto(madrsaAboutRepository.save(madrasaAbout));
    }

    @Override
    public void deleteMadrasaAbout(Long id) {
        MadrasaAbout madrasaAbout=madrsaAboutRepository.findById(id).orElseThrow(()-> new RuntimeException(("Could not find madrasa about with id " + id)));
        madrsaAboutRepository.delete(madrasaAbout);
    }
}
