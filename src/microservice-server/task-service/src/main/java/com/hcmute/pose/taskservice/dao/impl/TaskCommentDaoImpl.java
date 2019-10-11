package com.hcmute.pose.taskservice.dao.impl;

import com.hcmute.pose.database.connector.exception.TransactionException;
import com.hcmute.pose.database.connector.helper.DatabaseHelper;
import com.hcmute.pose.genuid.GenerateUID;
import com.hcmute.pose.taskservice.dao.TaskCommentsDao;
import com.hcmute.pose.taskservice.model.TaskComments;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

public class TaskCommentDaoImpl implements TaskCommentsDao {

    private static Logger LOGGER = LoggerFactory.getLogger(TaskCommentsDao.class);
    private String SQL_CREATE_TC ="INSERT INTO taskcomments(id,taskId,employeeId,createTime,comment) VALUES(?,?,?,?,?)";
    private String SQL_GET_LIST_TC ="SELECT * FROM taskcomments WHERE taskId=?";
    private String SQL_UPDATE_TC ="UPDATE taskcomments SET comment=? WHERE id=? AND employeeId=?";

    @Autowired
    private DatabaseHelper databaseHelper;

    @Autowired
    private GenerateUID generateUID;

    @Override
    public Optional<Long> getLastID() {
        return generateUID.genUID();
    }

    @Override
    public Optional<TaskComments> createTC(TaskComments taskComments) {
        try {
            databaseHelper.executeNonQuery(SQL_CREATE_TC,
                    taskComments.getId(),
                    taskComments.getTaskID(),
                    taskComments.getEmployeeID(),
                    taskComments.getCreateTime(),
                    taskComments.getComment()
            );
            return Optional.of(taskComments);
        } catch (SQLException | TransactionException e) {
            LOGGER.error("[TaskCommentDaoImpl]:[createTC]", e);
            return Optional.empty();
        }
    }

    @Override
    public List<TaskComments> getListTC(Long tastId) throws SQLException {
        try {
            return databaseHelper.executeQueryListObject(TaskComments[].class,SQL_GET_LIST_TC);
        } catch (SQLException e) {
            LOGGER.error("[TaskDaoImpl]:[getListTaskByID]",e);
            throw e;
        }
    }

    @Override
    public void updateTC(Long taskid, Long employeeId, String comment) throws SQLException, TransactionException {
        databaseHelper.executeNonQuery(SQL_UPDATE_TC,taskid,employeeId,comment);
    }
}
