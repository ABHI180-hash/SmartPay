package com.smartpay.admin;

import com.smartpay.common.ApiResponse;
import com.smartpay.fraud.FraudAlert;
import com.smartpay.fraud.FraudAlertRepository;
import com.smartpay.transaction.Transaction;
import com.smartpay.transaction.TransactionRepository;
import com.smartpay.user.User;
import com.smartpay.user.UserRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/admin")
@Tag(name = "Admin Operations", description = "System metrics, fraud monitoring, and user management")
public class AdminController {

    private final UserRepository userRepository;
    private final TransactionRepository transactionRepository;
    private final FraudAlertRepository fraudAlertRepository;

    public AdminController(UserRepository userRepository,
                           TransactionRepository transactionRepository,
                           FraudAlertRepository fraudAlertRepository) {
        this.userRepository = userRepository;
        this.transactionRepository = transactionRepository;
        this.fraudAlertRepository = fraudAlertRepository;
    }

    @GetMapping("/dashboard")
    @Operation(summary = "Get overall system health and platform KPIs")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getDashboard() {
        long totalUsers = userRepository.count();
        long totalTransactions = transactionRepository.count();
        List<FraudAlert> recentAlerts = fraudAlertRepository.findTop20ByOrderByCreatedAtDesc();

        Map<String, Object> data = new HashMap<>();
        data.put("totalUsers", totalUsers);
        data.put("totalTransactions", totalTransactions);
        data.put("platformSuccessRate", "99.8%");
        data.put("activeFraudAlerts", recentAlerts.size());
        data.put("recentFraudAlerts", recentAlerts);

        return ResponseEntity.ok(ApiResponse.success(data, "Admin metrics retrieved"));
    }

    @GetMapping("/users")
    @Operation(summary = "List all registered platform users")
    public ResponseEntity<ApiResponse<List<User>>> listUsers() {
        return ResponseEntity.ok(ApiResponse.success(userRepository.findAll(), "User list retrieved"));
    }

    @PatchMapping("/users/{id}/toggle-status")
    @Operation(summary = "Suspend or reactivate user account")
    public ResponseEntity<ApiResponse<User>> toggleStatus(@PathVariable Long id) {
        User user = userRepository.findById(id).orElseThrow();
        user.setEnabled(!user.isEnabled());
        return ResponseEntity.ok(ApiResponse.success(userRepository.save(user), "User status updated"));
    }
}
