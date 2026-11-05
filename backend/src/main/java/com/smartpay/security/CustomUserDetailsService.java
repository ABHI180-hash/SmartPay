package com.smartpay.security;

import com.smartpay.user.User;
import com.smartpay.user.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    public CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public UserDetails loadUserByUsername(String identifier) throws UsernameNotFoundException {
        // Allows login via username, email, or phone number
        User user = userRepository.findByUsername(identifier)
                .or(() -> userRepository.findByEmail(identifier))
                .or(() -> userRepository.findByPhone(identifier))
                .orElseThrow(() -> new UsernameNotFoundException("User not found with identifier: " + identifier));

        return UserPrincipal.create(user);
    }

    @Transactional(readOnly = true)
    public UserDetails loadUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with id: " + id));

        return UserPrincipal.create(user);
    }
}
