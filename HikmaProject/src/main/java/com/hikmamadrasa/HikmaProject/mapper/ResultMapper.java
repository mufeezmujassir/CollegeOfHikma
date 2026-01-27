package com.hikmamadrasa.HikmaProject.mapper;

import com.hikmamadrasa.HikmaProject.dto.ResultDto;
import com.hikmamadrasa.HikmaProject.entity.Result;
import com.hikmamadrasa.HikmaProject.entity.Student;
import com.hikmamadrasa.HikmaProject.entity.Subject;

public class ResultMapper {

    public static ResultDto mapToDto(Result result) {
        return new ResultDto(
                result.getId(),
                result.getStudent().getId(),
                result.getSubject().getId(),
                result.getMark(),
                result.getGrade()
        );
    }
    public static  Result mapToEntity(ResultDto dto, Student student, Subject subject) {
        Result result = new Result();
        result.setId(dto.getId());
        result.setStudent(student);
        result.setSubject(subject);
        result.setMark(dto.getMark());
        result.setGrade(dto.getGrade());
        return result;
    }
}
