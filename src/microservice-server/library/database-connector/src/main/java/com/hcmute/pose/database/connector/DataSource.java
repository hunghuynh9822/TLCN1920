package com.hcmute.pose.database.connector;

import java.sql.Connection;
import java.sql.SQLException;

public interface DataSource {
    Connection getConnection() throws SQLException;
    void closeDataSource();
    void closeConnection();
    void rollback() throws SQLException;
}
