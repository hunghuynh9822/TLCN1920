package com.hcmute.pose.projectservice.service.impl;

import com.hcmute.pose.database.connector.exception.TransactionException;
import com.hcmute.pose.projectservice.dao.PerOfProjectDao;
import com.hcmute.pose.projectservice.model.PerOfProject;
import com.hcmute.pose.projectservice.service.PerOfProjectService;
import org.springframework.beans.factory.annotation.Autowired;

import java.sql.SQLException;
import java.util.List;

public class PerOfProjectServiceImpl implements PerOfProjectService {

    @Autowired
    private PerOfProjectDao perOfProjectDao;

    @Override
    public PerOfProject createPOP(Long idPro,Long employeeId) throws Exception {
        PerOfProject task = new PerOfProject(idPro,employeeId);
        return  perOfProjectDao.createPOP(task).orElseThrow(()-> new Exception("Not doing AddTask "));
    }

    @Override
    public List<PerOfProject> getListPOP(Long idPro) throws SQLException {
        return perOfProjectDao.getListPOP(idPro);
    }

    @Override
    public void deletePOP(Long id,Long employeeId) throws SQLException, TransactionException {
        perOfProjectDao.deletePOP(id,employeeId);
    }
}
