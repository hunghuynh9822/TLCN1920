package com.hcmute.pose.projectservice.service;

import com.hcmute.pose.database.connector.exception.TransactionException;
import com.hcmute.pose.projectservice.model.Project;
import com.hcmute.pose.projectservice.model.ProjectRole;
import com.hcmute.pose.projectservice.model.ProjectState;

import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

public interface ProjectService {
    Project ceratePro(String title, String description) throws Exception;
    List<Project> getListPro () throws SQLException;
    void updateProject(Long id, String title, String description, ProjectState state) throws SQLException, TransactionException;
    void updateState(Long id, ProjectState state) throws SQLException, TransactionException;
    Project getProject(Long id) throws Exception;
}
