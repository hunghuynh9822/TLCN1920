package com.hcmute.pose.projectservice.service.project.impl;

import com.hcmute.pose.database.connector.exception.TransactionException;
import com.hcmute.pose.projectservice.dao.project.PerOfProjectDao;
import com.hcmute.pose.projectservice.model.project.PerOfProject;
import com.hcmute.pose.projectservice.model.project.ProjectRole;
import com.hcmute.pose.projectservice.service.project.PerOfProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.util.List;
@Service
public class PerOfProjectServiceImpl implements PerOfProjectService {

    @Autowired
    private PerOfProjectDao perOfProjectDao;

    @Override
    public PerOfProject createPOP(Long projectId, Long employeeId, ProjectRole role) throws Exception {
        PerOfProject perOfProject= new PerOfProject(projectId, employeeId, role);
        return  perOfProjectDao.createPOP(perOfProject).orElseThrow(()-> new Exception("Can not create relation project and employee"));
    }

    @Override
    public List<PerOfProject> getListPOP(Long projectId) throws SQLException {
        return perOfProjectDao.getListPOP(projectId);
    }

    @Override
    public void deletePOP(Long projectId,Long employeeId) throws SQLException, TransactionException {
        perOfProjectDao.deletePOP(projectId,employeeId);
    }

    @Override
    public List<PerOfProject> getListOwner(Long employeeId) throws SQLException {
        return perOfProjectDao.getListWithRole(employeeId, ProjectRole.OWNER);
    }

    @Override
    public List<PerOfProject> getListJoin(Long employeeId) throws SQLException {
        return perOfProjectDao.getListWithoutRole(employeeId, ProjectRole.OWNER);
    }

}
