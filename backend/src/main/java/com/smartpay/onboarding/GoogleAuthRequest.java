package com.smartpay.onboarding;

import jakarta.validation.constraints.NotBlank;

public class GoogleAuthRequest {

    private String idToken;

    @NotBlank(message = "Google Subject ID (sub) is required")
    private String googleSubjectId;

    @NotBlank(message = "Google verified email is required")
    private String email;

    private String name;
    private String avatarUrl;

    @NotBlank(message = "Device identifier hash is required")
    private String deviceIdentifier;

    private String deviceName = "Chrome Web Browser";

    public GoogleAuthRequest() {}

    public String getIdToken() {
        return idToken;
    }

    public void setIdToken(String idToken) {
        this.idToken = idToken;
    }

    public String getGoogleSubjectId() {
        return googleSubjectId;
    }

    public void setGoogleSubjectId(String googleSubjectId) {
        this.googleSubjectId = googleSubjectId;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAvatarUrl() {
        return avatarUrl;
    }

    public void setAvatarUrl(String avatarUrl) {
        this.avatarUrl = avatarUrl;
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
}
