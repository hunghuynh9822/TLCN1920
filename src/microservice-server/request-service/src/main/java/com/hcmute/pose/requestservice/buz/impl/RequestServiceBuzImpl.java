package com.hcmute.pose.requestservice.buz.impl;

import com.hcmute.pose.database.connector.exception.TransactionException;
import com.hcmute.pose.database.connector.helper.DatabaseHelper;
import com.hcmute.pose.requestservice.buz.RequestServiceBuz;
import com.hcmute.pose.requestservice.model.Request;
import com.hcmute.pose.requestservice.payload.RequestRequest;
import com.hcmute.pose.requestservice.service.RequestService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.util.List;

@Service
public class RequestServiceBuzImpl implements RequestServiceBuz {
    private static Logger LOGGER = LoggerFactory.getLogger(RequestServiceBuz.class);
    @Autowired
    private DatabaseHelper databaseHelper;

    @Autowired
    private RequestService requestService;

    @Override
    public Request createRequest(RequestRequest requestRequest) throws Exception, TransactionException {
        try{
            databaseHelper.beginTransaction();
            Request request = requestService.createRequest(requestRequest.getEmployeeid(),requestRequest.getName(),requestRequest.getPosition(),requestRequest.getTimestart(),requestRequest.getTimeend(),requestRequest.getReason(),requestRequest.getConfirm());
            databaseHelper.commit();
            return request;
        }catch (Exception | TransactionException e){
            LOGGER.error("createRequest",e);
            throw e;
        }finally {
            databaseHelper.closeConnection();
        }
    }

    @Override
    public List<Request> getRequests() throws SQLException {
        return requestService.getRequests();
    }

    @Override
    public List<Request> getRequestByEmployee(Long employeeid) throws SQLException, TransactionException {
        return requestService.getRequestByEmployee(employeeid);
    }

    @Override
    public void updateRequest(Long id, Boolean confirm) throws SQLException, TransactionException {
        try{
            databaseHelper.beginTransaction();
            requestService.updateRequest(id, confirm);
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
            requestService.deleteRequest(id);
            databaseHelper.commit();
        }catch (Exception | TransactionException e){
            LOGGER.error("",e);
            throw e;
        }finally {
            databaseHelper.closeConnection();
        }
    }
}
