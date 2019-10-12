package com.hcmute.pose.projectservice.buz.impl;

import com.hcmute.pose.database.connector.exception.TransactionException;
import com.hcmute.pose.database.connector.helper.DatabaseHelper;
import com.hcmute.pose.projectservice.buz.ProjectBuz;
import com.hcmute.pose.projectservice.model.PerOfProject;
import com.hcmute.pose.projectservice.model.Project;
import com.hcmute.pose.projectservice.payload.ProjectRequest;
import com.hcmute.pose.projectservice.service.PerOfProjectService;
import com.hcmute.pose.projectservice.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;

import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

public class ProjectBuzImpl implements ProjectBuz {
    @Autowired
    private DatabaseHelper databaseHelper;

    @Autowired
    private ProjectService projectService;
    @Autowired
    private PerOfProjectService perOfProjectService;

    @Override
    public Optional<Project> ceratePro(ProjectRequest projectRequest) throws Exception {
        try{
            databaseHelper.beginTransaction();
            Project project = projectService.ceratePro(projectRequest.getIdListPer(),projectRequest.getTitle(),projectRequest.getEmployeeCreate());
            //PerOfProject perOfProject =
            //Them nhan vien sao dday
            return Optional.of(project);
        }catch (Exception e){
            return Optional.empty();
        }finally {
            databaseHelper.closeConnection();
        }
    }

    @Override
    public List<Project> getListPro() throws SQLException {
        return null;
    }

    @Override
    public void updateTitle(Long id, Long employeeCre, String title) throws SQLException, TransactionException {

    }

    @Override
    public void ipdateSubmit(Long id, Long employeeCre, Boolean submit) throws SQLException, TransactionException {

    }
}
