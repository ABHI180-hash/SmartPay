package com.smartpay.qr;

import java.math.BigDecimal;

public class QrGenerateRequest {

    private BigDecimal amount;
    private String note;
    private boolean dynamic = false;

    public QrGenerateRequest() {}

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public boolean isDynamic() {
        return dynamic;
    }

    public void setDynamic(boolean dynamic) {
        this.dynamic = dynamic;
    }
}
