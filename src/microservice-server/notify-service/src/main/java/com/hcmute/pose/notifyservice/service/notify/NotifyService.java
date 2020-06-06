package com.hcmute.pose.notifyservice.service.notify;

import com.hcmute.pose.database.connector.exception.TransactionException;
import com.hcmute.pose.notifyservice.model.notify.Notify;

import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

public interface NotifyService {
    Optional<Notify> createNotify (Long create_id, String create_name, Long create_time ,String content , Long receive_id ) throws Exception;
    List<Notify> getNotifyById (Long receive_id) throws SQLException;
    void updateView(Long id, Boolean view) throws SQLException, TransactionException;
    void deleteRequest (Long id) throws SQLException, TransactionException;
}
