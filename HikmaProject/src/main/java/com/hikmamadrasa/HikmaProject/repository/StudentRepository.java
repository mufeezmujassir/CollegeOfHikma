package com.hikmamadrasa.HikmaProject.repository;

import com.hikmamadrasa.HikmaProject.entity.Student;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface StudentRepository extends JpaRepository<Student, Long> {
    boolean existsByIndexNumber(String indexNumber);
    Student findByIndexNumber(String indexNumber);
    Student findByYear(String year);
    boolean existsByName(String name);
    List<Student> findAllByYear(String year);

    @Modifying
    @Transactional
    @Query("DELETE FROM Student s WHERE s.year = :year")
    void deleteByYear(@Param("year") String year);
}
