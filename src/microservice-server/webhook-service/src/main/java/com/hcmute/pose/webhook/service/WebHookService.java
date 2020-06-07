package com.hcmute.pose.webhook.service;

import com.hcmute.pose.database.connector.exception.TransactionException;
import com.hcmute.pose.webhook.model.WebHookData;

import java.sql.SQLException;
import java.util.List;

public interface WebHookService {
    WebHookData createWebhook(Long idPro,String name,String bot_token, String chat_id, Boolean create_task, Boolean update_task, Boolean update_state) throws Exception;
    List<WebHookData> getListWebhook () throws SQLException;
    void updateWebhook(Long id,Long idPro,String name, String bot_token, String chat_id, Boolean create_task, Boolean update_task, Boolean update_state) throws SQLException, TransactionException;
    Object getWebhook(Long idPro) throws Exception;
    void deleteWebhook(Long id) throws SQLException, TransactionException, Exception;

}
