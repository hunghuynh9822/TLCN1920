package com.hcmute.pose.projectservice.service;

import com.hcmute.pose.database.connector.exception.TransactionException;
import com.hcmute.pose.projectservice.model.Project;

import java.sql.SQLException;
import java.util.List;

public interface ProjectService {
    Project ceratePro(String title, Long employeeCreate) throws Exception;
    List<Project> getListPro () throws SQLException;
    void updateTitle (Long id,Long employeeCre, String title) throws SQLException, TransactionException;
    void ipdateSubmit(Long id,Long employeeCre, Boolean submit) throws SQLException, TransactionException;
}
