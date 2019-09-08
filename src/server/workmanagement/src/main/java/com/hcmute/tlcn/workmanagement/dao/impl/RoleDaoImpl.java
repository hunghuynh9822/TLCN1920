package com.hcmute.tlcn.workmanagement.dao.impl;

import com.hcmute.tlcn.workmanagement.dao.BaseDao;
import com.hcmute.tlcn.workmanagement.dao.RoleDao;
import com.hcmute.tlcn.workmanagement.dbconn.DataSource;
import com.hcmute.tlcn.workmanagement.model.Role;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.sql.*;
import java.util.Optional;

@Repository
public class RoleDaoImpl extends BaseDao implements RoleDao {
    private static Logger LOGGER = LoggerFactory.getLogger(RoleDaoImpl.class);

    private static String SQL_INSERT_ROLE = "INSERT INTO roles(name,created_at) VALUES(?,?)";
    private static String SQL_SELECT_ROLE_BY_NAME = "SELECT * FROM roles WHERE name LIKE ?";
    private static String SQL_SELECT_ROLE_BY_ID = "SELECT * FROM roles WHERE id = ?";

    @Autowired
    protected RoleDaoImpl(DataSource dataSource) {
        super(dataSource);
    }

    @Override
    public Boolean createRole(String name) throws SQLException {
        if(this.findByName(name) == null) {
            try (Connection conn = this.dataSource.getConnection();
                 PreparedStatement ps = conn.prepareStatement(SQL_INSERT_ROLE, Statement.RETURN_GENERATED_KEYS)) {
                conn.setAutoCommit(false);
                ps.setString(1, name);
                ps.setLong(2, System.currentTimeMillis());
                int affectedRows = ps.executeUpdate();
                if (affectedRows > 0) {
                    ResultSet rs = ps.getGeneratedKeys();
                    if (rs != null && rs.next()) {
                        LOGGER.info("[createRole] INSERT : {}", rs.getInt(1));
                        conn.commit();
                        return true;
                    }
                    throw new SQLException("No generated key");
                }
                throw new SQLException("No row affect");
            } catch (SQLException ex) {
                LOGGER.error("", ex);
                try {
                    this.dataSource.rollback();
                    return false;
                } catch (SQLException e) {
                    LOGGER.error("[createRole] ROLLBACK ERROR {}", e.getMessage());
                    throw e;
                }
            } finally {
                this.dataSource.closeConnection();
            }
        }
        throw new SQLException("Role exist");
    }

    @Override
    public Optional<Role> findByName(String name) {
        try(Connection conn = this.dataSource.getConnection();
            PreparedStatement ps = conn.prepareStatement(SQL_SELECT_ROLE_BY_NAME)){
            ps.setString(1,"%"+name+"%");
            ResultSet rs = ps.executeQuery();
            if(rs != null && rs.next()){
                return Optional.of(new Role(rs.getLong(1),rs.getString(2),rs.getLong(3),rs.getLong(4)));
            }
            throw new SQLException("No result");
        }catch (SQLException ex){
//            LOGGER.error("",ex);
            return Optional.empty();
        }
        finally {
            this.dataSource.closeConnection();
        }
    }

    @Override
    public Optional<Role> findById(Long id) {
        try(Connection conn = this.dataSource.getConnection();
            PreparedStatement ps = conn.prepareStatement(SQL_SELECT_ROLE_BY_ID)){
            ps.setLong(1,id);
            ResultSet rs = ps.executeQuery();
            if(rs != null && rs.next()){
                return Optional.of(new Role(rs.getLong(1),rs.getString(2),rs.getLong(3),rs.getLong(4)));
            }
            throw new SQLException("No result");
        }catch (SQLException ex){
//            LOGGER.error("",ex);
            return Optional.empty();
        }
        finally {
            this.dataSource.closeConnection();
        }
    }
}
