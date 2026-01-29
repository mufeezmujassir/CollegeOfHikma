package com.hikmamadrasa.HikmaProject.controller;

import com.hikmamadrasa.HikmaProject.dto.LoginRequest;
import com.hikmamadrasa.HikmaProject.dto.LoginResponse;
import com.hikmamadrasa.HikmaProject.entity.Admin;
import com.hikmamadrasa.HikmaProject.repository.AdminRepository;
import com.hikmamadrasa.HikmaProject.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;


    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {

        Admin admin = adminRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid email"));

        if (!passwordEncoder.matches(request.getPassword(), admin.getPassword())) {
            System.out.println("Invalid password");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new LoginResponse(null, "Invalid password", false));
        }

        String token = jwtUtil.generateToken(admin.getEmail());

        return ResponseEntity.ok(new LoginResponse(token, "Login successful", true));
    }

}
