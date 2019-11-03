package com.hcmute.pose.projectservice.dao.impl;

import com.hcmute.pose.database.connector.exception.TransactionException;
import com.hcmute.pose.database.connector.helper.DatabaseHelper;
import com.hcmute.pose.genuid.GenerateUID;
import com.hcmute.pose.projectservice.dao.ProjectDao;
import com.hcmute.pose.projectservice.model.Project;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.sql.SQLException;
import java.util.List;
import java.util.Optional;
@Repository
public class ProjectDaoImpl implements ProjectDao {
    private static Logger LOGGER = LoggerFactory.getLogger(ProjectDao.class);
    private static String SQL_INSERT_PRO = "INSERT INTO projects(id,title,createtime,employeeid,submit) VALUES(?,?,?,?,?)";
    private static String SQl_GET_LIST_PRO = "SELECT * FROM projects";
    private static String SQL_UPDATE_TITLE = "UPDATE projects SET title=? WHERE id=? AND employeeid=?";
    private static String SQL_UPDATE_SUBMIT = "UPDATE projects SET submit=? WHERE id=? AND employeeid=?";

    @Autowired
    private DatabaseHelper databaseHelper;

    @Autowired
    private GenerateUID generateUID;

    @Override
    public Optional<Long> getLastID() {
        return generateUID.genUID();
    }

    @Override
    public Optional<Project> ceratePro(Project project) {
        try {
            databaseHelper.executeNonQuery(SQL_INSERT_PRO,
                    project.getId(),
                    project.getTitle(),
                    project.getCreateTime(),
                    project.getEmployeeCreate(),
                    project.isSubmit()
            );
            return Optional.of(project);
        } catch (SQLException | TransactionException e) {
            LOGGER.error("[ProjectDaoImpl]:[createPro]", e);
            return Optional.empty();
        }
    }

    @Override
    public List<Project> getListPro() throws SQLException {
        try {
            return databaseHelper.executeQueryListObject(Project[].class,SQl_GET_LIST_PRO);
        } catch (SQLException e) {
            LOGGER.error("[TaskDaoImpl]:[getListTaskByID]",e);
            throw e;
        }
    }

    @Override
    public void updateTitle(Long id, Long employeeCre, String title) throws SQLException, TransactionException {
        databaseHelper.executeNonQuery(SQL_UPDATE_TITLE,title,id,employeeCre);
    }

    @Override
    public void ipdateSubmit(Long id, Long employeeCre, Boolean submit) throws SQLException, TransactionException {
        databaseHelper.executeNonQuery(SQL_UPDATE_SUBMIT,submit,id,employeeCre);
    }
}
