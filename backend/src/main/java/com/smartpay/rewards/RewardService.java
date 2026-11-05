package com.smartpay.rewards;

import com.smartpay.exception.ResourceNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class RewardService {

    private final CouponRepository couponRepository;

    public RewardService(CouponRepository couponRepository) {
        this.couponRepository = couponRepository;
    }

    @Transactional(readOnly = true)
    public Map<String, Object> getRewardsOverview(Long userId) {
        List<Coupon> coupons = couponRepository.findAll();
        Map<String, Object> overview = new HashMap<>();
        overview.put("rewardPoints", 420);
        overview.put("cashbackEarned", 185.50);
        overview.put("scratchCardsAvailable", 2);
        overview.put("coupons", coupons);
        return overview;
    }

    @Transactional
    public Coupon claimCoupon(Long couponId) {
        Coupon coupon = couponRepository.findById(couponId)
                .orElseThrow(() -> new ResourceNotFoundException("Coupon not found: " + couponId));
        coupon.setClaimed(true);
        return couponRepository.save(coupon);
    }
}
