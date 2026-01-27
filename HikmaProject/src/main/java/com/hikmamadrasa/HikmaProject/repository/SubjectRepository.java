package com.hikmamadrasa.HikmaProject.repository;

import com.hikmamadrasa.HikmaProject.entity.Subject;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SubjectRepository extends JpaRepository<Subject, Long> {
    boolean existsBySubjectName(String subjectName);
    Subject findBySubjectName(String subjectName);

}
