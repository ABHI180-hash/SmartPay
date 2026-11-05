package com.smartpay.onboarding;

import jakarta.validation.constraints.NotBlank;

public class MobileOtpSendRequest {

    @NotBlank(message = "Mobile number is required")
    private String mobileNumber;

    private String purpose = "ONBOARDING_MOBILE"; // ONBOARDING_MOBILE, DEVICE_VERIFICATION, LOGIN, PIN_RESET
    private Long userId;

    public MobileOtpSendRequest() {}

    public String getMobileNumber() {
        return mobileNumber;
    }

    public void setMobileNumber(String mobileNumber) {
        this.mobileNumber = mobileNumber;
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
