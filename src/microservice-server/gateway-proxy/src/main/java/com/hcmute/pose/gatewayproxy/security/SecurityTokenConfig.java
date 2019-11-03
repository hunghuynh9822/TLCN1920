package com.hcmute.pose.gatewayproxy.security;

import com.hcmute.pose.common.security.JwtConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity    // Enable security config. This annotation denotes config for spring security.
@EnableGlobalMethodSecurity(
        securedEnabled = true,
        jsr250Enabled = true,
        prePostEnabled = true
)
public class SecurityTokenConfig extends WebSecurityConfigurerAdapter {
    @Autowired
    private JwtConfig jwtConfig;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .csrf().disable()
                // make sure we use stateless session; session won't be used to store user's state.
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                // handle an authorized attempts
                .exceptionHandling().authenticationEntryPoint(new RestAuthenticationEntryPoint())
                .and()
                // Add a filter to validate the tokens with every request
                .addFilterAfter(new JwtTokenAuthenticationFilter(jwtConfig), UsernamePasswordAuthenticationFilter.class)
                // authorization requests config
                .authorizeRequests()
                // allow all who are accessing "auth" service
                .antMatchers(HttpMethod.POST, jwtConfig.getUris()).permitAll()
                // Remember that Spring needs roles to be in this format: "ROLE_" + userRole (i.e. "ROLE_ADMIN")
                // So, we need to set it to that format, so we can verify and compare roles (i.e. hasRole("ADMIN")).
                // must be an admin if trying to access admin area (authentication is also required here)
                .antMatchers("/emplmicro" + "/api/admin/*").hasRole("ADMIN")
//                .antMatchers("/emplmicro" + "/api/employees/*").authenticated()
                // Any other request must be authenticated
//                .anyRequest().authenticated();
                .anyRequest().permitAll();
    }

    @Bean
    public JwtConfig jwtConfig() {
        return new JwtConfig();
    }
}
