package com.hcmute.pose.authservice.security;

import com.hcmute.pose.authservice.dao.RoleDao;
import com.hcmute.pose.authservice.dao.UserDao;
import com.hcmute.pose.authservice.exception.DatabaseException;
import com.hcmute.pose.authservice.model.UserModel;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CustomUserDetailsService implements UserDetailsService {
    private static Logger LOGGER = LoggerFactory.getLogger(CustomUserDetailsService.class);
    @Autowired
    private UserDao userDao;
    @Autowired
    private RoleDao roleDao;

    @Override
    public UserDetails loadUserByUsername(String phoneOrEmail) throws UsernameNotFoundException {
        // hard coding the users. All passwords must be encoded.
        UserModel user;
        try {
            user = userDao.getUser(phoneOrEmail);
            user.setRoles(roleDao.getRoleUser(user.getId()));
        } catch (DatabaseException | SQLException e) {
            LOGGER.error("[CustomUserDetailsService]:[loadUserByUsername] GOT EXCEPTION ",e);
            throw new UsernameNotFoundException("UserModel not found with phone or email : " + phoneOrEmail);
        }
        // Remember that Spring needs roles to be in this format: "ROLE_" + userRole (i.e. "ROLE_ADMIN")
        // So, we need to set it to that format, so we can verify and compare roles (i.e. hasRole("ADMIN")).
        List<GrantedAuthority> grantedAuthorities = user.getRoles().stream().map(role ->
                new SimpleGrantedAuthority(role.getName())
        ).collect(Collectors.toList());
        // The "UserModel" class is provided by Spring and represents a model class for user to be returned by UserDetailsService
        // And used by auth manager to verify and check user authentication.
        return new User(user.getEmail(), user.getPassword(), grantedAuthorities) {
        };
    }
}
