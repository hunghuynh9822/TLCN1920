package com.hcmute.tlcn.workmanagement.dao;

import com.hcmute.tlcn.workmanagement.dbconn.DataSource;
import com.hcmute.tlcn.workmanagement.model.Employee;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.sql.*;

@Repository
public class EmployeeDao {
    private static Logger LOGGER = LoggerFactory.getLogger(EmployeeDao.class);
    @Autowired
    private DataSource dataSource;

    private static String SQL_GET_LAST_ID = "SELECT id FROM employees ORDER BY id DESC LIMIT 1 FOR UPDATE";

    private static String SQL_INSERT_EMPLOYEE = "INSERT INTO employees(id,name) VALUES(?,?)";

    public boolean createEmployee(Employee employee) {
        try(Connection conn = this.dataSource.getConnection();
            PreparedStatement ps = conn.prepareStatement(SQL_INSERT_EMPLOYEE)){
            conn.setAutoCommit(false);

            employee.setId(getLastId());
            ps.setString(1,employee.getId());
            ps.setString(2,employee.getLastName());
            int affectedRows = ps.executeUpdate();
            if(affectedRows > 0){
                LOGGER.info("[createEmployee] INSERT : {}",employee.toString());
                conn.commit();
                return true;
            }
            throw new SQLException("No row affect");
        }catch (SQLException ex){
            LOGGER.error("",ex);
            try {
                this.dataSource.rollback();
            } catch (SQLException e) {
                LOGGER.error("[createEmployee] ROLLBACK {} | ERROR {}",employee.getId(),e.getMessage());
            }
            return false;
        }
        finally {
            this.dataSource.closeConnection();
        }
    }

    public String getLastId() throws SQLException {
        Connection conn = this.dataSource.getConnection();
        Statement stmt = conn.createStatement();
        ResultSet rs = stmt.executeQuery(SQL_GET_LAST_ID);
        if (rs.next()) {
            Long id = rs.getLong("id");
            Long index = Math.floorMod(id,100) > 98 ? 1L : Math.floorMod(id,100) + 1;
            return String.format("%d%s",System.currentTimeMillis(),index>9?index:String.format("0%d",index));
        }
        return String.format("%d%s",System.currentTimeMillis(),"01");
    }

    public void getAll() throws SQLException {
        Connection conn = this.dataSource.getConnection();
        Statement stmt = conn.createStatement();
        ResultSet rs = stmt.executeQuery("SELECT * FROM employees");
        while (rs.next()) {
            Long id = rs.getLong(1);
            LOGGER.info("Test id {} {}",rs.getLong(1),rs.getString(2));
        }
    }
}
