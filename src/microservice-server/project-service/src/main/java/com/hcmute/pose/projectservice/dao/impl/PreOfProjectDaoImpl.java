package com.hcmute.pose.projectservice.dao.impl;

import com.hcmute.pose.database.connector.exception.TransactionException;
import com.hcmute.pose.database.connector.helper.DatabaseHelper;
import com.hcmute.pose.genuid.GenerateUID;
import com.hcmute.pose.projectservice.dao.PerOfProjectDao;
import com.hcmute.pose.projectservice.model.PerOfProject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

public class PreOfProjectDaoImpl implements PerOfProjectDao {
    private static Logger LOGGER = LoggerFactory.getLogger(PerOfProjectDao.class);
    private static String SQL_INSERT_POP = "INSERT INTO perofproject(id,employeeId) VALUES(?,?)";
    private static String SQl_GET_LIST_POP = "SELECT * FROM tasks WHERE employeeId = ? AND projectId=?";
    private static String SQL_DELETE_POP = "DELETE FROM perofproject WHERE id=?";

    @Autowired
    private DatabaseHelper databaseHelper;

    @Autowired
    private GenerateUID generateUID;

    @Override
    public Optional<Long> getLastID() {
        return generateUID.genUID();
    }

    @Override
    public Optional<PerOfProject> createPOP(PerOfProject perOfProject) {
        try {
            databaseHelper.executeNonQuery(SQL_INSERT_POP,
                    perOfProject.getId(),
                    perOfProject.getEmployeeId()
            );
            return Optional.of(perOfProject);
        } catch (SQLException | TransactionException e) {
            LOGGER.error("[POPDaoImpl]:[createPOP]", e);
            return Optional.empty();
        }
    }

    @Override
    public List<PerOfProject> getListPOP(Long idPro) throws SQLException {
        try {
            return databaseHelper.executeQueryListObject(PerOfProject[].class,SQl_GET_LIST_POP);
        } catch (SQLException e) {
            LOGGER.error("[TaskDaoImpl]:[getListTaskByID]",e);
            throw e;
        }
    }

    @Override
    public void deletePOP(Long id) throws SQLException, TransactionException {
        databaseHelper.executeNonQuery(SQL_DELETE_POP,id);
    }
}
