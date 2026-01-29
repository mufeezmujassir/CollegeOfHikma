package com.hikmamadrasa.HikmaProject.repository;

import com.hikmamadrasa.HikmaProject.entity.Result;
import com.hikmamadrasa.HikmaProject.entity.Student;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ResultRepository extends JpaRepository<Result, Long> {
        @Modifying
        @Transactional
        @Query("DELETE FROM Result r WHERE r.student.id IN :studentIds")
        void deleteByStudentIds(@Param("studentIds") List<Long> studentIds);
}
