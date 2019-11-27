package com.hcmute.pose.notifyservice.buz;

import com.hcmute.pose.database.connector.exception.TransactionException;
import com.hcmute.pose.notifyservice.model.Notify;
import com.hcmute.pose.notifyservice.payload.NotifyRequest;

import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

public interface NotifyBuz {
    Optional<Notify> createNotify (NotifyRequest notifyRequest) throws Exception, TransactionException;
    List<Notify> getNotifyById (Long receive_id) throws SQLException;
    void updateView(Long id, Boolean view) throws SQLException, TransactionException;
    void deleteRequest (Long id) throws SQLException, TransactionException;
}
