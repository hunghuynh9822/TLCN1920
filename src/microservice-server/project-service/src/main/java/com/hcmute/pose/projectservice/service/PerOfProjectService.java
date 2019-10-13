package com.hcmute.pose.projectservice.service;

import com.hcmute.pose.database.connector.exception.TransactionException;
import com.hcmute.pose.projectservice.model.PerOfProject;

import java.sql.SQLException;
import java.util.List;

public interface PerOfProjectService {
    PerOfProject createPOP (Long idPro,Long employeeId ) throws Exception;
    List<PerOfProject> getListPOP (Long idPro) throws SQLException;
    void deletePOP (Long id,Long employeeId) throws SQLException, TransactionException;
}
