package com.smartpay.bank;

import java.util.List;

public class SupportedBankDto {
    private String bankCode;
    private String bankName;
    private String logoText;
    private String brandColor;
    private boolean isPopular;
    private boolean isSupported;
    private String ifscPrefix;
    private List<String> supportedFeatures; // e.g. ["UPI", "UPI_LITE", "AUTOPAY", "BIOMETRIC"]

    public SupportedBankDto() {}

    public SupportedBankDto(String bankCode, String bankName, String logoText, String brandColor,
                            boolean isPopular, boolean isSupported, String ifscPrefix, List<String> supportedFeatures) {
        this.bankCode = bankCode;
        this.bankName = bankName;
        this.logoText = logoText;
        this.brandColor = brandColor;
        this.isPopular = isPopular;
        this.isSupported = isSupported;
        this.ifscPrefix = ifscPrefix;
        this.supportedFeatures = supportedFeatures;
    }

    public String getBankCode() {
        return bankCode;
    }

    public void setBankCode(String bankCode) {
        this.bankCode = bankCode;
    }

    public String getBankName() {
        return bankName;
    }

    public void setBankName(String bankName) {
        this.bankName = bankName;
    }

    public String getLogoText() {
        return logoText;
    }

    public void setLogoText(String logoText) {
        this.logoText = logoText;
    }

    public String getBrandColor() {
        return brandColor;
    }

    public void setBrandColor(String brandColor) {
        this.brandColor = brandColor;
    }

    public boolean isPopular() {
        return isPopular;
    }

    public void setPopular(boolean popular) {
        isPopular = popular;
    }

    public boolean isSupported() {
        return isSupported;
    }

    public void setSupported(boolean supported) {
        isSupported = supported;
    }

    public String getIfscPrefix() {
        return ifscPrefix;
    }

    public void setIfscPrefix(String ifscPrefix) {
        this.ifscPrefix = ifscPrefix;
    }

    public List<String> getSupportedFeatures() {
        return supportedFeatures;
    }

    public void setSupportedFeatures(List<String> supportedFeatures) {
        this.supportedFeatures = supportedFeatures;
    }
}
