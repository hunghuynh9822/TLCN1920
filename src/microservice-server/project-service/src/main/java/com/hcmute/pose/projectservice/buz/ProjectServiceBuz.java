package com.hcmute.pose.projectservice.buz;

import com.hcmute.pose.database.connector.exception.TransactionException;
import com.hcmute.pose.projectservice.model.PerOfProject;
import com.hcmute.pose.projectservice.model.Project;
import com.hcmute.pose.projectservice.model.ProjectState;
import com.hcmute.pose.projectservice.payload.PerOfProjectRequest;
import com.hcmute.pose.projectservice.payload.ProjectOfPerResponse;
import com.hcmute.pose.projectservice.payload.ProjectRequest;
import com.hcmute.pose.projectservice.payload.ProjectUpdateRequest;

import java.sql.SQLException;
import java.util.List;

public interface ProjectServiceBuz {
    Project createProject(ProjectRequest projectRequest) throws Exception, TransactionException;
    List<Project> getListProject () throws SQLException;
    ProjectOfPerResponse getProjects(Long employeeId) throws Exception;
    void updateProject(ProjectUpdateRequest projectUpdateRequest) throws Exception, TransactionException;
    void updateState(Long id, ProjectState state) throws SQLException, TransactionException;
    Project getProject(Long id) throws Exception;
    void createPOP (PerOfProjectRequest perOfProjectRequest) throws Exception, TransactionException;
    List<PerOfProject> getListPOP (Long projectId) throws SQLException;
    void deletePOP (PerOfProjectRequest perOfProjectRequest) throws SQLException, TransactionException;
}
