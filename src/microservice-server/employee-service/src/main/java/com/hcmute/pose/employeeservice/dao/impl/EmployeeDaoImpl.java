package com.hcmute.pose.employeeservice.dao.impl;

import com.hcmute.pose.database.connector.exception.TransactionException;
import com.hcmute.pose.database.connector.helper.DatabaseHelper;
import com.hcmute.pose.employeeservice.dao.EmployeeDao;
import com.hcmute.pose.employeeservice.model.Employee;
import com.hcmute.pose.genuid.GenerateUID;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.sql.*;
import java.util.*;


@Repository
public class EmployeeDaoImpl implements EmployeeDao {
    private static Logger LOGGER = LoggerFactory.getLogger(EmployeeDaoImpl.class);

    private static String SQL_SELECT_LAST_ID = "SELECT id as value FROM employees ORDER BY id DESC LIMIT 1 FOR UPDATE";

    private static String SQL_INSERT_EMPLOYEE = "INSERT INTO employees(id,username,password,email,created_at,first_name,middle_name,last_name) VALUES(?,?,?,?,?,?,?,?)";
    private static String SQL_INSERT_EMPLOYEE_ROLE = "INSERT INTO employee_roles(employee_id,role_id,create_at) VALUES(?,?,?)";

    private static String SQL_SELECT_ALL_EMPLOYEE = "SELECT * FROM employees";

    //    SELECT roles.id,roles.name,employees.* FROM employees INNER JOIN employee_roles ON employees.id = employee_id INNER JOIN roles ON roles.id = role_id
    private static String SQL_SELECT_ROLES_EMPLOYEE = "SELECT id,name FROM roles WHERE id in (SELECT role_id FROM employee_roles WHERE employee_id = ?);";

    private static String SQL_SELECT_EXIST_EMPLOYEE_BY_EMAIL = "SELECT id FROM employees WHERE email = ?";
    private static String SQL_SELECT_EXIST_EMPLOYEE_BY_USERNAME = "SELECT id FROM employees WHERE username = ?";

    private static String SQL_SELECT_EMPLOYEE_BY_USERNAME = "SELECT id,username,password,email,first_name,middle_name,last_name FROM employees WHERE username = ?";
    private static String SQL_SELECT_EMPLOYEE_BY_EMAIL = "SELECT id,username,password,email,first_name,middle_name,last_name FROM employees WHERE email = ?";
    private static String SQL_SELECT_EMPLOYEE_BY_USERNAME_OR_EMAIL = "SELECT id,username,password,email,first_name,middle_name,last_name FROM employees WHERE username = ? OR email = ?";
    private static String SQL_SELECT_EMPLOYEE_BY_ID = "SELECT id,username,password,email,first_name,middle_name,last_name FROM employees WHERE id = ?";

    @Autowired
    private DatabaseHelper databaseHelper;

    @Autowired
    private GenerateUID generateUID;

    public Optional<Long> getLastId(){
        return generateUID.genUID();
    }

    public Optional<Employee> createEmployee(Employee employee) {
        try {
            databaseHelper.executeNonQuery(SQL_INSERT_EMPLOYEE,
                    employee.getId(),
                    employee.getUsername(),
                    employee.getPassword(),
                    employee.getEmail(),
                    System.currentTimeMillis(),
                    employee.getFirst_name(),
                    employee.getMiddle_name(),
                    employee.getLast_name()
            );
            return Optional.of(employee);
        }catch (SQLException | TransactionException ex){
            LOGGER.error("[EmployeeDaoImpl]:[createEmployee]",ex);
            return Optional.empty();
        }
    }

    @Override
    public void addRoleToEmployee(Long employeeId,Long roleId) throws SQLException, TransactionException {
        try {
            databaseHelper.executeNonQuery(SQL_INSERT_EMPLOYEE_ROLE, employeeId, roleId, System.currentTimeMillis());
        } catch (SQLException | TransactionException e) {
            LOGGER.error("[EmployeeDaoImpl]:[addRoleToEmployee]",e);
            throw e;
        }
    }

    public List<Employee> getAll() throws SQLException {
        return databaseHelper.executeQueryListObject(Employee[].class,SQL_SELECT_ALL_EMPLOYEE);
    }

//    @Override
//    public Optional<Employee> findByEmail(String email) {
//        return getEmployee(SQL_SELECT_EMPLOYEE_BY_EMAIL,email);
//    }
//
//    @Override
//    public Optional<Employee> findByUsername(String username) {
//        return getEmployee(SQL_SELECT_EMPLOYEE_BY_USERNAME,username);
//    }
//
//    @Override
//    public Optional<Employee> findByUsernameOrEmail(String username, String email) {
//        return getEmployee(SQL_SELECT_EMPLOYEE_BY_USERNAME_OR_EMAIL,username,email);
//    }
//
//    @Override
//    public Optional<Employee> findById(Long id) {
//        return getEmployee(SQL_SELECT_EMPLOYEE_BY_ID,id);
//    }

//    private Optional<Employee> getEmployee(String sql,Object... args){
//        try(Connection conn = this.dataSource.getConnection();
//            PreparedStatement ps = conn.prepareStatement(sql)){
//            for (int i = 0; i < args.length; i++){
//                ps.setObject(i+1,args[i]);
//            }
//            ResultSet rs = ps.executeQuery();
//            if(rs != null && rs.next()){
//                return Optional.of(parseEmployee(conn,rs));
//            }
//            throw new SQLException("No result");
//        }catch (SQLException ex){
//            return Optional.empty();
//        }
//        finally {
//            this.dataSource.closeConnection();
//        }
//    }
//
//    private Employee parseEmployee(Connection conn,ResultSet rs) throws SQLException {
//        Long id = rs.getLong(1);
//        String username = rs.getString(2);
//        String password = rs.getString(3);
//        String email = rs.getString(4);
//        String first_name = rs.getString(5);
//        String middle_name = rs.getString(6);
//        String last_name = rs.getString(7);
//        Set<Role> roles = new HashSet<>();
//        ResultSet resultSet = null;
//        try(PreparedStatement psRole = conn.prepareStatement(SQL_SELECT_ROLES_EMPLOYEE)){
//            psRole.setLong(1,id);
//            resultSet = psRole.executeQuery();
//            while (resultSet.next()){
//                Role role = new Role(resultSet.getInt(1),resultSet.getString(2));
//                roles.add(role);
//            }
//            if(roles.isEmpty()){
//                throw new SQLException("Employee have no role");
//            }
//        }catch (SQLException e){
//            throw e;
//        }
//        finally {
//            resultSet.close();
//        }
//        return new Employee(id,username,email,password,roles,first_name,middle_name,last_name);
//    }
//
//    @Override
//    public Boolean existsByUsername(String username) {
//        return this.checkExist(username,SQL_SELECT_EXIST_EMPLOYEE_BY_USERNAME);
//    }
//
//    @Override
//    public Boolean existsByEmail(String email) {
//        return this.checkExist(email,SQL_SELECT_EXIST_EMPLOYEE_BY_EMAIL);
//    }
//
//    private Boolean checkExist(String usernameOrEmail,String sql){
//        try(Connection conn = this.dataSource.getConnection();
//            PreparedStatement ps = conn.prepareStatement(sql)){
//            ps.setString(1,usernameOrEmail);
//            ResultSet rs = ps.executeQuery();
//            if(rs != null && rs.next()){
//                return true;
//            }
//            throw new SQLException("No result");
//        }catch (SQLException ex){
//            return false;
//        }
//        finally {
//            this.dataSource.closeConnection();
//        }
//    }
}
