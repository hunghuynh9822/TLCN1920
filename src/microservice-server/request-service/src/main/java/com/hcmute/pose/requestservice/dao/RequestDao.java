package com.hcmute.pose.requestservice.dao;

import com.hcmute.pose.database.connector.exception.TransactionException;
import com.hcmute.pose.requestservice.model.Request;

import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

public interface RequestDao {
    Optional<Long> getLastID ();
    Optional<Request> createRequest (Request request);
    List<Request> getRequests () throws SQLException;
    List<Request> getRequestByEmployee (Long employeeid) throws SQLException, TransactionException;
    void updateRequest(Long id, Boolean confirm) throws SQLException, TransactionException;
    void deleteRequest (Long id , Long employeeid) throws SQLException, TransactionException;
}
