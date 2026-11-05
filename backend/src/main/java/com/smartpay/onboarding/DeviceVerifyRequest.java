package com.smartpay.onboarding;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class DeviceVerifyRequest {

    @NotNull(message = "User ID is required")
    private Long userId;

    @NotBlank(message = "Device identifier is required")
    private String deviceIdentifier;

    private String deviceName = "Web Browser";

    @NotBlank(message = "OTP is required")
    private String otp;

    public DeviceVerifyRequest() {}

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getDeviceIdentifier() {
        return deviceIdentifier;
    }

    public void setDeviceIdentifier(String deviceIdentifier) {
        this.deviceIdentifier = deviceIdentifier;
    }

    public String getDeviceName() {
        return deviceName;
    }

    public void setDeviceName(String deviceName) {
        this.deviceName = deviceName;
    }

    public String getOtp() {
        return otp;
    }

    public void setOtp(String otp) {
        this.otp = otp;
    }
}
