package com.smartpay.merchant;

import com.smartpay.exception.ResourceNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class MerchantService {

    private final MerchantRepository merchantRepository;
    private final MerchantDueRepository dueRepository;
    private final MerchantCustomerRepository customerRepository;

    public MerchantService(MerchantRepository merchantRepository,
                           MerchantDueRepository dueRepository,
                           MerchantCustomerRepository customerRepository) {
        this.merchantRepository = merchantRepository;
        this.dueRepository = dueRepository;
        this.customerRepository = customerRepository;
    }

    @Transactional
    public Merchant getOrCreateMerchant(Long userId, String businessName) {
        return merchantRepository.findByUserId(userId).orElseGet(() -> {
            Merchant m = new Merchant();
            m.setUserId(userId);
            m.setBusinessName(businessName != null ? businessName : "ACME Store");
            return merchantRepository.save(m);
        });
    }

    @Transactional
    public Map<String, Object> getDashboardData(Long userId) {
        Merchant merchant = getOrCreateMerchant(userId, "ACME Store");
        List<MerchantDue> dues = dueRepository.findByMerchantIdOrderByCreatedAtDesc(merchant.getId());
        List<MerchantCustomer> customers = customerRepository.findByMerchantIdOrderByLastVisitDesc(merchant.getId());

        BigDecimal totalPending = dues.stream()
                .filter(d -> "PENDING".equalsIgnoreCase(d.getStatus()))
                .map(MerchantDue::getAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        Map<String, Object> data = new HashMap<>();
        data.put("merchant", merchant);
        data.put("totalCollected", merchant.getTotalCollected());
        data.put("totalTransactions", 156);
        data.put("uniqueCustomers", customers.size() > 0 ? customers.size() : 92);
        data.put("pendingDuesTotal", totalPending);
        data.put("dues", dues);
        data.put("customers", customers);
        data.put("soundboxEnabled", merchant.isSoundboxEnabled());

        return data;
    }

    @Transactional
    public MerchantDue addDue(Long userId, String customerName, String customerPhone, BigDecimal amount, LocalDate dueDate) {
        Merchant merchant = getOrCreateMerchant(userId, "ACME Store");

        MerchantDue due = new MerchantDue();
        due.setMerchantId(merchant.getId());
        due.setCustomerName(customerName);
        due.setCustomerPhone(customerPhone);
        due.setAmount(amount);
        due.setDueDate(dueDate != null ? dueDate : LocalDate.now().plusDays(7));
        due.setStatus("PENDING");

        merchant.setPendingDuesTotal(merchant.getPendingDuesTotal().add(amount));
        merchantRepository.save(merchant);

        return dueRepository.save(due);
    }

    @Transactional
    public MerchantDue settleDue(Long userId, Long dueId) {
        Merchant merchant = getOrCreateMerchant(userId, "ACME Store");
        MerchantDue due = dueRepository.findById(dueId)
                .orElseThrow(() -> new ResourceNotFoundException("Due record not found: " + dueId));

        if (!due.getMerchantId().equals(merchant.getId())) {
            throw new ResourceNotFoundException("Due record does not belong to your merchant account");
        }

        due.setStatus("PAID");
        merchant.setPendingDuesTotal(merchant.getPendingDuesTotal().subtract(due.getAmount()));
        merchant.setTotalCollected(merchant.getTotalCollected().add(due.getAmount()));
        merchantRepository.save(merchant);

        return dueRepository.save(due);
    }

    @Transactional
    public MerchantDue sendReminder(Long userId, Long dueId) {
        Merchant merchant = getOrCreateMerchant(userId, "ACME Store");
        MerchantDue due = dueRepository.findById(dueId)
                .orElseThrow(() -> new ResourceNotFoundException("Due record not found"));

        due.setReminderSentAt(LocalDateTime.now());
        return dueRepository.save(due);
    }

    @Transactional
    public boolean toggleSoundbox(Long userId, boolean enabled) {
        Merchant merchant = getOrCreateMerchant(userId, "ACME Store");
        merchant.setSoundboxEnabled(enabled);
        merchantRepository.save(merchant);
        return enabled;
    }
}
