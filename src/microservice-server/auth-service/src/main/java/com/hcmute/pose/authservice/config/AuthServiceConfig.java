package com.hcmute.pose.authservice.config;

import com.hcmute.pose.database.connector.DataSource;
import com.hcmute.pose.database.connector.helper.DatabaseHelper;
import com.hcmute.pose.database.connector.helper.impl.DatabaseHelperImpl;
import com.hcmute.pose.database.connector.impl.DataSourceImpl;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;

import java.sql.SQLException;

@Configuration
public class AuthServiceConfig {
    @Bean
    @LoadBalanced
    public WebClient.Builder builder(){
        return WebClient.builder();
    }

    @Value("${psql.url}")
    private String DBUrl;
    @Value("${psql.username}")
    private String DBUsername;
    @Value("${psql.password}")
    private String DBPassword;

    @Bean
    public DataSource dataSource() throws SQLException {
        return new DataSourceImpl(this.DBUrl, this.DBUsername, this.DBPassword);
    }

    @Bean
    public DatabaseHelper databaseHelper(DataSource dataSource){
        return new DatabaseHelperImpl(dataSource);
    }

}
