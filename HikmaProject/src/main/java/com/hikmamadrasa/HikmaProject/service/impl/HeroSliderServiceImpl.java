package com.hikmamadrasa.HikmaProject.service.impl;

import com.hikmamadrasa.HikmaProject.dto.HeroSliderDto;
import com.hikmamadrasa.HikmaProject.entity.HeroSlider;
import com.hikmamadrasa.HikmaProject.mapper.HeroSliderMapper;
import com.hikmamadrasa.HikmaProject.repository.HeroSliderRepository;
import com.hikmamadrasa.HikmaProject.service.HeroSliderService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class HeroSliderServiceImpl implements HeroSliderService {
    private final HeroSliderRepository heroSliderRepository;

    @Override
    public HeroSliderDto createHeroSlider(HeroSliderDto heroSliderDto, MultipartFile image) {
        HeroSlider heroSlider= HeroSliderMapper.mapToEntity(heroSliderDto);
        try {
            if(image != null && !image.isEmpty()) {
                heroSlider.setImage(image.getBytes());
            }
        }catch (Exception e){
            throw new RuntimeException("Image uploaded failed");
        }
        HeroSlider heroSliderSaved = heroSliderRepository.save(heroSlider);
        return HeroSliderMapper.mapToDto(heroSliderSaved);
    }

    @Override
    public HeroSliderDto getHeroSliderById(Long id) {
        HeroSlider heroSlider=heroSliderRepository.findById(id).orElseThrow(()->new RuntimeException("Hero Slider not found"));

        return HeroSliderMapper.mapToDto(heroSlider);
    }

    @Override
    public List<HeroSliderDto> getAllHeroSliders() {
        return heroSliderRepository.findAll().stream().map(HeroSliderMapper::mapToDto).collect(Collectors.toList());
    }

    @Override
    public HeroSliderDto updateHeroSliderById(Long id, HeroSliderDto heroSliderDto, MultipartFile image) {
        HeroSlider heroSlider=heroSliderRepository.findById(id).orElseThrow(()->new RuntimeException("Hero Slider not found"));
        heroSlider.setThought(heroSliderDto.getThought());


        try{
            if(image!=null&&!image.isEmpty()){
                heroSlider.setImage(image.getBytes());
            }
        }catch (Exception e){
            throw new RuntimeException("Image uploaded failed");
        }
        return HeroSliderMapper.mapToDto(heroSliderRepository.save(heroSlider));
    }

    @Override
    public void deleteHeroSliderById(Long id) {
        HeroSlider heroSlider=heroSliderRepository.findById(id).orElseThrow(()->new RuntimeException("Hero Slider not found"));

        heroSliderRepository.delete(heroSlider);
    }
}
