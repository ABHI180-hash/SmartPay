package com.smartpay.qr;

import com.smartpay.exception.ResourceNotFoundException;
import com.smartpay.fraud.FraudAnalysisRequest;
import com.smartpay.fraud.FraudAnalysisResult;
import com.smartpay.fraud.FraudService;
import com.smartpay.user.User;
import com.smartpay.user.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;

@Service
public class QrService {

    private final QrCodeRepository qrRepository;
    private final UserRepository userRepository;
    private final FraudService fraudService;

    public QrService(QrCodeRepository qrRepository, UserRepository userRepository, FraudService fraudService) {
        this.qrRepository = qrRepository;
        this.userRepository = userRepository;
        this.fraudService = fraudService;
    }

    @Transactional
    public QrCode generateUserQr(Long userId, QrGenerateRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + userId));

        StringBuilder payload = new StringBuilder("upi://pay?");
        payload.append("pa=").append(URLEncoder.encode(user.getUpiId(), StandardCharsets.UTF_8));
        payload.append("&pn=").append(URLEncoder.encode(user.getFullName(), StandardCharsets.UTF_8));
        payload.append("&cu=INR");

        if (request.getAmount() != null && request.getAmount().compareTo(BigDecimal.ZERO) > 0) {
            payload.append("&am=").append(request.getAmount().toPlainString());
        }
        if (request.getNote() != null && !request.getNote().isBlank()) {
            payload.append("&tn=").append(URLEncoder.encode(request.getNote(), StandardCharsets.UTF_8));
        }

        QrCode qrCode = new QrCode();
        qrCode.setUserId(userId);
        qrCode.setUpiPayload(payload.toString());
        qrCode.setAmount(request.getAmount());
        qrCode.setQrType(request.isDynamic() ? "DYNAMIC" : "STATIC");
        qrCode.setNote(request.getNote());

        return qrRepository.save(qrCode);
    }

    @Transactional
    public QrValidationResult validateAndParse(Long userId, String rawQr) {
        QrValidationResult result = new QrValidationResult();
        if (rawQr == null || rawQr.isBlank()) {
            result.setValid(false);
            return result;
        }

        String text = rawQr.trim();
        String upiId = "";
        String name = "Merchant / Payee";
        BigDecimal amount = null;
        String note = "";

        if (text.startsWith("upi://pay")) {
            Map<String, String> params = parseQuery(text);
            upiId = params.getOrDefault("pa", "");
            name = params.getOrDefault("pn", upiId);
            if (params.containsKey("am")) {
                try {
                    amount = new BigDecimal(params.get("am"));
                } catch (Exception ignored) {}
            }
            note = params.getOrDefault("tn", "");
        } else if (text.contains("@")) {
            upiId = text;
            name = text.split("@")[0];
        } else {
            upiId = text + "@smartpay";
            name = "Payee (" + text + ")";
        }

        result.setValid(!upiId.isBlank());
        result.setPayeeUpiId(upiId);
        result.setPayeeName(name);
        result.setAmount(amount);
        result.setNote(note);

        // Run AI Scam Shield on scanned payload
        FraudAnalysisRequest fraudReq = new FraudAnalysisRequest(upiId, name, amount, note);
        FraudAnalysisResult fraudCheck = fraudService.analyzeTransaction(userId, fraudReq);
        result.setFraudAnalysis(fraudCheck);

        return result;
    }

    private Map<String, String> parseQuery(String uri) {
        Map<String, String> map = new HashMap<>();
        int qIdx = uri.indexOf('?');
        if (qIdx == -1 || qIdx == uri.length() - 1) return map;

        String query = uri.substring(qIdx + 1);
        String[] pairs = query.split("&");
        for (String pair : pairs) {
            int eq = pair.indexOf('=');
            if (eq > 0) {
                String key = pair.substring(0, eq);
                String val = URLDecoder.decode(pair.substring(eq + 1), StandardCharsets.UTF_8);
                map.put(key, val);
            }
        }
        return map;
    }
}
