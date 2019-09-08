package com.hcmute.tlcn.workmanagement.security;

import com.hcmute.tlcn.workmanagement.dao.EmployeeDao;
import com.hcmute.tlcn.workmanagement.model.Employee;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {
    @Autowired
    EmployeeDao employeeDao;

    @Override
    public UserDetails loadUserByUsername(String usernameOrEmail) throws UsernameNotFoundException {
        // Let people login with either username or email
        Employee employee = employeeDao.findByUsernameOrEmail(usernameOrEmail, usernameOrEmail)
                .orElseThrow(() ->
                        new UsernameNotFoundException("Employee not found with username or email : " + usernameOrEmail)
                );

        return UserPrincipal.create(employee);
    }

    // This method is used by JWTAuthenticationFilter
    public UserDetails loadUserById(Long id) {
        Employee employee = employeeDao.findById(id).orElseThrow(
                () -> new UsernameNotFoundException("Employee not found with id : " + id)
        );
        return UserPrincipal.create(employee);
    }
}
