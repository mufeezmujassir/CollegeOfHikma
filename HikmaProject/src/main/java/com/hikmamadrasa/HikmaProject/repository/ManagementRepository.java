package com.hikmamadrasa.HikmaProject.repository;

import com.hikmamadrasa.HikmaProject.entity.Managment;
import org.hibernate.boot.models.JpaAnnotations;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ManagementRepository extends JpaRepository<Managment,Long> {
}
