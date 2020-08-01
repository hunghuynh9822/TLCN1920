package com.hcmute.pose.authservice.controller;

import com.hcmute.pose.authservice.feign.EmployeeClient;
import com.hcmute.pose.authservice.model.UserStatus;
import com.hcmute.pose.authservice.payload.ApiResponse;
import com.hcmute.pose.authservice.payload.AuthResponse;
import com.hcmute.pose.authservice.payload.EmployeeResponse;
import com.hcmute.pose.authservice.payload.LoginRequest;
import com.hcmute.pose.authservice.security.JwtTokenProvider;
import com.hcmute.pose.authservice.security.CurrentUser;
import com.hcmute.pose.common.security.JwtConfig;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/auth")
public class AuthController {
    private static final Logger LOGGER = LoggerFactory.getLogger(AuthController.class);
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    private JwtConfig jwtConfig;

    @Autowired
    private EmployeeClient employeeClient;

    @GetMapping("/test")
    public ResponseEntity<?> testCall(){
        return new ResponseEntity<>(new ApiResponse(true, "Hello world"),
                HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getPhoneOrEmail(),
                        loginRequest.getPassword()
                )
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = jwtTokenProvider.generateToken(authentication);
        LOGGER.info("[AuthController]:[authenticateUser]: TOKEN : {}",token);
        return ResponseEntity.ok(new AuthResponse(jwtConfig.getPrefix(),token));
    }


//    @GetMapping("/current")
//    public ResponseEntity<?> getCurrentUser(@RequestHeader(required = false,name=USER_ID_HEADER)String userId) {
//        if(userId.isEmpty()){
//            return new ResponseEntity<>(new ApiResponse(false, "You don't have permission"),
//                    HttpStatus.BAD_REQUEST);
//        }
//        LOGGER.info("Current Id : {}",userId);
//        String url = EMPLOYEE_SERVICE+"{id}";
//        Map<String, String> params = new HashMap<>();
//        params.put("id", userId);
//        return restTemplate.getForEntity(url,EmployeeResponse.class,params);
//    }

    @GetMapping("/current")
    @PreAuthorize("hasAnyRole('ADMIN','STAFF','LEAD','HR')")
    public ResponseEntity<?> getCurrentUser(@CurrentUser String userId) {
        if(userId.isEmpty()){
            return new ResponseEntity<>(new ApiResponse(false, "You don't have permission"),
                    HttpStatus.BAD_REQUEST);
        }
        LOGGER.info("Current Id : {}",userId);
        EmployeeResponse employeeResponse = employeeClient.getEmployee(userId);
        if(employeeResponse.getStatus().equals(UserStatus.ACCEPTED)){
            return new ResponseEntity<>(employeeResponse,HttpStatus.OK);
        }
        return new ResponseEntity<>(new ApiResponse(false,"User with invalid status"),HttpStatus.BAD_REQUEST);
    }


}
