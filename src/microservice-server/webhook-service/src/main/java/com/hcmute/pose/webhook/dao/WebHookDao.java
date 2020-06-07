package com.hcmute.pose.webhook.dao;

import com.hcmute.pose.database.connector.exception.TransactionException;
import com.hcmute.pose.webhook.model.WebHookData;

import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

public interface WebHookDao {
    Optional<Long> getLastID();
    Optional<WebHookData> createWebhook(WebHookData webHookData);
    List<WebHookData> getListWebhook() throws SQLException;
    void updateWebhook(WebHookData webHookData) throws SQLException, TransactionException;
    Optional<Object> getWebhook(Long idPro);
    Object deleteWebhook(Long id) throws SQLException, TransactionException;
}
