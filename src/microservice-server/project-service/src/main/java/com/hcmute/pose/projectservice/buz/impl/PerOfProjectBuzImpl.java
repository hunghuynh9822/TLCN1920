package com.hcmute.pose.projectservice.buz.impl;

import com.hcmute.pose.database.connector.exception.TransactionException;
import com.hcmute.pose.database.connector.helper.DatabaseHelper;
import com.hcmute.pose.projectservice.buz.PerOfProjectBuz;
import com.hcmute.pose.projectservice.model.PerOfProject;
import com.hcmute.pose.projectservice.payload.PerOfProjectRequest;
import com.hcmute.pose.projectservice.service.PerOfProjectService;
import org.springframework.beans.factory.annotation.Autowired;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class PerOfProjectBuzImpl implements PerOfProjectBuz {
    @Autowired
    private DatabaseHelper databaseHelper;
    @Autowired
    private PerOfProjectService perOfProjectService;
    @Override
    public void createPOP(PerOfProjectRequest perOfProjectRequest) throws Exception {
        try{
            databaseHelper.beginTransaction();
            for(Long empl : perOfProjectRequest.getIdListPer()){
                perOfProjectService.createPOP(perOfProjectRequest.getIdPro(),empl);
            }

            databaseHelper.commit();


        }catch (Exception | TransactionException e) {


        }finally {
            databaseHelper.closeConnection();
        }
    }

    @Override
    public List<PerOfProject> getListPOP(Long idPro) throws SQLException {
        try{
            List<PerOfProject> ofProjectList = perOfProjectService.getListPOP(idPro);
            return ofProjectList;
        }catch (Exception e){
            return new ArrayList<>();
        }finally {
            databaseHelper.closeConnection();
        }
    }

    @Override
    public void deletePOP(Long id,Long employeeId) throws SQLException, TransactionException {
        try{
            perOfProjectService.deletePOP(id,employeeId);
        }catch (Exception e){

        }finally {
            databaseHelper.closeConnection();
        }
    }
}
