package com.hcmute.pose.taskservice.dao.impl;

import com.hcmute.pose.database.connector.exception.TransactionException;
import com.hcmute.pose.database.connector.helper.DatabaseHelper;
import com.hcmute.pose.genuid.GenerateUID;
import com.hcmute.pose.taskservice.dao.TaskDao;
import com.hcmute.pose.taskservice.model.Task;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.sql.SQLException;
import java.util.List;
import java.util.Optional;
@Repository
public class TaskDaoImpl implements TaskDao {
    private static Logger LOGGER = LoggerFactory.getLogger(TaskDaoImpl.class);
    private static String SQL_INSERT_TASK = "INSERT INTO tasks(id,employeeid,projectid,title,startdate,duration,status,point) VALUES(?,?,?,?,?,?,?,?)";
    private static String SQl_GET_LIST_TASK = "SELECT * FROM tasks WHERE employeeid = ? AND projectid=?";
    private static String SQL_UPDATE_POINT = "UPDATE tasks SET point=? WHERE id=?";
    private static String SQL_UPDATE_STATUS = "UPDATE tasks SET status=? WHERE id=?";
    private static String SQL_CHECKEXITS_TASK = "SELECT * FROM tasks WHERE employeeid=? AND projectid=? AND title=?";
    @Autowired
    private DatabaseHelper databaseHelper;

    @Autowired
    private GenerateUID generateUID;

    @Override
    public Optional<Long> getLastID() {
        return generateUID.genUID();
    }

    @Override
    public Optional<Task> createTask(Task task) {
        try {
            databaseHelper.executeNonQuery(SQL_INSERT_TASK,
                    task.getId(),
                    task.getEmployeeId(),
                    task.getProjectId(),
                    task.getTitle(),
                    task.getStartDate(),
                    task.getDuration(),
                    task.getStatus(),
                    task.getPoint()
                    );
            return Optional.of(task);
        } catch (SQLException | TransactionException e) {
            LOGGER.error("[TaskDaoImpl]:[createTask]", e);
            return Optional.empty();
        }
    }

    @Override
    public List<Task> getListTaskByID(Long projectId, Long employeeId) throws SQLException {
        try {
            return databaseHelper.executeQueryListObject(Task[].class,SQl_GET_LIST_TASK,employeeId,projectId);
        } catch (SQLException e) {
            LOGGER.error("[TaskDaoImpl]:[getListTaskByID]",e);
            throw e;
        }

    }

    @Override
    public void updatePoint(Long taskId, int point) throws SQLException, TransactionException {
        databaseHelper.executeNonQuery(SQL_UPDATE_POINT,point,taskId);
    }

    @Override
    public void updateStatus(Long taskId, boolean status) throws SQLException, TransactionException {
        databaseHelper.executeNonQuery(SQL_UPDATE_STATUS,status,taskId);
    }

    @Override
    public Boolean exitsTask(Long employeeId, Long projecuId, String title) throws SQLException {
        return this.databaseHelper.executeQueryObject(Task.class,SQL_CHECKEXITS_TASK,employeeId,projecuId,title).isPresent();
    }

}
