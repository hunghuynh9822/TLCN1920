package com.hcmute.pose.notifyservice.buz.impl;

import com.hcmute.pose.database.connector.exception.TransactionException;
import com.hcmute.pose.database.connector.helper.DatabaseHelper;
import com.hcmute.pose.notifyservice.buz.NotifyBuz;
import com.hcmute.pose.notifyservice.model.Notify;
import com.hcmute.pose.notifyservice.payload.NotifyRequest;
import com.hcmute.pose.notifyservice.service.NotifyService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

@Service
public class NotifyBuzImpl implements NotifyBuz {
    private static Logger LOGGER = LoggerFactory.getLogger(NotifyBuz.class);
    @Autowired
    private DatabaseHelper databaseHelper;

    @Autowired
    private NotifyService notifyService;

    @Override
    public Optional<Notify> createNotify(NotifyRequest notifyRequest) throws Exception, TransactionException {
        try{
            databaseHelper.beginTransaction();
            Optional<Notify> notify = notifyService.createNotify(notifyRequest.getCreate_id(),notifyRequest.getCreate_name(),notifyRequest.getCreate_time(),notifyRequest.getContent(),notifyRequest.getReceive_id());
            databaseHelper.commit();
            return notify;
        }catch (Exception | TransactionException e){
            LOGGER.error("createRequest",e);
            throw e;
        }finally {
            databaseHelper.closeConnection();
        }
    }

    @Override
    public List<Notify> getNotifyById(Long receive_id) throws SQLException {
        return notifyService.getNotifyById(receive_id);
    }

    @Override
    public void updateView(Long id, Boolean view) throws SQLException, TransactionException {
        try{
            databaseHelper.beginTransaction();
            notifyService.updateView(id, view);
            databaseHelper.commit();
        }catch (Exception | TransactionException e){
            LOGGER.error("",e);
            throw e;
        }finally {
            databaseHelper.closeConnection();
        }
    }

    @Override
    public void deleteRequest(Long id) throws SQLException, TransactionException {
        try{
            databaseHelper.beginTransaction();
            notifyService.deleteRequest(id);
            databaseHelper.commit();
        }catch (Exception | TransactionException e){
            LOGGER.error("",e);
            throw e;
        }finally {
            databaseHelper.closeConnection();
        }
    }
}
