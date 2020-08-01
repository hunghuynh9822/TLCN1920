package com.hcmute.pose.projectservice.service.project.impl;

import com.hcmute.pose.database.connector.exception.TransactionException;
import com.hcmute.pose.projectservice.dao.project.ProjectDao;
import com.hcmute.pose.projectservice.model.project.Project;
import com.hcmute.pose.projectservice.model.project.ProjectState;
import com.hcmute.pose.projectservice.modelmap.QueryReport;
import com.hcmute.pose.projectservice.service.project.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

@Service
public class ProjectServiceImpl implements ProjectService {

    @Autowired
    private ProjectDao projectDao;

    @Override
    public Project createProject(String title, String description) throws Exception {
        Long id = projectDao.getLastID().orElseThrow(()-> new Exception("Can not get generated id"));
        Project project = new Project(id, title, description, ProjectState.NEW, System.currentTimeMillis(), System.currentTimeMillis());
        return  projectDao.createPro(project).orElseThrow(()-> new Exception("Can not create project"));
    }

    @Override
    public List<Project> getListPro() throws SQLException {
        return projectDao.getListPro();
    }

    @Override
    public void updateProject(Long id, String title, String description, ProjectState state) throws SQLException, TransactionException {
        Project project = new Project(id, title, description, state, System.currentTimeMillis());
        projectDao.updateProject(project);
    }

    @Override
    public void updateState(Long id, ProjectState state) throws SQLException, TransactionException {
        projectDao.updateState(id, state);
    }

    @Override
    public Project getProject(Long id) throws Exception {
        return projectDao.getProject(id).orElseThrow(()-> new Exception("Can not get project " + id));
    }

    @Override
    public List<QueryReport> getListProSort() throws SQLException {
        return projectDao.getListProSort();
    }

    @Override
    public List<QueryReport> getListEmployeeSort() throws SQLException {
        return projectDao.getListEmployeeSort();
    }

    @Override
    public List<QueryReport> getNumberTaskOfEmployeeInProject(Long projectId) throws SQLException {
        return projectDao.selectNumberTaskOfEmployeeInProject(projectId);
    }

    @Override
    public Map<String, Object> getReport() throws SQLException {
        return projectDao.get_report();
    }
}
