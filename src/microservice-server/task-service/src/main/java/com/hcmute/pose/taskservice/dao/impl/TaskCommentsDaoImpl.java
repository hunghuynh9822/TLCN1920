package com.hcmute.pose.taskservice.dao.impl;

import com.hcmute.pose.database.connector.exception.TransactionException;
import com.hcmute.pose.database.connector.helper.DatabaseHelper;
import com.hcmute.pose.genuid.GenerateUID;
import com.hcmute.pose.taskservice.dao.TaskCommentsDao;
import com.hcmute.pose.taskservice.model.TaskComments;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.sql.SQLException;
import java.util.List;
import java.util.Optional;
@Repository
public class TaskCommentsDaoImpl implements TaskCommentsDao {

    private static Logger LOGGER = LoggerFactory.getLogger(TaskCommentsDao.class);
    private String SQL_CREATE_TASK_COMMENT ="INSERT INTO taskcomments(id,task_id,employee_id,comment,created_at,updated_at) VALUES(?,?,?,?,?,?)";
    private String SQL_SELECT_TASK_COMMENTS ="SELECT * FROM taskcomments WHERE task_id=?";
    private String SQL_UPDATE_TASK_COMMENT ="UPDATE taskcomments SET comment=?, updated_at=? WHERE id=? AND employee_id=?";

    @Autowired
    private DatabaseHelper databaseHelper;

    @Autowired
    private GenerateUID generateUID;

    @Override
    public Optional<Long> getLastID() {
        return generateUID.genUID();
    }

    @Override
    public Optional<TaskComments> createTaskComment(TaskComments taskComments) {
        try {
            databaseHelper.executeNonQuery(SQL_CREATE_TASK_COMMENT,
                    taskComments.getId(),
                    taskComments.getTaskId(),
                    taskComments.getEmployeeId(),
                    taskComments.getComment(),
                    taskComments.getCreatedAt(),
                    taskComments.getUpdatedAt()
            );
            return Optional.of(taskComments);
        } catch (SQLException | TransactionException e) {
            LOGGER.error("[TaskCommentsDaoImpl]:[createTaskComment]", e);
            return Optional.empty();
        }
    }

    @Override
    public List<TaskComments> getListTaskComment(Long tastId) throws SQLException {
        try {
            return databaseHelper.executeQueryListObject(TaskComments[].class,SQL_SELECT_TASK_COMMENTS,tastId);
        } catch (SQLException e) {
            LOGGER.error("[TaskCommentsDaoImpl]:[getListTaskComment]",e);
            throw e;
        }
    }

    @Override
    public void updateTaskComment(Long taskId, Long employeeId, String comment) throws SQLException, TransactionException {
        try {
            databaseHelper.executeNonQuery(SQL_UPDATE_TASK_COMMENT, comment, System.currentTimeMillis(), taskId, employeeId);
        }catch(SQLException e){
            LOGGER.error("[TaskCommentsDaoImpl]:[updateTaskComment]",e);
            throw e;
        }
    }
}
