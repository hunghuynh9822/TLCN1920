package com.hcmute.tlcn.workmanagement.dbconn.impl;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.concurrent.ConcurrentHashMap;

import com.hcmute.tlcn.workmanagement.dbconn.DataSource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;

public class DataSourceImpl implements DataSource {
    private static Logger LOGGER = LoggerFactory.getLogger(DataSourceImpl.class);

    public Connection connection;
    private HikariConfig config;
    private static HikariDataSource ds;

    private ConcurrentHashMap<Long,Connection> connections;
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
        config.setMaximumPoolSize(10);
        config.setMinimumIdle(0);
        ds = new HikariDataSource( config );
        ds.setLoginTimeout(5);

        connections = new ConcurrentHashMap<>();
    }

    public Connection getConnection() throws SQLException {
        Long threadId = Thread.currentThread().getId();
        if(connections.containsKey(threadId)){
            return connections.get(threadId);
        }
        connections.put(threadId,ds.getConnection());
        return connections.get(threadId);
    }

    public static void closeDataSource() {
        LOGGER.info("Trying to close datasource.");
        ds.close();
    }

    public void rollback() throws SQLException {
        Long threadId = Thread.currentThread().getId();
        if(connections.containsKey(threadId)){
            LOGGER.info("Trying to rollback connection.");
            connections.get(threadId).rollback();
        } else {
            LOGGER.error("Connection attempted to close was null");
        }
    }

    public void closeConnection() {
        try {
            Long threadId = Thread.currentThread().getId();
            if(connections.containsKey(threadId)){
                if (connections.get(threadId) != null) {
                    ds.evictConnection(connections.get(threadId));
                    connections.get(threadId).close();
                    connections.remove(threadId);
                } else {
                    LOGGER.error("Connection attempted to close was null");
                }
            }else {
                LOGGER.error("No thread connection to close connection.");
            }
        } catch (SQLException e) {
            LOGGER.error("Error closing connection... {}",e.getMessage());
        }
    }
}
