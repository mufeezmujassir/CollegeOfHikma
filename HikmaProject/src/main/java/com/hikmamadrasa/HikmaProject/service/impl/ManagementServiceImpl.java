package com.hikmamadrasa.HikmaProject.service.impl;

import com.hikmamadrasa.HikmaProject.dto.ManagementDto;
import com.hikmamadrasa.HikmaProject.entity.Managment;
import com.hikmamadrasa.HikmaProject.mapper.ManagementMapper;
import com.hikmamadrasa.HikmaProject.repository.ManagementRepository;
import com.hikmamadrasa.HikmaProject.service.ManagementService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ManagementServiceImpl implements ManagementService {
    private final ManagementRepository managementRepository;
    @Override
    public ManagementDto createManagementMessage(ManagementDto managementDto, MultipartFile image) {
        Managment management = ManagementMapper.mapToEntity(managementDto);
        try{
            if(image!=null && !image.isEmpty()){
                management.setImage(image.getBytes());
            }
        }catch (IOException e){
            throw new RuntimeException("Failed to upload the image ");
        }
        Managment saved=managementRepository.save(management);
        return ManagementMapper.mapToDto(saved);
    }

    @Override
    public List<ManagementDto> getAllManagementMessage() {
        return managementRepository.findAll().stream().map(ManagementMapper::mapToDto).collect(Collectors.toList());
    }

    @Override
    public ManagementDto updateManagementMessage(Long id, ManagementDto managementDto, MultipartFile image) {
        Managment managment=managementRepository.findById(id).orElseThrow(()->new RuntimeException("Management message not found"));
        managment.setMessage(managementDto.getMessage());
        managment.setName(managementDto.getName());
        managment.setPosition(managementDto.getPosition());
        try{
            if(image!=null && !image.isEmpty()){
                managment.setImage(image.getBytes());

            }
        }
        catch (IOException e){
            throw new RuntimeException("Failed to upload the image ");
        }
        return ManagementMapper.mapToDto(managementRepository.save(managment));
    }

    @Override
    public void deleteManagementMessage(Long id) {
        Managment management=managementRepository.findById(id).orElseThrow(()->new RuntimeException(("Management message not found")));
        managementRepository.delete(management);

    }


}
