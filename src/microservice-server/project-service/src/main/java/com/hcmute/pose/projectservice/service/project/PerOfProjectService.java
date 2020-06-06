package com.hcmute.pose.projectservice.service.project;

import com.hcmute.pose.database.connector.exception.TransactionException;
import com.hcmute.pose.projectservice.model.project.PerOfProject;
import com.hcmute.pose.projectservice.model.project.ProjectRole;

import java.sql.SQLException;
import java.util.List;

public interface PerOfProjectService {
    PerOfProject createPOP (Long projectId,Long employeeId, ProjectRole role) throws Exception;
    List<PerOfProject> getListPOP (Long projectId) throws SQLException;
    void deletePOP (Long projectId,Long employeeId) throws SQLException, TransactionException;
    List<PerOfProject> getListOwner(Long employeeId) throws SQLException;
    List<PerOfProject> getListJoin(Long employeeId) throws SQLException;
}
