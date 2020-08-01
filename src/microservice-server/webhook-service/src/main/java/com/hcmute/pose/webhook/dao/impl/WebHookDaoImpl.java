package com.hcmute.pose.webhook.dao.impl;

import com.hcmute.pose.database.connector.exception.TransactionException;
import com.hcmute.pose.database.connector.helper.DatabaseHelper;
import com.hcmute.pose.genuid.GenerateUID;
import com.hcmute.pose.webhook.dao.WebHookDao;
import com.hcmute.pose.webhook.model.WebHookData;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

@Repository
public class WebHookDaoImpl implements WebHookDao {
    private static Logger LOGGER = LoggerFactory.getLogger(WebHookDaoImpl.class);
    private static String SQL_INSERT_WEBHOOK = "INSERT INTO webhook(id_webhook, id_project, name_webhook, bot_token, chat_id, create_task, update_task, update_state) VALUES(?,?,?,?,?,?,?,?)";
    private static String SQl_GET_LIST_WEBHOOK = "SELECT * FROM webhook order by id_webhook";
    private static String SQl_GET_WEBHOOK = "SELECT * FROM webhook WHERE id_project = ?";
    private static String SQL_UPDATE_WEBHOOK = "UPDATE webhook SET bot_token=?, chat_id=?,name_webhook=?, create_task=?, update_task=?, update_state=? WHERE id_webhook=?";
    private static String SQL_DELETE_WEBHOOK = "DELETE FROM webhook WHERE id_webhook=?";
    @Autowired
    private DatabaseHelper databaseHelper;

    @Autowired
    private GenerateUID generateUID;

    @Override
    public Optional<Long> getLastID() {
        return generateUID.genUID();
    }

    @Override
    public Optional<WebHookData> createWebhook(WebHookData webHookData) {
        try {
            databaseHelper.executeNonQuery(SQL_INSERT_WEBHOOK,
                    webHookData.getId(),
                    webHookData.getIdPro(),
                    webHookData.getName(),
                    webHookData.getBotToken(),
                    webHookData.getChatId(),
                    webHookData.isCreateTask(),
                    webHookData.isUpdateTask(),
                    webHookData.isUpdateState()
            );
            return Optional.of(webHookData);
        } catch (SQLException | TransactionException e) {
            LOGGER.error("[ProjectDaoImpl]:[createPro]", e);
            return Optional.empty();
        }
    }

    @Override
    public List<WebHookData> getListWebhook() throws SQLException {
        try {
            return databaseHelper.executeQueryListObject(WebHookData[].class,SQl_GET_LIST_WEBHOOK);
        } catch (SQLException e) {
            LOGGER.error("[ProjectDaoImpl]:[getListPro]",e);
            throw e;
        }
    }

    @Override
    public void updateWebhook(WebHookData webHookData) throws SQLException, TransactionException {
        try {
            databaseHelper.executeNonQuery(SQL_UPDATE_WEBHOOK,
                    webHookData.getBotToken(),
                    webHookData.getChatId(),
                    webHookData.getName(),
                    webHookData.isCreateTask(),
                    webHookData.isUpdateTask(),
                    webHookData.isUpdateState(),
                    webHookData.getId()
            );
        } catch (SQLException | TransactionException e) {
            LOGGER.error("[ProjectDaoImpl]:[updateState]", e);
            throw e;
        }
    }

    @Override
    public Optional<Object> getWebhook(Long idPro) {
        try {
            return Optional.of(databaseHelper.executeQueryListObject(WebHookData[].class, SQl_GET_WEBHOOK, idPro));
        } catch (SQLException e) {
            LOGGER.error("[ProjectDaoImpl]:[getProject]",e);
            return Optional.empty();
        }
    }

    @Override
    public Object deleteWebhook(Long id) throws SQLException, TransactionException {
        try {
            databaseHelper.executeNonQuery(SQL_DELETE_WEBHOOK, id);
        } catch (SQLException | TransactionException e) {
            LOGGER.error("[ProjectDaoImpl]:[updateState]", e);
            throw e;
        }
        return null;
    }
}
