package com.hcmute.pose.projectservice.dao.project;

import com.hcmute.pose.database.connector.exception.TransactionException;
import com.hcmute.pose.projectservice.model.project.Project;
import com.hcmute.pose.projectservice.model.project.ProjectState;

import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

public interface ProjectDao {
    Optional<Long> getLastID ();
    Optional<Project> createPro(Project project);
    List<Project> getListPro () throws SQLException;
    void updateProject(Project project) throws SQLException, TransactionException;
    void updateState(Long id, ProjectState state) throws SQLException, TransactionException;
    Optional<Project> getProject(Long id);
}
