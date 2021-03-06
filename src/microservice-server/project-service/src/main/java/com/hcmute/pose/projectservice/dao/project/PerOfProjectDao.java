package com.hcmute.pose.projectservice.dao.project;

import com.hcmute.pose.database.connector.exception.TransactionException;
import com.hcmute.pose.projectservice.model.project.PerOfProject;
import com.hcmute.pose.projectservice.model.project.ProjectRole;

import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

public interface PerOfProjectDao {
    Optional<Long> getLastID ();
    Optional<PerOfProject> createPOP (PerOfProject perOfProject);
    List<PerOfProject> getListPOP (Long idPro) throws SQLException;
    void deletePOP (Long id,Long employeeId) throws SQLException, TransactionException;
    List<PerOfProject> getListWithRole(Long employeeId, ProjectRole role) throws SQLException;

    List<PerOfProject> getUserWithRole(Long projectId, ProjectRole role) throws SQLException;

    List<PerOfProject> getListWithoutRole(Long employeeId, ProjectRole role) throws SQLException;
}
