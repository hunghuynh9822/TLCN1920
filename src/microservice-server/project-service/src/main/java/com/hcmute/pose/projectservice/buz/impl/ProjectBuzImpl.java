package com.hcmute.pose.projectservice.buz.impl;

import com.hcmute.pose.database.connector.exception.TransactionException;
import com.hcmute.pose.database.connector.helper.DatabaseHelper;
import com.hcmute.pose.projectservice.buz.ProjectBuz;
import com.hcmute.pose.projectservice.model.PerOfProject;
import com.hcmute.pose.projectservice.model.Project;
import com.hcmute.pose.projectservice.payload.ProjectRequest;
import com.hcmute.pose.projectservice.service.PerOfProjectService;
import com.hcmute.pose.projectservice.service.ProjectService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
@Service
public class ProjectBuzImpl implements ProjectBuz {
    private static Logger LOGGER = LoggerFactory.getLogger(ProjectBuzImpl.class);
    @Autowired
    private DatabaseHelper databaseHelper;

    @Autowired
    private ProjectService projectService;


    @Override
    public Optional<Project> ceratePro(ProjectRequest projectRequest) throws Exception {
        try{
            databaseHelper.beginTransaction();
            Project project = projectService.ceratePro(projectRequest.getTitle(),projectRequest.getEmployeeCreate());
            databaseHelper.commit();
            return Optional.of(project);
        }catch (Exception | TransactionException e){
            LOGGER.error("",e);
            return Optional.empty();
        }finally {
            databaseHelper.closeConnection();
        }
    }

    @Override
    public List<Project> getListPro() throws SQLException {
        try{
            List<Project> projectList = projectService.getListPro();
            return projectList;
        }catch (Exception e){
            LOGGER.error("",e);
            return new ArrayList<>();
        }finally {
            databaseHelper.closeConnection();
        }
    }

    @Override
    public void updateTitle(Long id, Long employeeCre, String title) throws SQLException, TransactionException {
        try{
            databaseHelper.beginTransaction();
            projectService.updateTitle(id,employeeCre,title);
            databaseHelper.commit();
        }catch (Exception e){
            LOGGER.error("",e);
        }finally {
            databaseHelper.closeConnection();
        }
    }

    @Override
    public void ipdateSubmit(Long id, Long employeeCre, Boolean submit) throws SQLException, TransactionException {
        try{
            databaseHelper.beginTransaction();
            projectService.ipdateSubmit(id,employeeCre,submit);
            databaseHelper.commit();
        }catch (Exception e){
            LOGGER.error("",e);
        }finally {
            databaseHelper.closeConnection();
        }
    }
}
