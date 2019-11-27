package com.hcmute.pose.requestservice.service;

import com.hcmute.pose.database.connector.exception.TransactionException;
import com.hcmute.pose.requestservice.model.Request;

import java.sql.SQLException;
import java.util.List;

public interface RequestService {
    Request createRequest (Long employeeid, String name, String position, Long timestart, Long timeend, String reason, Boolean confirm) throws Exception;
    List<Request> getRequests () throws SQLException;
    List<Request> getRequestByEmployee (Long employeeid) throws SQLException, TransactionException;
    void updateRequest(Long id, Boolean confirm) throws SQLException, TransactionException;
    void deleteRequest (Long id ) throws SQLException, TransactionException;
}
