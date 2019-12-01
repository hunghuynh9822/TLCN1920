package com.hcmute.pose.taskservice.service.impl;

import com.hcmute.pose.database.connector.exception.TransactionException;
import com.hcmute.pose.taskservice.dao.TaskCommentsDao;
import com.hcmute.pose.taskservice.model.TaskComments;
import com.hcmute.pose.taskservice.service.TaskCommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.util.List;
@Service
public class TaskCommentServiceImpl implements TaskCommentService {

    @Autowired
    private TaskCommentsDao taskCommentsDao;

    @Override
    public TaskComments createTaskComment(Long taskId, Long employeeId, String comment) throws Exception {
        Long id = taskCommentsDao.getLastID().orElseThrow(()-> new Exception("Can not get task comment generate id"));
        TaskComments taskComments = new TaskComments(id,taskId,employeeId,comment,System.currentTimeMillis(),System.currentTimeMillis());
        return taskCommentsDao.createTaskComment(taskComments).orElseThrow(()-> new Exception("Not create TaskComment"));
    }

    @Override
    public List<TaskComments> getListTaskComment(Long taskId) throws SQLException {
        return taskCommentsDao.getListTaskComment(taskId);
    }

    @Override
    public void updateTaskComment(Long taskid, Long employeeId, String comment) throws SQLException, TransactionException {
        taskCommentsDao.updateTaskComment(taskid,employeeId,comment);
    }
}
