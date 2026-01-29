package com.hikmamadrasa.HikmaProject.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter

@NoArgsConstructor

public class LoginResponse {
    private String token;
    private String message;
    private boolean isAdmin;

    public LoginResponse(String token, String message, boolean isAdmin) {
        this.token = token;
        this.message = message;
        this.isAdmin = isAdmin;
    }
}
