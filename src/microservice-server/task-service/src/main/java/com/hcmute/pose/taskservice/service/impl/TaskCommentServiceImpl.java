package com.hcmute.pose.taskservice.service.impl;

import com.hcmute.pose.database.connector.exception.TransactionException;
import com.hcmute.pose.taskservice.dao.TaskCommentsDao;
import com.hcmute.pose.taskservice.model.TaskComments;
import com.hcmute.pose.taskservice.service.TaskCommentService;
import org.springframework.beans.factory.annotation.Autowired;

import java.sql.SQLException;
import java.util.List;

public class TaskCommentServiceImpl implements TaskCommentService {

    @Autowired
    private TaskCommentsDao taskCommentsDao;

    @Override
    public TaskComments createTC(Long taskID, Long employeeId, Long createTime, String comment) throws Exception {
        Long id = taskCommentsDao.getLastID().orElseThrow(()-> new Exception("Not create Id_TC"));
        TaskComments taskComments = new TaskComments(id,taskID,employeeId,createTime,comment);
        return taskCommentsDao.createTC(taskComments).orElseThrow(()-> new Exception("Not create TaskComment"));
    }

    @Override
    public List<TaskComments> getListTC(Long taskId) throws SQLException {
        return taskCommentsDao.getListTC(taskId);
    }

    @Override
    public void updateComment(Long taskid, Long employeeId, String comment) throws SQLException, TransactionException {
        taskCommentsDao.updateTC(taskid,employeeId,comment);
    }
}
