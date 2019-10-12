package com.hcmute.pose.projectservice.dao;

import com.hcmute.pose.database.connector.exception.TransactionException;
import com.hcmute.pose.projectservice.model.Project;

import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

public interface ProjectDao {
    Optional<Long> getLastID ();
    Optional<Project> ceratePro(Project project);
    List<Project> getListPro () throws SQLException;
    void updateTitle (Long id,Long employeeCre, String title) throws SQLException, TransactionException;
    void ipdateSubmit(Long id,Long employeeCre, Boolean submit) throws SQLException, TransactionException;

}
