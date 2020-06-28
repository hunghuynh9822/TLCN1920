package com.hcmute.pose.projectservice.service.project;

import com.hcmute.pose.database.connector.exception.TransactionException;
import com.hcmute.pose.projectservice.model.project.Project;
import com.hcmute.pose.projectservice.model.project.ProjectState;
import com.hcmute.pose.projectservice.modelmap.QueryReport;

import java.sql.SQLException;
import java.util.List;

public interface ProjectService {
    Project createProject(String title, String description) throws Exception;
    List<Project> getListPro () throws SQLException;
    void updateProject(Long id, String title, String description, ProjectState state) throws SQLException, TransactionException;
    void updateState(Long id, ProjectState state) throws SQLException, TransactionException;
    Project getProject(Long id) throws Exception;

    List<QueryReport> getListProSort() throws SQLException;

    List<QueryReport> getListEmployeeSort() throws SQLException;

    List<QueryReport> getNumberTaskOfEmployeeInProject(Long projectId) throws SQLException;
}
