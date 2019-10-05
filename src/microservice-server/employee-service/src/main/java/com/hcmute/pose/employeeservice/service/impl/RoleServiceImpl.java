package com.hcmute.pose.employeeservice.service.impl;

import com.hcmute.pose.employeeservice.dao.RoleDao;
import com.hcmute.pose.employeeservice.exception.DatabaseException;
import com.hcmute.pose.employeeservice.model.Role;
import com.hcmute.pose.employeeservice.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RoleServiceImpl implements RoleService {

    @Autowired
    private RoleDao roleDao;

    @Override
    public Role createRole(String name) throws DatabaseException {
        return roleDao.createRole(name).orElseThrow(()->new DatabaseException("Can't create Role"));
    }

    @Override
    public Role findByName(String name) throws DatabaseException {
        return roleDao.findByName(name).orElseThrow(()->new DatabaseException(String.format("Can't find Role by name %s",name)));
    }

    @Override
    public Role findById(Long id) throws DatabaseException {
        return roleDao.findById(id).orElseThrow(()->new DatabaseException(String.format("Can't find Role by id %s",id)));
    }
}
