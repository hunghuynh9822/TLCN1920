package com.hcmute.pose.employeeservice.dao.impl;

import com.hcmute.pose.database.connector.exception.TransactionException;
import com.hcmute.pose.database.connector.helper.DatabaseHelper;
import com.hcmute.pose.employeeservice.dao.PositionDao;
import com.hcmute.pose.employeeservice.exception.DatabaseException;
import com.hcmute.pose.employeeservice.model.Position;
import com.hcmute.pose.employeeservice.model.Role;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.sql.SQLException;
import java.sql.Statement;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;

@Repository
public class PositionDaoImpl implements PositionDao {
    private static Logger LOGGER = LoggerFactory.getLogger(RoleDaoImpl.class);

    private static String SQL_GET_ALL_POSITIONS = "SELECT * FROM positions";
    private static String SQL_INSERT_POSITION = "INSERT INTO positions(name,created_at,updated_at) VALUES(?,?)";
    private static String SQL_SELECT_POSITION_BY_NAME = "SELECT * FROM positions WHERE name LIKE ?";
    private static String SQL_SELECT_POSITION_BY_ID = "SELECT * FROM positions WHERE id = ?";

    @Autowired
    private DatabaseHelper databaseHelper;

    @Override
    public List<Position> getAllPosition() throws SQLException {
        return databaseHelper.executeQueryListObject(Position[].class,SQL_GET_ALL_POSITIONS);
    }

    @Override
    public Optional<Position> createPosition(String name) throws DatabaseException {
        if(this.findByName(name) == null) {
            try{
                databaseHelper.executeNonQuery(SQL_INSERT_POSITION, Statement.RETURN_GENERATED_KEYS,name,System.currentTimeMillis(),System.currentTimeMillis());
                return this.findByName(name);
            } catch (SQLException | TransactionException ex) {
                LOGGER.error("[PositionDaoImpl]:[createPosition] GOT EXCEPTION ", ex);
                Optional.empty();
            }
        }
        throw new DatabaseException("Position exist");
    }

    @Override
    public Optional<Position> findByName(String name) {
        try{
            return this.databaseHelper.executeQueryObject(Position.class,SQL_SELECT_POSITION_BY_NAME,"%"+name+"%");
        }catch (SQLException ex){
            LOGGER.error("[PositionDaoImpl]:[findByName] GOT EXCEPTION ",ex);
            return Optional.empty();
        }
    }

    @Override
    public Optional<Position> findById(Long id) {
        try {
            return this.databaseHelper.executeQueryObject(Position.class,SQL_SELECT_POSITION_BY_ID,id);
        }catch (SQLException ex){
            LOGGER.error("[PositionDaoImpl]:[findByName] GOT EXCEPTION ",ex);
            return Optional.empty();
        }
    }
}
