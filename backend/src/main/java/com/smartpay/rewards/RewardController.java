package com.smartpay.rewards;

import com.smartpay.common.ApiResponse;
import com.smartpay.security.UserPrincipal;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/rewards")
@Tag(name = "Rewards & Offers", description = "Cashback points, scratch cards, and merchant coupons")
public class RewardController {

    private final RewardService rewardService;

    public RewardController(RewardService rewardService) {
        this.rewardService = rewardService;
    }

    @GetMapping
    @Operation(summary = "Get rewards balance and available merchant coupons")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getRewards(
            @AuthenticationPrincipal UserPrincipal currentUser) {
        Map<String, Object> data = rewardService.getRewardsOverview(currentUser != null ? currentUser.getId() : null);
        return ResponseEntity.ok(ApiResponse.success(data, "Rewards data retrieved"));
    }

    @PostMapping("/claim/{id}")
    @Operation(summary = "Claim a scratch card or coupon")
    public ResponseEntity<ApiResponse<Coupon>> claim(@PathVariable Long id) {
        Coupon coupon = rewardService.claimCoupon(id);
        return ResponseEntity.ok(ApiResponse.success(coupon, "Coupon claimed successfully"));
    }
}
