package com.hcmute.pose.wiki.config;

import com.hcmute.pose.database.connector.DataSource;
import com.hcmute.pose.database.connector.helper.DatabaseHelper;
import com.hcmute.pose.database.connector.helper.impl.DatabaseHelperImpl;
import com.hcmute.pose.database.connector.impl.DataSourceImpl;
import com.hcmute.pose.genuid.GenerateUID;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.sql.SQLException;

@Configuration
public class WikiConfig {
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

    private Integer serviceId = 4;
    @Bean
    public GenerateUID generateUID() throws SQLException {
        return new GenerateUID(DBUrl,DBUsername,DBPassword,serviceId);
    }
}
