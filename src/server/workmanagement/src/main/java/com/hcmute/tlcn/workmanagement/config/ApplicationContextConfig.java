package com.hcmute.tlcn.workmanagement.config;

import com.hcmute.tlcn.workmanagement.dbconn.DataSource;
import com.hcmute.tlcn.workmanagement.dbconn.impl.DataSourceImpl;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

import java.sql.SQLException;

@Configuration
@PropertySource("classpath:application.properties")
public class ApplicationContextConfig {

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

}
