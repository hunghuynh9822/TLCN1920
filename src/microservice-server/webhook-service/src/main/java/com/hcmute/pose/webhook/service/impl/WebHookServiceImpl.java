package com.hcmute.pose.webhook.service.impl;

import com.hcmute.pose.database.connector.exception.TransactionException;
import com.hcmute.pose.webhook.dao.WebHookDao;
import com.hcmute.pose.webhook.model.WebHookData;
import com.hcmute.pose.webhook.service.WebHookService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.util.List;

@Service
public class WebHookServiceImpl implements WebHookService {
    private static Logger LOGGER = LoggerFactory.getLogger(WebHookServiceImpl.class);
    @Autowired
    private WebHookDao webHookDao;

    @Override
    public WebHookData createWebhook(Long idPro, String bot_token, String chat_id, Boolean create_task, Boolean update_task, Boolean update_state) throws Exception {
        Long id = webHookDao.getLastID().orElseThrow(()-> new Exception("Can not get generated id"));
        WebHookData webHookData = new WebHookData(id, idPro, bot_token,chat_id,create_task,update_task,update_state);
        return  webHookDao.createWebhook(webHookData).orElseThrow(()-> new Exception("Can not create webhook"));
    }

    @Override
    public List<WebHookData> getListWebhook() throws SQLException {
        return webHookDao.getListWebhook();
    }

    @Override
    public void updateWebhook(Long id,Long idPro, String bot_token, String chat_id, Boolean create_task, Boolean update_task, Boolean update_state) throws SQLException, TransactionException {
        WebHookData webHookData = new WebHookData(id,idPro, bot_token, chat_id, create_task,update_task,update_state);
        webHookDao.updateWebhook(webHookData);
    }

    @Override
    public Object getWebhook(Long idPro) throws Exception {
        return webHookDao.getWebhook(idPro).orElseThrow(()-> new Exception("Can not get webhook " + idPro));
    }

    @Override
    public void deleteWebhook(Long id) throws Exception {
        try {
            webHookDao.deleteWebhook(id);
        } catch (TransactionException e) {
            e.printStackTrace();
        }
    }
}
