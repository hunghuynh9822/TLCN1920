package com.hcmute.pose.projectservice.buz;

import com.hcmute.pose.database.connector.exception.TransactionException;
import com.hcmute.pose.projectservice.model.PerOfProject;

import java.sql.SQLException;
import java.util.List;

public interface PerOfProjectBuz {
    PerOfProject createPOP (Long employeeId) throws Exception;
    List<PerOfProject> getListPOP (Long idPro) throws SQLException;
    void deletePOP (Long id) throws SQLException, TransactionException;
}
