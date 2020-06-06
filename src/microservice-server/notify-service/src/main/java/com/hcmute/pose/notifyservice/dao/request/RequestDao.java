package com.hcmute.pose.notifyservice.dao.request;

import com.hcmute.pose.database.connector.exception.TransactionException;
import com.hcmute.pose.notifyservice.model.request.Request;

import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

public interface RequestDao {
    Optional<Long> getLastID ();
    Optional<Request> createRequest (Request request);
    List<Request> getRequests () throws SQLException;
    List<Request> getRequestByEmployee (Long employeeid) throws SQLException, TransactionException;
    void updateRequest(Long id, Boolean confirm) throws SQLException, TransactionException;
    void deleteRequest (Long id ) throws SQLException, TransactionException;
}
