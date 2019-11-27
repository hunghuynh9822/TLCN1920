package com.hcmute.pose.notifyservice.dao.impl;

import com.hcmute.pose.database.connector.exception.TransactionException;
import com.hcmute.pose.database.connector.helper.DatabaseHelper;
import com.hcmute.pose.genuid.GenerateUID;
import com.hcmute.pose.notifyservice.dao.NotifyDao;
import com.hcmute.pose.notifyservice.model.Notify;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

public class NotifyDaoImpl implements NotifyDao {
    private static Logger LOGGER = LoggerFactory.getLogger(Notify.class);
    private static String SQL_INSERT_NOTIFY = "INSERT INTO notify(id, create_id, create_name, create_time, content, receive_id, view) VALUES(?,?,?,?,?,?,?)";
    private static String SQl_GET_NOT_BY_ID = "SELECT * FROM notify WHERE receive_id = ?";
    private static String SQL_UPDATE_VIEW = "UPDATE notify SET view=? WHERE id=?";
    private static String SQL_DELETE_NOT = "DELETE FROM requests WHERE id=?";

    @Autowired
    private DatabaseHelper databaseHelper;

    @Autowired
    private GenerateUID generateUID;

    @Override
    public Optional<Long> getLastID() {
        return generateUID.genUID();
    }


    @Override
    public Optional<Notify> createNotify(Notify notify) {
        try {
            databaseHelper.executeNonQuery(SQL_INSERT_NOTIFY,
                    notify.getId(),
                    notify.getCreate_id(),
                    notify.getCreate_name(),
                    notify.getCreate_time(),
                    notify.getContent(),
                    notify.getReceive_id(),
                    notify.getView()
            );
            return Optional.of(notify);
        } catch (SQLException | TransactionException e) {
            LOGGER.error("[NotifyDaoImpl]:[createNot]", e);
            return Optional.empty();
        }
    }

    @Override
    public List<Notify> getNotifyById(Long receive_id) throws SQLException {
        try {
            return databaseHelper.executeQueryListObject(Notify[].class,SQl_GET_NOT_BY_ID,receive_id);
        } catch (SQLException e) {
            LOGGER.error("[NotifyDaoImpl]:[getListNotById]",e);
            throw e;
        }
    }

    @Override
    public void updateView(Long id, Boolean view) throws SQLException, TransactionException {
        try {
            databaseHelper.executeNonQuery(SQL_UPDATE_VIEW,
                    view,
                    id
            );
        } catch (SQLException | TransactionException e) {
            LOGGER.error("[NotifyDaoImpl]:[updateView]", e);
            throw e;
        }
    }

    @Override
    public void deleteRequest(Long id) throws SQLException, TransactionException {
        try {
            databaseHelper.executeNonQuery(SQL_DELETE_NOT,id);
        } catch (SQLException | TransactionException e) {
            LOGGER.error("[NotifyDaoImpl]:[DeleteNot]", e);
            throw e;
        }
    }
}
