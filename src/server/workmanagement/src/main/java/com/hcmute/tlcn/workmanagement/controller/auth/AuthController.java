package com.hcmute.tlcn.workmanagement.controller.auth;


import com.hcmute.tlcn.workmanagement.dao.EmployeeDao;
import com.hcmute.tlcn.workmanagement.dao.RoleDao;
import com.hcmute.tlcn.workmanagement.exception.AppException;
import com.hcmute.tlcn.workmanagement.model.Employee;
import com.hcmute.tlcn.workmanagement.model.Role;
import com.hcmute.tlcn.workmanagement.model.RoleName;
import com.hcmute.tlcn.workmanagement.payload.ApiResponse;
import com.hcmute.tlcn.workmanagement.payload.JwtAuthenticationResponse;
import com.hcmute.tlcn.workmanagement.payload.LoginRequest;
import com.hcmute.tlcn.workmanagement.payload.SignUpRequest;
import com.hcmute.tlcn.workmanagement.security.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.sql.SQLException;
import java.util.Collections;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    EmployeeDao employeeDao;

    @Autowired
    RoleDao roleDao;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    JwtTokenProvider tokenProvider;

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsernameOrEmail(),
                        loginRequest.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = tokenProvider.generateToken(authentication);
        return ResponseEntity.ok(new JwtAuthenticationResponse(jwt));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignUpRequest signUpRequest) {
        if(employeeDao.existsByUsername(signUpRequest.getUsername())) {
            return new ResponseEntity(new ApiResponse(false, "Username is already taken!"),
                    HttpStatus.BAD_REQUEST);
        }

        if(employeeDao.existsByEmail(signUpRequest.getEmail())) {
            return new ResponseEntity(new ApiResponse(false, "Email Address already in use!"),
                    HttpStatus.BAD_REQUEST);
        }

        // Creating user's account
        Employee employee = new Employee(signUpRequest.getUsername(),
                signUpRequest.getEmail(), signUpRequest.getPassword());

        employee.setPassword(passwordEncoder.encode(employee.getPassword()));

        Role employeeRole = roleDao.findByName(RoleName.ROLE_EMPLOYEE.name())
                .orElseThrow(() -> new AppException("Employee Role not set."));

        employee.setRoles(Collections.singleton(employeeRole));

        Employee result = null;
        try {
            result = employeeDao.createEmployee(employee).orElseThrow(() -> new AppException("Employee can't create"));;
        } catch (SQLException e) {
            e.printStackTrace();
        }

        URI location = ServletUriComponentsBuilder
                .fromCurrentContextPath().path("/api/users/{username}")
                .buildAndExpand(result.getUsername()).toUri();

        return ResponseEntity.created(location).body(new ApiResponse(true, "User registered successfully"));
    }
}
