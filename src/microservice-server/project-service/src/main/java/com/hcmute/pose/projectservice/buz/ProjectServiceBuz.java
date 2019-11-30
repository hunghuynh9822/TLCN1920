package com.hcmute.pose.projectservice.buz;

import com.hcmute.pose.database.connector.exception.TransactionException;
import com.hcmute.pose.projectservice.model.PerOfProject;
import com.hcmute.pose.projectservice.model.Project;
import com.hcmute.pose.projectservice.model.ProjectState;
import com.hcmute.pose.projectservice.payload.*;

import java.sql.SQLException;
import java.util.List;

public interface ProjectServiceBuz {
    ProjectResponse createProject(ProjectRequest projectRequest) throws Exception, TransactionException;
    AllProjectResponse getListProject() throws Exception;
    EmployeeProjectResponse getProjectsOfEmployee(Long employeeId) throws Exception;
    void updateProject(ProjectUpdateRequest projectUpdateRequest) throws Exception, TransactionException;
    void updateState(Long id, ProjectState state) throws SQLException, TransactionException;
    ProjectResponse getProject(Long id) throws Exception;
    void createPOP (PerOfProjectRequest perOfProjectRequest) throws Exception, TransactionException;
    List<PerOfProject> getListPOP (Long projectId) throws SQLException;
    void deletePOP (PerOfProjectRequest perOfProjectRequest) throws SQLException, TransactionException;
    AllEmployeeResponse getEmployeesFreeForProject(Long projectId) throws Exception;
}
