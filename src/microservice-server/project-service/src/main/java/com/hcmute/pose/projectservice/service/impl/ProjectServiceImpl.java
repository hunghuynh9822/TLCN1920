package com.hcmute.pose.projectservice.service.impl;

import com.hcmute.pose.database.connector.exception.TransactionException;
import com.hcmute.pose.projectservice.dao.ProjectDao;
import com.hcmute.pose.projectservice.model.Project;
import com.hcmute.pose.projectservice.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;

import java.sql.SQLException;
import java.util.List;

public class ProjectServiceImpl implements ProjectService {

    @Autowired
    private ProjectDao projectDao;

    @Override
    public Project ceratePro(String title, Long employeeCreate) throws Exception {
        Long Id = projectDao.getLastID().orElseThrow(()-> new Exception("Not get ID"));
        Project project = new Project(Id,title,System.currentTimeMillis(),employeeCreate,false);
        return  projectDao.ceratePro(project).orElseThrow(()-> new Exception("Not doing AddTask "));
    }

    @Override
    public List<Project> getListPro() throws SQLException {
        return projectDao.getListPro();
    }

    @Override
    public void updateTitle(Long id, Long employeeCre, String title) throws SQLException, TransactionException {
        projectDao.updateTitle(id,employeeCre,title);
    }

    @Override
    public void ipdateSubmit(Long id, Long employeeCre, Boolean submit) throws SQLException, TransactionException {
        projectDao.ipdateSubmit(id,employeeCre,submit);
    }
}
