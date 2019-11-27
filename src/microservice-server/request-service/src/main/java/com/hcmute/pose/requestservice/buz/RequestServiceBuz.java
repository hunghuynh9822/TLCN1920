package com.hcmute.pose.requestservice.buz;

import com.hcmute.pose.database.connector.exception.TransactionException;
import com.hcmute.pose.requestservice.model.Request;
import com.hcmute.pose.requestservice.payload.RequestRequest;

import java.sql.SQLException;
import java.util.List;

public interface RequestServiceBuz {
    Request createRequest (RequestRequest requestRequest) throws Exception, TransactionException;
    List<Request> getRequests () throws SQLException;
    List<Request> getRequestByEmployee (Long employeeid) throws SQLException, TransactionException;
    void updateRequest(Long id, Boolean confirm) throws SQLException, TransactionException;
    void deleteRequest (Long id ) throws SQLException, TransactionException;
}
