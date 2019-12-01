package com.hcmute.pose.requestservice.service.impl;

import com.hcmute.pose.database.connector.exception.TransactionException;
import com.hcmute.pose.requestservice.dao.RequestDao;
import com.hcmute.pose.requestservice.model.Request;
import com.hcmute.pose.requestservice.service.RequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.util.List;

@Service
public class RequestServiceImpl implements RequestService {

    @Autowired
    private RequestDao requestDao;

    @Override
    public Request createRequest(Long employeeid, String name, String position, Long timestart, Long timeend, String reason, Boolean confirm) throws Exception {
        Long id = requestDao.getLastID().orElseThrow(()-> new Exception("Can not get generated id"));
        Request request = new Request(id, employeeid, name, position , timestart, timeend , reason , confirm);
        return  requestDao.createRequest(request).orElseThrow(()-> new Exception("Can not create project"));
    }

    @Override
    public List<Request> getRequests() throws SQLException {
        return requestDao.getRequests();
    }

    @Override
    public List<Request> getRequestByEmployee(Long employeeid) throws SQLException, TransactionException {
        return requestDao.getRequestByEmployee(employeeid);
    }

    @Override
    public void updateRequest(Long id, Boolean confirm) throws SQLException, TransactionException {
        requestDao.updateRequest(id,confirm);
    }

    @Override
    public void deleteRequest(Long id) throws SQLException, TransactionException {
        requestDao.deleteRequest(id);
    }
}
