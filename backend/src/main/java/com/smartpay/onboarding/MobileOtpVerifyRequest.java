package com.smartpay.onboarding;

import jakarta.validation.constraints.NotBlank;

public class MobileOtpVerifyRequest {

    @NotBlank(message = "Mobile number is required")
    private String mobileNumber;

    @NotBlank(message = "OTP is required")
    private String otp;

    private String purpose = "ONBOARDING_MOBILE";
    private Long userId;

    public MobileOtpVerifyRequest() {}

    public String getMobileNumber() {
        return mobileNumber;
    }

    public void setMobileNumber(String mobileNumber) {
        this.mobileNumber = mobileNumber;
    }

    public String getOtp() {
        return otp;
    }

    public void setOtp(String otp) {
        this.otp = otp;
    }

    public String getPurpose() {
        return purpose;
    }

    public void setPurpose(String purpose) {
        this.purpose = purpose;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
}
