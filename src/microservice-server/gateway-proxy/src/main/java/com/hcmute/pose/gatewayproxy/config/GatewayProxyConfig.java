package com.hcmute.pose.gatewayproxy.config;

import com.hcmute.pose.gatewayproxy.filters.ErrorFilter;
import com.hcmute.pose.gatewayproxy.filters.PostFilter;
import com.hcmute.pose.gatewayproxy.filters.PreFilter;
import com.hcmute.pose.gatewayproxy.filters.RouteFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class GatewayProxyConfig {
    @Bean
    public PreFilter preFilter() {
        return new PreFilter();
    }
    @Bean
    public PostFilter postFilter() {
        return new PostFilter();
    }
    @Bean
    public ErrorFilter errorFilter() {
        return new ErrorFilter();
    }
    @Bean
    public RouteFilter routeFilter() {
        return new RouteFilter();
    }
}
