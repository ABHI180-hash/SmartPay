package com.smartpay.khata;

import com.smartpay.exception.BadRequestException;
import com.smartpay.exception.ResourceNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class KhataService {

    private final KhataGroupRepository groupRepository;
    private final KhataMemberRepository memberRepository;
    private final KhataExpenseRepository expenseRepository;
    private final KhataSettlementRepository settlementRepository;

    public KhataService(KhataGroupRepository groupRepository,
                        KhataMemberRepository memberRepository,
                        KhataExpenseRepository expenseRepository,
                        KhataSettlementRepository settlementRepository) {
        this.groupRepository = groupRepository;
        this.memberRepository = memberRepository;
        this.expenseRepository = expenseRepository;
        this.settlementRepository = settlementRepository;
    }

    @Transactional
    public KhataGroup createGroup(Long creatorId, String creatorName, String groupName, String description, List<String> memberNames) {
        KhataGroup group = new KhataGroup();
        group.setName(groupName);
        group.setDescription(description);
        group.setCreatorId(creatorId);
        group.setTotalExpense(BigDecimal.ZERO);
        KhataGroup savedGroup = groupRepository.save(group);

        // Add creator as member
        KhataMember creatorMember = new KhataMember();
        creatorMember.setGroupId(savedGroup.getId());
        creatorMember.setUserId(creatorId);
        creatorMember.setName(creatorName != null ? creatorName : "You");
        creatorMember.setBalance(BigDecimal.ZERO);
        memberRepository.save(creatorMember);

        // Add invited members
        if (memberNames != null) {
            for (String mName : memberNames) {
                if (mName != null && !mName.isBlank() && !mName.equalsIgnoreCase(creatorMember.getName())) {
                    KhataMember m = new KhataMember();
                    m.setGroupId(savedGroup.getId());
                    m.setName(mName.trim());
                    m.setBalance(BigDecimal.ZERO);
                    memberRepository.save(m);
                }
            }
        }

        return savedGroup;
    }

    @Transactional(readOnly = true)
    public List<KhataGroup> getUserGroups(Long userId) {
        return groupRepository.findByCreatorIdOrderByCreatedAtDesc(userId);
    }

    @Transactional(readOnly = true)
    public Map<String, Object> getGroupDetails(Long groupId) {
        KhataGroup group = groupRepository.findById(groupId)
                .orElseThrow(() -> new ResourceNotFoundException("Khata group not found: " + groupId));

        List<KhataMember> members = memberRepository.findByGroupId(groupId);
        List<KhataExpense> expenses = expenseRepository.findByGroupIdOrderByCreatedAtDesc(groupId);
        List<KhataSettlement> settlements = settlementRepository.findByGroupIdOrderByCreatedAtDesc(groupId);

        Map<String, Object> result = new HashMap<>();
        result.put("group", group);
        result.put("members", members);
        result.put("expenses", expenses);
        result.put("settlements", settlements);
        return result;
    }

    @Transactional
    public KhataExpense addExpense(Long groupId, Long payerMemberId, String title, BigDecimal amount) {
        if (amount == null || amount.compareTo(BigDecimal.ZERO) <= 0) {
            throw new BadRequestException("Expense amount must be positive");
        }

        KhataGroup group = groupRepository.findById(groupId)
                .orElseThrow(() -> new ResourceNotFoundException("Group not found"));

        List<KhataMember> members = memberRepository.findByGroupId(groupId);
        if (members.isEmpty()) {
            throw new BadRequestException("Group has no members");
        }

        KhataMember payer = memberRepository.findById(payerMemberId)
                .orElseThrow(() -> new ResourceNotFoundException("Payer member not found"));

        KhataExpense expense = new KhataExpense();
        expense.setGroupId(groupId);
        expense.setPayerId(payer.getId());
        expense.setPayerName(payer.getName());
        expense.setTitle(title);
        expense.setAmount(amount);
        KhataExpense saved = expenseRepository.save(expense);

        group.setTotalExpense(group.getTotalExpense().add(amount));
        groupRepository.save(group);

        // Split equally
        BigDecimal share = amount.divide(BigDecimal.valueOf(members.size()), 2, RoundingMode.HALF_UP);
        for (KhataMember m : members) {
            if (m.getId().equals(payer.getId())) {
                BigDecimal netCredit = amount.subtract(share);
                m.setBalance(m.getBalance().add(netCredit));
            } else {
                m.setBalance(m.getBalance().subtract(share));
            }
            memberRepository.save(m);
        }

        return saved;
    }

    @Transactional
    public KhataSettlement recordSettlement(Long groupId, Long fromId, Long toId, BigDecimal amount) {
        KhataMember from = memberRepository.findById(fromId)
                .orElseThrow(() -> new ResourceNotFoundException("Sender member not found"));
        KhataMember to = memberRepository.findById(toId)
                .orElseThrow(() -> new ResourceNotFoundException("Receiver member not found"));

        from.setBalance(from.getBalance().add(amount));
        to.setBalance(to.getBalance().subtract(amount));
        memberRepository.save(from);
        memberRepository.save(to);

        KhataSettlement settlement = new KhataSettlement();
        settlement.setGroupId(groupId);
        settlement.setFromMemberId(fromId);
        settlement.setFromMemberName(from.getName());
        settlement.setToMemberId(toId);
        settlement.setToMemberName(to.getName());
        settlement.setAmount(amount);
        settlement.setSettled(true);
        settlement.setSettledAt(LocalDateTime.now());

        return settlementRepository.save(settlement);
    }
}
