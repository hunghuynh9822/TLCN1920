package com.hcmute.pose.gatewayproxy;

import com.hcmute.pose.gatewayproxy.filters.ErrorFilter;
import com.hcmute.pose.gatewayproxy.filters.PostFilter;
import com.hcmute.pose.gatewayproxy.filters.PreFilter;
import com.hcmute.pose.gatewayproxy.filters.RouteFilter;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.netflix.zuul.EnableZuulProxy;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
@EnableZuulProxy
@EnableDiscoveryClient
public class GatewayProxyApplication {

	public static void main(String[] args) {
		SpringApplication.run(GatewayProxyApplication.class, args);
	}
    @Bean
    public PreFilter preFilter() {
        return new PreFilter();
    }
}
