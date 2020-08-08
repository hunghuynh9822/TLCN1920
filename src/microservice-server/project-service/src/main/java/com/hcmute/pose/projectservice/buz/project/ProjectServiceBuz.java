package com.hcmute.pose.projectservice.buz.project;

import com.hcmute.pose.database.connector.exception.TransactionException;
import com.hcmute.pose.projectservice.model.project.ProjectState;
import com.hcmute.pose.projectservice.payload.project.*;
import com.hcmute.pose.projectservice.payload.task.ReportResponse;

import java.sql.SQLException;
import java.util.Map;

public interface ProjectServiceBuz {
    ProjectDetailResponse createProject(ProjectRequest projectRequest) throws Exception, TransactionException;
    EmployeeProjectResponse getProjectsOfEmployee(Long employeeId) throws Exception;
    void updateProject(ProjectUpdateRequest projectUpdateRequest) throws Exception, TransactionException;
    void updateState(Long id, ProjectState state) throws SQLException, TransactionException;
    void deleteProject(Long id) throws SQLException, TransactionException;
    AllProjectDetailResponse getListProjectDetail() throws Exception;

    ProjectsResponse getListProject() throws Exception;

    ProjectDetailResponse getProject(Long id) throws Exception;
    void createPOP (PerOfProjectRequest perOfProjectRequest) throws Exception, TransactionException;
    void deletePOP (PerOfProjectRequest perOfProjectRequest) throws Exception, TransactionException;
    AllEmployeeResponse getEmployeesFreeForProject(Long projectId) throws Exception;

    ReportResponse getNumberTaskOfEmployeeInProject() throws Exception;
    Map<String, Object> getReport() throws SQLException;
}
