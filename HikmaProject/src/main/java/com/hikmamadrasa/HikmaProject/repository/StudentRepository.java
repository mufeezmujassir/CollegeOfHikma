package com.hikmamadrasa.HikmaProject.repository;

import com.hikmamadrasa.HikmaProject.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepository extends JpaRepository<Student, Long> {
}
