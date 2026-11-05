package com.smartpay.auth;

import jakarta.validation.constraints.NotBlank;

public class LoginRequest {

    @NotBlank(message = "Identifier (phone, username, or email) is required")
    private String identifier;

    @NotBlank(message = "Password or UPI PIN is required")
    private String password;

    public LoginRequest() {}

    public LoginRequest(String identifier, String password) {
        this.identifier = identifier;
        this.password = password;
    }

    public String getIdentifier() {
        return identifier;
    }

    public void setIdentifier(String identifier) {
        this.identifier = identifier;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
