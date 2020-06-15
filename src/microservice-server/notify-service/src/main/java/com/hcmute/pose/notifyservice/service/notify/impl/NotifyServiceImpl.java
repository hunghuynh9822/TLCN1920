package com.hcmute.pose.notifyservice.service.notify.impl;

import com.hcmute.pose.database.connector.exception.TransactionException;
import com.hcmute.pose.notifyservice.dao.notify.NotifyDao;
import com.hcmute.pose.notifyservice.model.notify.Notify;
import com.hcmute.pose.notifyservice.service.notify.NotifyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

@Service
public class NotifyServiceImpl implements NotifyService {
    @Autowired
    private NotifyDao notifyDao;

    @Override
    public Optional<Notify> createNotify(Long create_id, String create_name, Long create_time, String content, Long receive_id) throws Exception {
        Long id = notifyDao.getLastID().orElseThrow(() -> new Exception("Can not get generated id"));
        Notify request = new Notify(id, create_id, create_name, create_time, content, receive_id, false);
        return Optional.ofNullable(notifyDao.createNotify(request).orElseThrow(() -> new Exception("Can not create project")));
    }

    @Override
    public List<Notify> getNotifyById(Long receive_id) throws SQLException {
        return notifyDao.getNotifyById(receive_id);
    }

    @Override
    public void updateView(Long id, Boolean view) throws SQLException, TransactionException {
        notifyDao.updateView(id,view);
    }

    @Override
    public void deleteRequest(Long id) throws SQLException, TransactionException {
        notifyDao.deleteRequest(id);
    }
}
