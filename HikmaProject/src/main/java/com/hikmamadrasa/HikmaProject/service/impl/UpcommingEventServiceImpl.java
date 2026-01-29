package com.hikmamadrasa.HikmaProject.service.impl;

import com.hikmamadrasa.HikmaProject.dto.UpcommingEventDto;
import com.hikmamadrasa.HikmaProject.entity.UpcommingEvent;
import com.hikmamadrasa.HikmaProject.mapper.UpcommingEventMapper;
import com.hikmamadrasa.HikmaProject.repository.UpcommingEventRepository;
import com.hikmamadrasa.HikmaProject.service.UpcommingEventService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class UpcommingEventServiceImpl implements UpcommingEventService {
    private final UpcommingEventRepository upcommingEventRepository;
    @Override
    public UpcommingEventDto addUpcommingEvent(UpcommingEventDto upcommingEventDto, MultipartFile image) {
        UpcommingEvent upcommingEvent= UpcommingEventMapper.mapToEntity(upcommingEventDto);
        try{
            if(image!=null && !image.isEmpty()){
                upcommingEvent.setImage(image.getBytes());
            }

        }catch (Exception e){
            e.printStackTrace();
            throw new RuntimeException("Image image is not inserted");
        }
        UpcommingEvent saved=upcommingEventRepository.save(upcommingEvent);


        return UpcommingEventMapper.mapToDto(saved);
    }

    @Override
    public UpcommingEventDto updateUpcommingEvent(Long id, UpcommingEventDto dto, MultipartFile image) {
        UpcommingEvent upcommingEvent= upcommingEventRepository.findById(id).orElseThrow(()->new RuntimeException("UpcommingEvent not found"));
        upcommingEvent.setTitle(dto.getTitle());
        upcommingEvent.setDescription(dto.getDescription());
        upcommingEvent.setEventDate(dto.getEventDate());
        upcommingEvent.setActivate(dto.isActivate());
        upcommingEvent.setPopup(dto.isPopup());
        try{
            if(image!=null && !image.isEmpty()){
                upcommingEvent.setImage(image.getBytes());
            }
        }catch (Exception e){
            e.printStackTrace();
            throw new RuntimeException("Image image is not inserted");
        }

        return UpcommingEventMapper.mapToDto(upcommingEventRepository.save(upcommingEvent));
    }

    @Override
    public void deleteUpcommingEvent(Long id) {
        UpcommingEvent upcommingEvent= upcommingEventRepository.findById(id).orElseThrow(()->new RuntimeException("UpcommingEvent not found"));

        upcommingEventRepository.delete(upcommingEvent);

    }

    @Override
    public List<UpcommingEventDto> getAllUpcommingEvent() {
        return upcommingEventRepository.findAll().stream().map(UpcommingEventMapper::mapToDto).collect(Collectors.toList());

    }
}
