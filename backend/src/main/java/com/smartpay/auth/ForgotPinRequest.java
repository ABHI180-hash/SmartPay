package com.smartpay.auth;

import jakarta.validation.constraints.NotBlank;

public class ForgotPinRequest {

    @NotBlank(message = "Phone number is required")
    private String phone;

    private String otp;

    @NotBlank(message = "New PIN is required")
    private String newPin;

    public ForgotPinRequest() {}

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getOtp() {
        return otp;
    }

    public void setOtp(String otp) {
        this.otp = otp;
    }

    public String getNewPin() {
        return newPin;
    }

    public void setNewPin(String newPin) {
        this.newPin = newPin;
    }
}
