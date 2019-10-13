package com.hcmute.pose.taskservice.buz.impl;

import com.hcmute.pose.database.connector.exception.TransactionException;
import com.hcmute.pose.database.connector.helper.DatabaseHelper;
import com.hcmute.pose.taskservice.buz.TaskBuz;
import com.hcmute.pose.taskservice.model.Task;
import com.hcmute.pose.taskservice.payload.TaskRequest;
import com.hcmute.pose.taskservice.service.TaskService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Array;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
@Service
public class TaskBuzImpl implements TaskBuz {
    private static Logger LOGGER = LoggerFactory.getLogger(TaskBuzImpl.class);
    @Autowired
    private DatabaseHelper databaseHelper;

    @Autowired
    private TaskService taskService;



    @Override
    public Optional<Task> createTask(TaskRequest taskRequest) throws Exception, TransactionException {
        try{
            databaseHelper.beginTransaction();
            if(taskService.exitsTask(taskRequest.getEmployeeId(),taskRequest.getProjectId(),taskRequest.getTitle())) {
                throw new Exception("Title " + taskRequest.getTitle() + "is duplicate" );
            }
            Task task = taskService.createTask(taskRequest.getEmployeeId(),taskRequest.getProjectId(),taskRequest.getTitle(),taskRequest.getDuration());
            databaseHelper.commit();

            return Optional.of(task);
        }catch (Exception e) {
            LOGGER.error("",e);
            return Optional.empty();

        }finally {
            databaseHelper.closeConnection();
        }
    }

    @Override
    public List<Task> getListTaskByID(Long employeeId, Long projectId) {
        try{
            List<Task> taskList = taskService.getListTaskByID(projectId,employeeId);
            return taskList;
        }catch (Exception e){
            return new ArrayList<>();
        }finally {
            databaseHelper.closeConnection();
        }
    }

    @Override
    public void updatePoint(Long id, Integer point) throws  TransactionException {
        try{
            databaseHelper.beginTransaction();
            taskService.updatePoint(id,point);
            databaseHelper.commit();
        }catch (Exception e){
            LOGGER.error("",e);
        }finally {
            databaseHelper.closeConnection();
        }
    }

    @Override
    public void updateStatus(Long id,Boolean status) {
        try{
            databaseHelper.beginTransaction();
            taskService.updateStatus(id,status);
            databaseHelper.commit();
        }catch (Exception | TransactionException e){

        }finally {
            databaseHelper.closeConnection();
        }
    }
}
