package com.hcmute.pose.webhook.buz.impl;

import com.hcmute.pose.database.connector.exception.TransactionException;
import com.hcmute.pose.database.connector.helper.DatabaseHelper;
import com.hcmute.pose.webhook.buz.WebHookBuz;
import com.hcmute.pose.webhook.model.WebHookData;
import com.hcmute.pose.webhook.payload.AllWebHookReponse;
import com.hcmute.pose.webhook.payload.WebHookReponse;
import com.hcmute.pose.webhook.payload.WebHookRequest;
import com.hcmute.pose.webhook.service.WebHookService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@Service
public class WebHookBuzImpl implements WebHookBuz {
    private static Logger LOGGER = LoggerFactory.getLogger(WebHookBuzImpl.class);
    @Autowired
    private DatabaseHelper databaseHelper;
    @Autowired
    private WebHookService webHookService;

    @Override
    public AllWebHookReponse getListWebhook() throws Exception {
        try {
            List<WebHookData> webHookDatas =  webHookService.getListWebhook();
            return new AllWebHookReponse(webHookDatas);
        } finally {
            databaseHelper.closeConnection();
        }
    }

    @Override
    public void updateWebhook(WebHookRequest webHookRequest) throws Exception, TransactionException {
        try{
            databaseHelper.beginTransaction();
            webHookService.updateWebhook(webHookRequest.getId(), webHookRequest.getIdPro(),webHookRequest.getBotToken(),webHookRequest.getChatId(),webHookRequest.getCreateTask(),webHookRequest.getUpdateTask(),webHookRequest.getUpdateState());
            databaseHelper.commit();
        }catch (Exception | TransactionException e){
            LOGGER.error("[updateWebhook]",e);
            throw e;
        }finally {
            databaseHelper.closeConnection();
        }
    }

    @Override
    public AllWebHookReponse getWebhook(Long idPro) throws Exception {
        try {
            List<WebHookData> webHookDatas = (List<WebHookData>) webHookService.getWebhook(idPro);
            return new AllWebHookReponse(webHookDatas);
        } finally {
            databaseHelper.closeConnection();
        }
    }

    @Override
    public WebHookData createWebhook(WebHookRequest webHookRequest) throws Exception, TransactionException {
        try{
            databaseHelper.beginTransaction();
            WebHookData webHookData = webHookService.createWebhook(webHookRequest.getIdPro(),webHookRequest.getBotToken(),webHookRequest.getChatId(),webHookRequest.getCreateTask(),webHookRequest.getUpdateTask(),webHookRequest.getUpdateState());
            databaseHelper.commit();
            return webHookData;
        }catch (Exception | TransactionException e){
            LOGGER.error("[createWebhook]",e);
            throw e;
        } finally {
            databaseHelper.closeConnection();
        }
    }

    @Override
    public void deleteWebhook(Long id) throws Exception, TransactionException {
        try{
            databaseHelper.beginTransaction();
            webHookService.deleteWebhook(id);
            databaseHelper.commit();
        }catch (Exception | TransactionException e){
            LOGGER.error("[deleteWebhook]",e);
            throw e;
        }finally {
            databaseHelper.closeConnection();
        }
    }
}
