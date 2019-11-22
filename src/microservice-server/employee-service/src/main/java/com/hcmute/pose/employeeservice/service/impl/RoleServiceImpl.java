package com.hcmute.pose.employeeservice.service.impl;

import com.hcmute.pose.employeeservice.dao.RoleDao;
import com.hcmute.pose.employeeservice.exception.DatabaseException;
import com.hcmute.pose.employeeservice.model.Role;
import com.hcmute.pose.employeeservice.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.util.List;
import java.util.Set;

@Service
public class RoleServiceImpl implements RoleService {

    @Autowired
    private RoleDao roleDao;

    @Override
    public Role createRole(String name) throws DatabaseException {
        return roleDao.createRole(name).orElseThrow(()->new DatabaseException("[RoleServiceImpl] Can't create Role"));
    }

    @Override
    public Role findByName(String name) throws DatabaseException {
        return roleDao.findByName(name).orElseThrow(()->new DatabaseException(String.format("[RoleServiceImpl] Can't find Role by name %s",name)));
    }

    @Override
    public Role findById(Long id) throws DatabaseException {
        return roleDao.findById(id).orElseThrow(()->new DatabaseException(String.format("[RoleServiceImpl] Can't find Role by id %s",id)));
    }

    @Override
    public Set<Role> getUserRoles(Long userId) throws SQLException {
        return roleDao.getRoleUser(userId);
    }

    @Override
    public List<Role> getRoles() throws SQLException {
        return roleDao.getAllRole();
    }
}
