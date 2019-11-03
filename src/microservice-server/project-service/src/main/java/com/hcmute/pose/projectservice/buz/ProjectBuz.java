package com.hcmute.pose.projectservice.buz;

import com.hcmute.pose.database.connector.exception.TransactionException;
import com.hcmute.pose.projectservice.model.Project;
import com.hcmute.pose.projectservice.payload.ProjectRequest;

import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

public interface ProjectBuz {
    Optional<Project> ceratePro(ProjectRequest projectRequest) throws Exception;
    List<Project> getListPro () throws SQLException;
    void updateTitle (Long id,Long employeeCre, String title) throws SQLException, TransactionException;
    void ipdateSubmit(Long id,Long employeeCre, Boolean submit) throws SQLException, TransactionException;
}
