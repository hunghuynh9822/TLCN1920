package com.hcmute.tlcn.workmanagement.dbconn.impl;

import java.sql.Connection;
import java.sql.SQLException;

import com.hcmute.tlcn.workmanagement.dbconn.DataSource;
import org.springframework.beans.factory.annotation.Autowired;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;

public class DataSourceImpl implements DataSource {
    private HikariConfig config;
    private HikariDataSource ds;
    @Autowired
    public DataSourceImpl(String url, String userName, String password) throws SQLException {
        config = new HikariConfig();
        config.setJdbcUrl(url);
        config.setUsername(userName);
        config.setPassword(password);
        config.setDriverClassName("org.postgresql.Driver");
        config.addDataSourceProperty("ssl", "true");
        config.addDataSourceProperty("sslfactory", "org.postgresql.ssl.NonValidatingFactory");
        config.addDataSourceProperty( "cachePrepStmts" , "true" );
        config.addDataSourceProperty( "prepStmtCacheSize" , "250" );
        config.addDataSourceProperty( "prepStmtCacheSqlLimit" , "2048" );
        config.setIdleTimeout(60000);
        config.setConnectionTimeout(60000);
        config.setValidationTimeout(3000);
        config.setMaxLifetime(60000);
        config.setMaximumPoolSize(60);
        config.setMinimumIdle(0);
        ds = new HikariDataSource( config );
        ds.setLoginTimeout(5);
    }

    public Connection getConnection() throws SQLException {
        return ds.getConnection();
    }
}
