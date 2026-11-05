package com.smartpay.notification;

import com.smartpay.common.ApiResponse;
import com.smartpay.security.UserPrincipal;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/notifications")
@Tag(name = "Notifications", description = "Transaction alerts, security notifications, and announcements")
public class NotificationController {

    private final NotificationService notificationService;

    public NotificationController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    @GetMapping
    @Operation(summary = "Get list of notifications for the logged in user")
    public ResponseEntity<ApiResponse<List<Notification>>> getNotifications(
            @AuthenticationPrincipal UserPrincipal currentUser) {
        List<Notification> list = notificationService.getUserNotifications(currentUser.getId());
        return ResponseEntity.ok(ApiResponse.success(list, "Notifications retrieved"));
    }

    @GetMapping("/unread-count")
    @Operation(summary = "Get unread notifications count badge")
    public ResponseEntity<ApiResponse<Map<String, Long>>> getUnreadCount(
            @AuthenticationPrincipal UserPrincipal currentUser) {
        long count = notificationService.getUnreadCount(currentUser.getId());
        return ResponseEntity.ok(ApiResponse.success(Map.of("unreadCount", count), "Count retrieved"));
    }

    @PatchMapping("/{id}/read")
    @Operation(summary = "Mark single notification as read")
    public ResponseEntity<ApiResponse<Notification>> markRead(@PathVariable Long id) {
        Notification notification = notificationService.markAsRead(id);
        return ResponseEntity.ok(ApiResponse.success(notification, "Notification marked read"));
    }
}
