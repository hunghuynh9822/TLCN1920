package com.hcmute.tlcn.workmanagement.dao.impl;

import com.hcmute.tlcn.workmanagement.dao.BaseDao;
import com.hcmute.tlcn.workmanagement.dao.EmployeeDao;
import com.hcmute.tlcn.workmanagement.dbconn.DataSource;
import com.hcmute.tlcn.workmanagement.model.Employee;
import com.hcmute.tlcn.workmanagement.model.Role;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.sql.*;
import java.util.*;

@Repository
public class EmployeeDaoImpl extends BaseDao implements EmployeeDao {
    private static Logger LOGGER = LoggerFactory.getLogger(EmployeeDaoImpl.class);

    private static String SQL_SELECT_LAST_ID = "SELECT id FROM employees ORDER BY id DESC LIMIT 1 FOR UPDATE";

    private static String SQL_INSERT_EMPLOYEE = "INSERT INTO employees(id,username,password,email,created_at,first_name,middle_name,last_name) VALUES(?,?,?,?,?,?,?,?)";
    private static String SQL_INSERT_EMPLOYEE_ROLE = "INSERT INTO employee_roles(employee_id,role_id,create_at) VALUES(?,?,?)";

    private static String SQL_SELECT_ALL_EMPLOYEE = "SELECT * FROM employees";

//    SELECT roles.id,roles.name,employees.* FROM employees INNER JOIN employee_roles ON employees.id = employee_id INNER JOIN roles ON roles.id = role_id
    private static String SQL_SELECT_ROLES_EMPLOYEE = "SELECT id,name FROM roles WHERE id in (SELECT role_id FROM employee_roles WHERE employee_id = ?);";

    private static String SQL_SELECT_EXIST_EMPLOYEE_BY_EMAIL = "SELECET id FROM employees WHERE email = ?";
    private static String SQL_SELECT_EXIST_EMPLOYEE_BY_USERNAME = "SELECET id FROM employees WHERE username = ?";

    private static String SQL_SELECT_EMPLOYEE_BY_USERNAME = "SELECET id,username,password,email,first_name,middle_name,last_name FROM employees WHERE username = ?";
    private static String SQL_SELECT_EMPLOYEE_BY_EMAIL = "SELECET id,username,password,email,first_name,middle_name,last_name FROM employees WHERE email = ?";
    private static String SQL_SELECT_EMPLOYEE_BY_USERNAME_OR_EMAIL = "SELECET id,username,password,email,first_name,middle_name,last_name FROM employees WHERE username = ? OR email = ?";
    private static String SQL_SELECT_EMPLOYEE_BY_ID = "SELECET id,username,password,email,first_name,middle_name,last_name FROM employees WHERE id = ?";

    @Autowired
    protected EmployeeDaoImpl(DataSource dataSource) {
        super(dataSource);
    }

    public Optional<Employee> createEmployee(Employee employee) throws SQLException {
        try(Connection conn = this.dataSource.getConnection();
            PreparedStatement ps = conn.prepareStatement(SQL_INSERT_EMPLOYEE)){
            conn.setAutoCommit(false);
            if(employee.getRoles().isEmpty()){
                throw new SQLException("Employee with no role");
            }
            employee.setId(getLastId());
            ps.setLong(1,employee.getId());
            ps.setString(2,employee.getUsername());
            ps.setString(3,employee.getPassword());
            ps.setString(4,employee.getEmail());
            ps.setLong(5,System.currentTimeMillis());
            ps.setString(6,employee.getFirstName());
            ps.setString(7,employee.getMiddleName());
            ps.setString(8,employee.getLastName());
            int affectedRows = ps.executeUpdate();
            if(affectedRows > 0){
                LOGGER.info("[createEmployee] INSERT : {}",employee.toString());
                for (Role role:employee.getRoles()
                     ) {
                    try(PreparedStatement psRole = conn.prepareStatement(SQL_INSERT_EMPLOYEE_ROLE)){
                        psRole.setLong(1,employee.getId());
                        psRole.setInt(2,role.getId());
                        psRole.setLong(3,System.currentTimeMillis());
                        int affected = psRole.executeUpdate();
                        if(affected < 0){
                            throw new SQLException(String.format("Can't insert employee role %d",role.getId()));
                        }
                    }catch (SQLException e){
                        throw e;
                    }
                }
                conn.commit();
                return Optional.of(employee);
            }
            throw new SQLException("No row affect");
        }catch (SQLException ex){
            LOGGER.error("",ex);
            try {
                this.dataSource.rollback();
                return Optional.empty();
            } catch (SQLException e) {
                LOGGER.error("[createEmployee] ROLLBACK {} | ERROR {}",employee.getId(),e.getMessage());
                throw e;
            }
        }
        finally {
            this.dataSource.closeConnection();
        }
    }

    private Long getLastId() throws SQLException {
        Connection conn = this.dataSource.getConnection();
        Statement stmt = conn.createStatement();
        ResultSet rs = stmt.executeQuery(SQL_SELECT_LAST_ID);
        if (rs.next()) {
            Long id = rs.getLong("id");
            Long index = Math.floorMod(id,10) > 8 ? 0L : Math.floorMod(id,10) + 1;
            return Long.parseLong(String.format("%d%d",System.currentTimeMillis(),index));
        }
        return Long.parseLong(String.format("%d%d",System.currentTimeMillis(),0L));
    }

    public List<Employee> getAll() throws Exception {
        List<Employee> employeeList = new ArrayList<>();
        try(Connection conn = this.dataSource.getConnection();
            Statement stmt = conn.createStatement();
            ResultSet rs = stmt.executeQuery(SQL_SELECT_ALL_EMPLOYEE)){
            while (rs.next()) {
                Long id = rs.getLong(1);
                String username = rs.getString(2);
                String password = "";
                String email = rs.getString(4);
                String first_name = rs.getNString(5);
                String middle_name = rs.getNString(6);
                String last_name = rs.getNString(7);
                Set<Role> roles = new HashSet<>();
                ResultSet resultSet = null;
                try(PreparedStatement ps = conn.prepareStatement(SQL_SELECT_ROLES_EMPLOYEE)){
                    ps.setLong(1,id);
                    resultSet = ps.executeQuery();
                    while (resultSet.next()){
                        Role role = new Role(resultSet.getInt(1),resultSet.getString(2));
                        roles.add(role);
                    }
                    if(roles.isEmpty()){
                        throw new SQLException("Employee have no role");
                    }
                }catch (SQLException e){
                    throw e;
                }
                finally {
                    resultSet.close();
                }
                Employee employee = new Employee(id,username,email,password,roles,first_name,middle_name,last_name);
                employeeList.add(employee);
            }
            return employeeList;
        }catch (Exception e){
            throw e;
        }finally {
            this.dataSource.closeConnection();
        }
    }

    @Override
    public Optional<Employee> findByEmail(String email) {
        return null;
    }

    @Override
    public Optional<Employee> findByUsername(String username) {
        return null;
    }

    @Override
    public Optional<Employee> findByUsernameOrEmail(String username, String email) {
        return null;
    }

    @Override
    public Optional<Employee> findById(Long id) {
        return null;
    }

    private Optional<Employee> getEmployee(String sql,Object... args){
        try(Connection conn = this.dataSource.getConnection();
            PreparedStatement ps = conn.prepareStatement(sql)){
            for (int i = 0; i < args.length; i++){
                ps.setObject(i+1,args[i]);
            }
            ResultSet rs = ps.executeQuery();
            if(rs != null && rs.next()){
                Long employeeId = rs.getLong(1);

//                Employee employee = new Employee()
            }
            throw new SQLException("No result");
        }catch (SQLException ex){
            return Optional.empty();
        }
        finally {
            this.dataSource.closeConnection();
        }
    }

    @Override
    public Boolean existsByUsername(String username) {
        return this.checkExist(username,SQL_SELECT_EXIST_EMPLOYEE_BY_USERNAME);
    }

    @Override
    public Boolean existsByEmail(String email) {
        return this.checkExist(email,SQL_SELECT_EXIST_EMPLOYEE_BY_EMAIL);
    }

    private Boolean checkExist(String usernameOrEmail,String sql){
        try(Connection conn = this.dataSource.getConnection();
            PreparedStatement ps = conn.prepareStatement(sql)){
            ps.setString(1,usernameOrEmail);
            ResultSet rs = ps.executeQuery();
            if(rs != null && rs.next()){
                return true;
            }
            throw new SQLException("No result");
        }catch (SQLException ex){
            return false;
        }
        finally {
            this.dataSource.closeConnection();
        }
    }
}
