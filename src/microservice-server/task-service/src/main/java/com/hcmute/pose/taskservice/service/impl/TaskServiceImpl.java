package com.hcmute.pose.taskservice.service.impl;

import com.hcmute.pose.database.connector.exception.TransactionException;
import com.hcmute.pose.taskservice.dao.impl.TaskDaoImpl;
import com.hcmute.pose.taskservice.model.Task;
import com.hcmute.pose.taskservice.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;

import java.sql.SQLException;
import java.util.List;

public class TaskServiceImpl implements TaskService {

    @Autowired
    private TaskDaoImpl taskDao;

    @Override
    public Task createTask(Long employee,Long projectId, String title, Integer duration) throws Exception {
        Long taskId = taskDao.getLastID().orElseThrow(()-> new Exception("Not get ID"));
        Task task = new Task(taskId,employee,projectId,title,System.currentTimeMillis(),duration,false,0);
        return  taskDao.createTask(task).orElseThrow(()-> new Exception("Not doing AddTask "));
    }

    @Override
    public List<Task> getListTaskByID(Long projectId, Long employeeId) throws SQLException {
        return taskDao.getListTaskByID(projectId,employeeId);
    }

    @Override
    public void updatePoint(Long taskId, Integer point) throws SQLException, TransactionException {
        taskDao.updatePoint(taskId,point);
    }

    @Override
    public void updateStatus(Long taskId, Boolean status) throws SQLException, TransactionException {
        taskDao.updateStatus(taskId,status);
    }

    @Override
    public Boolean exitsTask(Long employeeId, Long projectId, String title) throws SQLException {
        return taskDao.exitsTask(employeeId,projectId,title);
    }
}
