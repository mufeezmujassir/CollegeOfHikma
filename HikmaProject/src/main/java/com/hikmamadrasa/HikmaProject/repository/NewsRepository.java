package com.hikmamadrasa.HikmaProject.repository;

import com.hikmamadrasa.HikmaProject.dto.NewsDto;
import com.hikmamadrasa.HikmaProject.dto.NewsImageDto;
import com.hikmamadrasa.HikmaProject.entity.News;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NewsRepository extends JpaRepository<News,Long> {
}
