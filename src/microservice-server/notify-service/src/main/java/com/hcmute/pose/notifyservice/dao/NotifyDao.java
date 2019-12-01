package com.hcmute.pose.notifyservice.dao;

import com.hcmute.pose.database.connector.exception.TransactionException;
import com.hcmute.pose.notifyservice.model.Notify;
import org.springframework.stereotype.Repository;

import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

@Repository
public interface NotifyDao {
    Optional<Long> getLastID ();
    Optional<Notify> createNotify (Notify notify);
    List<Notify> getNotifyById (Long receive_id) throws SQLException;
    void updateView(Long id, Boolean view) throws SQLException, TransactionException;
    void deleteRequest (Long id) throws SQLException, TransactionException;
}
