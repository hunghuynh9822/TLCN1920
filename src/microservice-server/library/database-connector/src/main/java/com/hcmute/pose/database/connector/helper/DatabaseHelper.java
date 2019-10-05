package com.hcmute.pose.database.connector.helper;

import com.hcmute.pose.database.connector.exception.TransactionException;

import java.io.Serializable;
import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

public interface DatabaseHelper {
    <T extends Serializable> Optional<T> executeQueryObject(Class<T> target,String sql, Object... args) throws SQLException;
    <T extends Serializable> List<T> executeQueryListObject(String sql, Object... args) throws SQLException;
    void beginTransaction();
    void executeNonQuery(String sql, Object... args) throws SQLException, TransactionException;
    void executeNonQuery(String sql,Integer autoGeneratedKeys, Object... args) throws SQLException, TransactionException;
    void commit() throws SQLException, TransactionException;
    void closeConnection();
}
