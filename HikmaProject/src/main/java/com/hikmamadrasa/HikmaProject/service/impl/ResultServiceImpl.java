package com.hikmamadrasa.HikmaProject.service.impl;

import com.hikmamadrasa.HikmaProject.dto.ResultDto;
import com.hikmamadrasa.HikmaProject.entity.Result;
import com.hikmamadrasa.HikmaProject.entity.Student;
import com.hikmamadrasa.HikmaProject.entity.Subject;
import com.hikmamadrasa.HikmaProject.mapper.ResultMapper;
import com.hikmamadrasa.HikmaProject.repository.ResultRepository;
import com.hikmamadrasa.HikmaProject.repository.StudentRepository;
import com.hikmamadrasa.HikmaProject.repository.SubjectRepository;
import com.hikmamadrasa.HikmaProject.service.ResultService;
import lombok.AllArgsConstructor;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ResultServiceImpl implements ResultService {

    private final ResultRepository resultRepository;
    private final SubjectRepository subjectRepository;
    private final StudentRepository studentRepository;

    private String calculateGrade(int mark){
        if(mark>=75 && mark<=100) return "A";
        else if (mark>=65) return "B";
        else if (mark>=55) return "C";
        else if (mark>=40) return "C";
        return "F";
    }

    @Override
    public ResultDto save(ResultDto dto) {
        Student student=studentRepository.findById(dto.getStudentId()).orElseThrow(()->new RuntimeException("Student not found"));
        Subject sub=subjectRepository.findById(dto.getSubjectId()).orElseThrow(()->new RuntimeException("Subject not found"));
        Result result= ResultMapper.mapToEntity(dto,student,sub);
        return ResultMapper.mapToDto(resultRepository.save(result));
    }

    @Override
    public List<ResultDto> getAll() {
        return resultRepository.findAll().stream().map(ResultMapper::mapToDto).collect(Collectors.toList());
    }

    @Override
    public void uploadExcel(MultipartFile file) {

        try{
            Workbook workbook = new XSSFWorkbook(file.getInputStream());
            Sheet sheet = workbook.getSheetAt(0);

                Row header = sheet.getRow(0);
                List<String> subjects=new ArrayList<>();

                for(int i=4;i<header.getLastCellNum();i++){
                    String SubjectName=header.getCell(i,Row.MissingCellPolicy.RETURN_BLANK_AS_NULL).toString().toUpperCase().trim();

                    if(!SubjectName.isEmpty()){
                        subjects.add(SubjectName);
                        if(!subjectRepository.existsBySubjectName(SubjectName)){
                            subjectRepository.save(new Subject(null, SubjectName));
                        }
                    }
                }

            DataFormatter dataFormatter=new DataFormatter();


            for(int i=1;i<sheet.getLastRowNum();i++){

                Row row= sheet.getRow(i);
                if(row==null) continue;

                String Year=dataFormatter.formatCellValue(row.getCell(0));
                String Semester=dataFormatter.formatCellValue(row.getCell(1));
                String index=dataFormatter.formatCellValue(row.getCell(2));
                String name=row.getCell(3).getStringCellValue();

                Student student;
                if(studentRepository.existsByIndexNumber(index)){
                    student=studentRepository.findByIndexNumber(index);
                    // Update year and semester
                    student.setYear(Year);
                    student.setSemester(Semester);
                    student = studentRepository.save(student);
                }
                else{
                    student = studentRepository.save(
                            new Student(null, index, name, Year, Semester)
                    );
                }

                for(int s=0;s<subjects.size();s++){
                    Cell cell=row.getCell(s+4,Row.MissingCellPolicy.RETURN_BLANK_AS_NULL);
                    if(cell.toString().isEmpty()) continue;
                    int mark;
                    String grade;
                    String Smark=dataFormatter.formatCellValue(cell).toUpperCase().trim();
                    if(Smark.equals("AB")){
                        mark=0;
                        grade="AB";
                    }
                    else{
                        mark = Integer.parseInt(Smark);
                        grade=calculateGrade(mark);
                    }
                    Subject subject=subjectRepository.findBySubjectName(subjects.get(s));
                    Result result=new Result();
                    result.setStudent(student);
                    result.setSubject(subject);
                    result.setGrade(grade);
                    result.setMark(mark);
                    resultRepository.save(result);

                }

            }
        } catch (IOException e) {
            throw new RuntimeException("Failed to upload the Excel file");
        }
    }

    @Override
    public ResultDto getResultSpecific(String indexNumber, String name) {

        return null;
    }
}
