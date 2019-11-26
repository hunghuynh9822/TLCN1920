package com.hcmute.pose.requestservice.dao.impl;

import com.hcmute.pose.database.connector.exception.TransactionException;
import com.hcmute.pose.database.connector.helper.DatabaseHelper;
import com.hcmute.pose.genuid.GenerateUID;
import com.hcmute.pose.requestservice.dao.RequestDao;
import com.hcmute.pose.requestservice.model.Request;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

public class RequestDaoImpl implements RequestDao {

    private static Logger LOGGER = LoggerFactory.getLogger(RequestDao.class);
    private static String SQL_INSERT_REQUEST = "INSERT INTO requests(id, employeeid, name, , position, timestart, timeend, reason,confirm) VALUES(?,?,?,?,?,?,?,?)";
    private static String SQl_GET_LIST_REQ = "SELECT * FROM requests";
    private static String SQl_GET_REQ_BY_ID = "SELECT * FROM requests WHERE employeeid = ?";
    private static String SQL_UPDATE_CONFIRM = "UPDATE requests SET confirm=? WHERE id=? AND employeeid=?";
    private static String SQL_DELETE_REQ = "DELETE FROM requests WHERE id=?";

    @Autowired
    private DatabaseHelper databaseHelper;

    @Autowired
    private GenerateUID generateUID;

    @Override
    public Optional<Long> getLastID() {
        return generateUID.genUID();
    }


    @Override
    public Optional<Request> createRequest(Request request) {
        try {
            databaseHelper.executeNonQuery(SQL_INSERT_REQUEST,
                    request.getId(),
                    request.getEmployeeid(),
                    request.getName(),
                    request.getPosition(),
                    request.getTimestart(),
                    request.getTimeend(),
                    request.getReason(),
                    request.getConfirm()
            );
            return Optional.of(request);
        } catch (SQLException | TransactionException e) {
            LOGGER.error("[RequestDaoImpl]:[createReq]", e);
            return Optional.empty();
        }
    }

    @Override
    public List<Request> getRequests() throws SQLException {
        try {
            return databaseHelper.executeQueryListObject(Request[].class,SQl_GET_LIST_REQ);
        } catch (SQLException e) {
            LOGGER.error("[RequestDaoImpl]:[getListReq]",e);
            throw e;
        }
    }

    @Override
    public List<Request> getRequestByEmployee(Long employeeid) throws SQLException {
        try {
            return databaseHelper.executeQueryListObject(Request[].class,SQl_GET_REQ_BY_ID,employeeid);
        } catch (SQLException e) {
            LOGGER.error("[RequestDaoImpl]:[getListReqById]",e);
            throw e;
        }
    }

    @Override
    public void updateRequest(Long id, Boolean confirm) throws SQLException, TransactionException {
        try {
            databaseHelper.executeNonQuery(SQL_UPDATE_CONFIRM,
                    id,
                    confirm
            );
        } catch (SQLException | TransactionException e) {
            LOGGER.error("[RequestDaoImpl]:[updateConfirm]", e);
            throw e;
        }
    }

    @Override
    public void deleteRequest(Long id, Long employeeid) throws SQLException, TransactionException {
        try {
            databaseHelper.executeNonQuery(SQL_DELETE_REQ,
                    id,
                    employeeid
            );
        } catch (SQLException | TransactionException e) {
            LOGGER.error("[RequestDaoImpl]:[DeleteReq]", e);
            throw e;
        }
    }
}
