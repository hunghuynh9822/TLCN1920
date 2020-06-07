package com.hcmute.pose.webhook.buz;

import com.hcmute.pose.database.connector.exception.TransactionException;
import com.hcmute.pose.webhook.model.WebHookData;
import com.hcmute.pose.webhook.payload.AllWebHookReponse;
import com.hcmute.pose.webhook.payload.WebHookRequest;

import java.sql.SQLException;

public interface WebHookBuz {
    AllWebHookReponse getListWebhook() throws Exception;
    void updateWebhook(WebHookRequest webHookRequest) throws Exception, TransactionException;
    AllWebHookReponse getWebhook(Long idPro) throws Exception;
    WebHookData createWebhook (WebHookRequest webHookRequest) throws Exception, TransactionException;
    void deleteWebhook (Long id) throws Exception, TransactionException;
}
