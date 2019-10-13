package com.hcmute.pose.projectservice.buz;

import com.hcmute.pose.database.connector.exception.TransactionException;
import com.hcmute.pose.projectservice.model.PerOfProject;
import com.hcmute.pose.projectservice.payload.PerOfProjectRequest;

import java.sql.SQLException;
import java.util.List;

public interface PerOfProjectBuz {
    void createPOP (PerOfProjectRequest perOfProjectRequest) throws Exception;
    List<PerOfProject> getListPOP (Long idPro) throws SQLException;
    void deletePOP (Long id,Long employeeId) throws SQLException, TransactionException;
}
