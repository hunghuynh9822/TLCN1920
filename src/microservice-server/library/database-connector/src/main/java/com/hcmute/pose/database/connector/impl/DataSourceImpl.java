package com.hcmute.pose.database.connector.impl;

import com.hcmute.pose.database.connector.DataSource;
import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.concurrent.ConcurrentHashMap;

public class DataSourceImpl implements DataSource {
    private static Logger LOGGER = LoggerFactory.getLogger(DataSourceImpl.class);

    private HikariConfig config;
    private HikariDataSource ds;

    private ConcurrentHashMap<Long,Connection> connections;
    @Autowired
    public DataSourceImpl(String url, String userName, String password) throws SQLException {
        config = new HikariConfig();
        config.setJdbcUrl(url);
        config.setUsername(userName);
        config.setPassword(password);
        config.setDriverClassName("org.postgresql.Driver");
//        config.addDataSourceProperty("ssl", "true");
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

    @Override
    public Connection getConnection() throws SQLException {
        Long threadId = Thread.currentThread().getId();
        if(connections.containsKey(threadId)){
            return connections.get(threadId);
        }
        Connection conn = ds.getConnection();
        conn.setAutoCommit(false);
        connections.put(threadId,conn);
        return conn;
    }

    @Override
    public void closeDataSource() {
        LOGGER.info("Trying to close datasource.");
        ds.close();
    }

    @Override
    public void rollback() throws SQLException {
        Long threadId = Thread.currentThread().getId();
        if(connections.containsKey(threadId)){
            connections.get(threadId).rollback();
        } else {
            LOGGER.error("Connection attempted to close was null");
        }
    }

    @Override
    public void closeConnection() {
        try {
            Long threadId = Thread.currentThread().getId();
            if(connections.containsKey(threadId)){
                if (connections.get(threadId) != null) {
                    connections.get(threadId).close();
                    ds.evictConnection(connections.get(threadId));
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
