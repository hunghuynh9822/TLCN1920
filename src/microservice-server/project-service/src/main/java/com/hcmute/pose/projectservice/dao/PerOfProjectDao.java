package com.hcmute.pose.projectservice.dao;

import com.hcmute.pose.database.connector.exception.TransactionException;
import com.hcmute.pose.projectservice.model.PerOfProject;

import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

public interface PerOfProjectDao {
    Optional<Long> getLastID ();
    Optional<PerOfProject> createPOP (PerOfProject perOfProject);
    List<PerOfProject> getListPOP (Long idPro) throws SQLException;
    void deletePOP (Long id,Long employeeId) throws SQLException, TransactionException;
}
